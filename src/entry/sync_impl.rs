use std::{
    fs::File,
    io::{BufReader, BufWriter, Read, Write},
    marker::PhantomData,
    ops::{Deref, DerefMut},
    path::PathBuf,
};

use serde::{de::DeserializeOwned, Deserialize, Serialize};

use crate::utils::{Once, ToMut};

use super::{BackedEntry, BackedEntryUnload};

pub trait ReadDisk: Serialize + for<'de> Deserialize<'de> {
    type ReadDisk: Read;
    fn read_disk(&self) -> std::io::Result<Self::ReadDisk>;
}

pub trait WriteDisk: Serialize + for<'de> Deserialize<'de> {
    type WriteDisk: Write;
    fn write_disk(&self) -> std::io::Result<Self::WriteDisk>;
}

pub trait Decoder<Source: Read> {
    type Error: From<std::io::Error>;
    fn decode<T: for<'de> Deserialize<'de>>(&self, source: &mut Source) -> Result<T, Self::Error>;
}

pub trait Encoder<Target: Write> {
    type Error: From<std::io::Error>;
    fn encode<T: Serialize>(&self, data: &T, target: &mut Target) -> Result<(), Self::Error>;
}

impl ReadDisk for PathBuf {
    type ReadDisk = BufReader<File>;

    fn read_disk(&self) -> std::io::Result<Self::ReadDisk> {
        Ok(BufReader::new(File::open(self.clone())?))
    }
}

impl WriteDisk for PathBuf {
    type WriteDisk = BufWriter<File>;

    fn write_disk(&self) -> std::io::Result<Self::WriteDisk> {
        Ok(BufWriter::new(
            File::options()
                .write(true)
                .create(true)
                .truncate(true)
                .open(self.clone())?,
        ))
    }
}

impl<T: Once<Inner: Serialize>, Disk: WriteDisk, Coder: Encoder<Disk::WriteDisk>>
    BackedEntry<T, Disk, Coder>
{
    /// Updates underlying storage with the current entry
    fn update(&mut self) -> Result<(), Coder::Error> {
        if let Some(val) = self.value.get() {
            let mut disk = self.disk.write_disk()?;
            self.coder.encode(val, &mut disk);
            disk.flush()?; // Make sure buffer is emptied
        }
        Ok(())
    }

    /// Writes the new value to memory and disk.
    ///
    /// See [`Self::write_unload`] to skip the memory write.
    pub fn write(&mut self, new_value: T::Inner) -> Result<(), Coder::Error> {
        let mut disk = self.disk.write_disk()?;
        self.coder.encode(&new_value, &mut disk);
        disk.flush()?; // Make sure buffer is emptied

        // Drop previous value and write in new.
        // value.set() only works when uninitialized.
        self.value = T::new();
        let _ = self.value.set(new_value);
        Ok(())
    }
}

impl<T: Once<Inner: DeserializeOwned>, Disk: ReadDisk, Coder: Decoder<Disk::ReadDisk>>
    BackedEntry<T, Disk, Coder>
{
    /// Returns the entry, loading from disk if not in memory.
    ///
    /// Will remain in memory until an explicit call to unload.
    pub fn load(&self) -> Result<&T::Inner, Coder::Error> {
        let value = match self.value.get() {
            Some(x) => x,
            None => {
                let mut disk = self.disk.read_disk()?;
                let _ = self.value.set(self.coder.decode(&mut disk)?);
                self.value.get().unwrap()
            }
        };
        Ok(value)
    }
}

impl<T: Once, Disk: for<'de> Deserialize<'de>, Coder> BackedEntry<T, Disk, Coder> {
    pub fn is_loaded(&self) -> bool {
        self.value.get().is_some()
    }
}

impl<T: Once, Disk: for<'de> Deserialize<'de>, Coder> BackedEntryUnload
    for BackedEntry<T, Disk, Coder>
{
    fn unload(&mut self) {
        self.value = T::new();
    }
}

impl<T: Once<Inner: Serialize>, Disk: WriteDisk, Coder: Encoder<Disk::WriteDisk>>
    BackedEntry<T, Disk, Coder>
{
    /// Write the value to disk only, unloading current memory.
    ///
    /// See [`Self::write`] to keep the value in memory.
    pub fn write_unload<U: Into<T::Inner>>(&mut self, new_value: U) -> Result<(), Coder::Error> {
        self.unload();
        let mut disk = self.disk.write_disk()?;
        self.coder.encode(&new_value.into(), &mut disk);
        disk.flush()?; // Make sure buffer is emptied
        Ok(())
    }
}

/// Gives mutable handle to a backed entry.
///
/// Modifying by [`BackedEntry::write`] writes the entire value to the
/// underlying storage on every modification. This allows for multiple values
/// values to be written before syncing with disk.
///
/// Call [`BackedEntryMut::flush`] to sync with underlying storage before
/// dropping. Otherwise, a panicking drop implementation runs.
pub struct BackedEntryMut<
    T: Once<Inner: Serialize>,
    Disk: WriteDisk,
    Coder: Encoder<Disk::WriteDisk>,
    E: AsMut<BackedEntry<T, Disk, Coder>>,
> {
    entry: E,
    modified: bool,
    _phantom: (PhantomData<T>, PhantomData<Disk>, PhantomData<Coder>),
}

impl<
        T: Once<Inner: Serialize>,
        Disk: WriteDisk,
        Coder: Encoder<Disk::WriteDisk>,
        E: AsRef<BackedEntry<T, Disk, Coder>> + AsMut<BackedEntry<T, Disk, Coder>>,
    > Deref for BackedEntryMut<T, Disk, Coder, E>
{
    type Target = T::Inner;

    fn deref(&self) -> &Self::Target {
        self.entry.as_ref().value.get().unwrap()
    }
}

impl<
        T: Once<Inner: Serialize>,
        Disk: WriteDisk,
        Coder: Encoder<Disk::WriteDisk>,
        E: AsRef<BackedEntry<T, Disk, Coder>> + AsMut<BackedEntry<T, Disk, Coder>>,
    > DerefMut for BackedEntryMut<T, Disk, Coder, E>
{
    /// [`DerefMut::deref_mut`] that sets a modified flag.
    fn deref_mut(&mut self) -> &mut Self::Target {
        self.modified = true;
        self.entry.as_mut().value.get_mut().unwrap()
    }
}

impl<
        T: Once<Inner: Serialize>,
        Disk: WriteDisk,
        Coder: Encoder<Disk::WriteDisk>,
        E: AsMut<BackedEntry<T, Disk, Coder>>,
    > BackedEntryMut<T, Disk, Coder, E>
{
    /// Returns true if the memory version is desynced from the disk version
    #[allow(dead_code)]
    pub fn is_modified(&self) -> bool {
        self.modified
    }

    /// Saves modifications to disk, unsetting the modified flag if sucessful.
    pub fn flush(&mut self) -> Result<&mut Self, Coder::Error> {
        self.entry.as_mut().update()?;
        self.modified = false;
        Ok(self)
    }
}

impl<
        T: Once<Inner: Serialize>,
        Disk: WriteDisk,
        Coder: Encoder<Disk::WriteDisk>,
        E: AsMut<BackedEntry<T, Disk, Coder>>,
    > Drop for BackedEntryMut<T, Disk, Coder, E>
{
    /// [`Drop::drop`] that attempts a write if modified, and panics if that
    /// write returns and error.
    fn drop(&mut self) {
        if self.modified && self.flush().is_err() {
            panic!("BackedEntryMut dropped while modified, and failed to flush.");
        }
    }
}

impl<
        T: Once<Inner: Serialize + for<'de> Deserialize<'de>>,
        Disk: WriteDisk + ReadDisk,
        Coder: Encoder<Disk::WriteDisk> + Decoder<Disk::ReadDisk>,
        E: AsMut<BackedEntry<T, Disk, Coder>>,
    > BackedEntryMut<T, Disk, Coder, E>
{
    /// Returns [`BackedEntryMut`] to allow efficient in-memory modifications
    /// if variable-sized writes are safe for the underlying storage.
    ///
    /// Make sure to call [`BackedEntryMut::flush`] to sync with disk before
    /// dropping.
    pub fn mut_handle(mut backed: E) -> Result<Self, <Coder as Decoder<Disk::ReadDisk>>::Error> {
        backed.as_mut().load()?;
        Ok(BackedEntryMut {
            entry: backed,
            modified: false,
            _phantom: (PhantomData, PhantomData, PhantomData),
        })
    }
}

impl<
        T: Once<Inner: Serialize + for<'de> Deserialize<'de>>,
        Disk: WriteDisk + ReadDisk,
        Coder: Encoder<Disk::WriteDisk> + Decoder<Disk::ReadDisk>,
    > BackedEntry<T, Disk, Coder>
{
    /// Convenience wrapper for [`BackedEntryMut::mut_handle`]
    pub fn mut_handle(
        &mut self,
    ) -> Result<
        BackedEntryMut<T, Disk, Coder, ToMut<Self>>,
        <Coder as Decoder<Disk::ReadDisk>>::Error,
    > {
        BackedEntryMut::mut_handle(ToMut(self))
    }
}

impl<T, Disk: for<'de> Deserialize<'de>, Coder> BackedEntry<T, Disk, Coder> {
    pub fn replace_disk<OtherDisk>(self) -> BackedEntry<T, OtherDisk, Coder>
    where
        OtherDisk: for<'de> Deserialize<'de>,
        Disk: Into<OtherDisk>,
    {
        BackedEntry::<T, OtherDisk, Coder> {
            value: self.value,
            disk: self.disk.into(),
            coder: self.coder,
        }
    }
}

#[cfg(test)]
mod tests {
    use std::{
        cell::{OnceCell, UnsafeCell},
        collections::HashMap,
        io::Cursor,
        sync::{Arc, Mutex},
        thread::{scope, spawn},
    };

    use crate::{
        entry::{
            formats::BincodeCoder, BackedEntryArr, BackedEntryArrLock, BackedEntryBox,
            BackedEntryCell,
        },
        test_utils::CursorVec,
    };

    use super::*;

    #[test]
    fn mutate() {
        const FIB: &[u8] = &[0, 1, 1, 5, 7];
        let mut binding = Cursor::new(Vec::with_capacity(10));
        let back_vec = UnsafeCell::new(CursorVec {
            inner: (&mut binding).into(),
        });

        // Intentional unsafe access to later peek underlying storage
        let mut backed_entry =
            unsafe { BackedEntryArr::new(&mut *back_vec.get(), BincodeCoder {}) };
        backed_entry.write_unload(FIB).unwrap();

        assert_eq!(backed_entry.load().unwrap().as_ref(), FIB);

        let backing_store = unsafe { &*back_vec.get() }.get_ref();
        assert_eq!(&backing_store[backing_store.len() - FIB.len()..], FIB);

        let mut handle = backed_entry.mut_handle().unwrap();
        handle[0] = 20;
        handle[2] = 30;

        let backing_store = unsafe { &*back_vec.get() }.get_ref();
        assert_eq!(backing_store[backing_store.len() - FIB.len()], FIB[0]);
        assert_eq!(handle[0], 20);
        assert_eq!(handle[2], 30);

        handle.flush().unwrap();
        let backing_store = unsafe { &*back_vec.get() }.get_ref();
        assert_eq!(backing_store[backing_store.len() - FIB.len()], 20);
        assert_eq!(backing_store[backing_store.len() - FIB.len() + 2], 30);
        assert_eq!(backing_store[backing_store.len() - FIB.len() + 1], FIB[1]);

        drop(handle);
        assert_eq!(backed_entry.load().unwrap().as_ref(), [20, 1, 30, 5, 7]);
    }

    #[test]
    fn mutate_option() {
        let mut input: HashMap<String, u128> = HashMap::new();
        input.insert("THIS IS A STRING".to_string(), 55);
        input.insert("THIS IS ALSO A STRING".to_string(), 23413);

        let mut binding = Cursor::new(Vec::with_capacity(10));
        let mut back_vec = CursorVec {
            inner: (&mut binding).into(),
        };

        // Intentional unsafe access to later peek underlying storage
        let mut backed_entry = BackedEntryCell::new(&mut back_vec, BincodeCoder {});
        backed_entry.write_unload(input.clone()).unwrap();

        assert_eq!(&input, backed_entry.load().unwrap());
        let mut handle = backed_entry.mut_handle().unwrap();
        handle
            .deref_mut()
            .insert("EXTRA STRING".to_string(), 234137);
        handle.flush().unwrap();

        drop(handle);
        assert_eq!(
            backed_entry.load().unwrap().get("EXTRA STRING").unwrap(),
            &234137
        );
    }

    #[test]
    fn write() {
        const VALUE: &[u8] = &[5];
        const NEW_VALUE: &[u8] = &[7];

        let mut binding = Cursor::new(Vec::with_capacity(1));
        let back_vec = UnsafeCell::new(CursorVec {
            inner: (&mut binding).into(),
        });

        // Intentional unsafe access to later peek underlying storage
        let mut backed_entry =
            unsafe { BackedEntryArr::new(&mut *back_vec.get(), BincodeCoder {}) };

        backed_entry.write_unload(VALUE).unwrap();
        assert!(!backed_entry.is_loaded());
        let back_vec_inner = unsafe { (&mut *back_vec.get()).get_mut() };
        assert_eq!(&back_vec_inner[back_vec_inner.len() - VALUE.len()..], VALUE);
        assert_eq!(backed_entry.load().unwrap().as_ref(), VALUE);

        backed_entry.write(NEW_VALUE.into()).unwrap();
        assert!(backed_entry.is_loaded());
        let back_vec_inner = unsafe { (&mut *back_vec.get()).get_mut() };
        assert_eq!(
            &back_vec_inner[back_vec_inner.len() - NEW_VALUE.len()..],
            NEW_VALUE
        );
        assert_eq!(backed_entry.load().unwrap().as_ref(), NEW_VALUE);
    }

    #[test]
    fn read_threaded() {
        const VALUES: &[u8] = &[0, 1, 3, 5, 7];
        const NEW_VALUES: &[u8] = &[7, 5, 3, 1, 0];

        let mut binding = Cursor::new(Vec::with_capacity(10));
        let mut back_vec = CursorVec {
            inner: (&mut binding).into(),
        };

        let mut backed_entry = BackedEntryArrLock::new(&mut back_vec, BincodeCoder {});

        backed_entry.write_unload(VALUES).unwrap();
        assert!(!backed_entry.is_loaded());
        scope(|s| {
            let backed_share = Arc::new(&backed_entry);
            for idx in 0..VALUES.len() {
                let backed_share = backed_share.clone();
                s.spawn(move || assert_eq!(backed_share.load().unwrap()[idx], VALUES[idx]));
            }
        });

        backed_entry.write(NEW_VALUES.into()).unwrap();
        assert!(backed_entry.is_loaded());
        scope(|s| {
            let backed_share = Arc::new(&backed_entry);
            for idx in 0..NEW_VALUES.len() {
                let backed_share = backed_share.clone();
                s.spawn(move || assert_eq!(backed_share.load().unwrap()[idx], NEW_VALUES[idx]));
            }
        });
    }
}
