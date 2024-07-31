use std::{
    io::{Read, Seek, Write},
    ops::Range,
};

use bincode::{deserialize_from, serialize_into};
use derive_getters::Getters;
use itertools::Itertools;
use serde::{de::DeserializeOwned, Deserialize, Serialize};

use crate::backed_entry::BackedEntryArr;

#[derive(Debug)]
pub enum BackedArrayError {
    OutsideEntryBounds(usize),
    Bincode(bincode::Error),
}

/// Array stored as multiple arrays on disk
///
/// Associates each access with the appropriate disk storage, loading it into
/// memory and returning the value. Subsequent accesses will use the in-memory
/// store. Use [`Self::clear_memory`] to move the cached sub-arrays back out of
/// memory.
///
/// Use [`Self::save_to_disk`] instead of serialization directly. This clears
/// entries to prevent data duplication on disk.
///
/// Modifications beyond appending and removal are not supported, due to
/// complexity
#[derive(Debug, Serialize, Deserialize, Getters)]
pub struct BackedArray<T, Disk> {
    // keys and entries must always have the same length
    // keys must always be sorted min-max
    keys: Vec<Range<usize>>,
    entries: Vec<BackedEntryArr<T, Disk>>,
}

impl<T: Clone, Disk: Clone> Clone for BackedArray<T, Disk> {
    fn clone(&self) -> Self {
        Self {
            keys: self.keys.clone(),
            entries: self.entries.clone(),
        }
    }
}

impl<T, Disk> Default for BackedArray<T, Disk> {
    fn default() -> Self {
        Self {
            keys: vec![],
            entries: vec![],
        }
    }
}

impl<T, Disk> BackedArray<T, Disk> {
    pub fn new() -> Self {
        Self::default()
    }
}

#[derive(Debug, Hash, PartialEq, Eq, PartialOrd, Ord, Clone)]
struct ArrayLoc {
    pub entry_idx: usize,
    pub inside_entry_idx: usize,
}

/// Internal implementations
impl<T, Disk> BackedArray<T, Disk> {
    /// Returns the entry location for this access, if valid
    fn internal_idx(&self, idx: usize) -> Option<ArrayLoc> {
        self.keys
            .iter()
            .enumerate()
            .find(|(_, key_range)| key_range.contains(&idx))
            .map(|(entry_idx, key_range)| ArrayLoc {
                entry_idx,
                inside_entry_idx: (idx - key_range.start),
            })
    }

    /// Returns the entry location for multiple accesses.
    ///
    /// Silently ignores invalid idx values, shortening the return iterator.
    /// Combines duplicate index entries.
    fn multiple_internal_idx<'a, I>(&'a self, idxs: I) -> impl Iterator<Item = ArrayLoc> + 'a
    where
        I: IntoIterator<Item = usize> + 'a,
    {
        idxs.into_iter()
            .unique()
            .flat_map(|idx| self.internal_idx(idx))
            .unique()
    }

    /// [`Self::multiple_internal_idx`], but returns None for invalid idx
    fn multiple_internal_idx_strict<'a, I>(
        &'a self,
        idxs: I,
    ) -> impl Iterator<Item = Option<ArrayLoc>> + 'a
    where
        I: IntoIterator<Item = usize> + 'a,
    {
        idxs.into_iter()
            .unique()
            .map(|idx| self.internal_idx(idx))
            .unique()
    }
}

impl<T, Disk> BackedArray<T, Disk> {
    /// Move all backing arrays out of memory
    pub fn clear_memory(&mut self) {
        self.entries.iter_mut().for_each(|entry| entry.unload());
    }
}

impl<T: DeserializeOwned + Clone, Disk: Read + Seek> From<BackedArray<T, Disk>>
    for bincode::Result<Box<[T]>>
{
    fn from(mut val: BackedArray<T, Disk>) -> Self {
        Ok(val
            .entries
            .iter_mut()
            .map(|entry| entry.load())
            .collect::<Result<Vec<_>, _>>()?
            .into_iter()
            .flatten()
            .cloned()
            .collect())
    }
}

/// Read implementations
impl<T: DeserializeOwned, Disk: Read + Seek> BackedArray<T, Disk> {
    /// Return a value (potentially loading its backing array).
    ///
    /// Backing arrays stay in memory until freed.
    pub fn get(&mut self, idx: usize) -> Result<&T, BackedArrayError> {
        let loc = self
            .internal_idx(idx)
            .ok_or(BackedArrayError::OutsideEntryBounds(idx))?;
        println!("Loc: {:?}", loc);
        Ok(&self.entries[loc.entry_idx]
            .load()
            .map_err(BackedArrayError::Bincode)?[loc.inside_entry_idx])
    }

    /// Produces a vector for all requested indicies.
    ///
    /// Loads all necessary backing arrays into memory until freed.
    pub fn get_multiple<'a, I>(&'a mut self, idxs: I) -> Vec<bincode::Result<&'a T>>
    where
        I: IntoIterator<Item = usize> + 'a,
    {
        // Unsafe needed to mutate array entries with load inside the iterator.
        // The code is safe: iterators execute sequentially, so loads to the
        // same entry will not interleave, and the resultant borrowing follows
        // the usual rules.
        unsafe {
            let entries_ptr = self.entries.as_mut_ptr();
            self.multiple_internal_idx(idxs)
                .map(|loc| Ok(&(*entries_ptr.add(loc.entry_idx)).load()?[loc.inside_entry_idx]))
                .collect()
        }
    }

    /// [`Self::get_multiple`], but returns Errors for invalid idx
    pub fn get_multiple_strict<'a, I>(&'a mut self, idxs: I) -> Vec<Result<&'a T, BackedArrayError>>
    where
        I: IntoIterator<Item = usize> + 'a,
    {
        // See [`Self::get_multiple_entries`] note.
        unsafe {
            let entries_ptr = self.entries.as_mut_ptr();
            self.multiple_internal_idx_strict(idxs)
                .enumerate()
                .map(|(idx, loc)| {
                    let loc = loc.ok_or(BackedArrayError::OutsideEntryBounds(idx))?;
                    Ok(&(*entries_ptr.add(loc.entry_idx))
                        .load()
                        .map_err(BackedArrayError::Bincode)?[loc.inside_entry_idx])
                })
                .collect()
        }
    }
}

/// Write implementations
impl<T: Serialize, Disk: Write> BackedArray<T, Disk> {
    /// Adds new values by writing them to the backing store.
    ///
    /// Does not keep the values in memory.
    ///
    /// # Example
    /// ```rust
    /// use backed_array::backed_array::BackedArray;
    /// use std::fs::{File, create_dir_all, remove_dir_all, OpenOptions};
    ///
    /// let FILENAME_BASE = std::env::temp_dir().join("example_backed_array_append");
    /// let values = ([0, 1, 1],
    ///     [2, 3, 5]);
    ///
    /// create_dir_all(FILENAME_BASE.clone()).unwrap();
    /// let file_0 = OpenOptions::new().read(true).write(true).create(true).open(FILENAME_BASE.clone().join("_0")).unwrap();
    /// let file_1 = OpenOptions::new().read(true).write(true).create(true).open(FILENAME_BASE.join("_1")).unwrap();
    /// let mut array: BackedArray<u32, _> = BackedArray::default();
    /// array.append(&values.0, file_0);
    /// array.append(&values.1, file_1);
    ///
    /// assert_eq!(array.get(4).unwrap(), &3);
    /// remove_dir_all(FILENAME_BASE).unwrap();
    /// ```
    pub fn append(&mut self, values: &[T], backing_store: Disk) -> bincode::Result<&Self> {
        // End of a range is exclusive
        let start_idx = self.keys.last().map(|key_range| key_range.end).unwrap_or(0);
        self.keys.push(start_idx..(start_idx + values.len()));
        let mut entry = BackedEntryArr::new(backing_store);
        entry.write_unload(values)?;
        self.entries.push(entry);
        Ok(self)
    }

    /// [`Self::append`], but keeps values in memory.
    ///
    /// # Example
    /// ```rust
    /// use backed_array::backed_array::BackedArray;
    /// use std::fs::{File, remove_file, OpenOptions};
    ///
    /// let FILENAME = std::env::temp_dir().join("example_backed_array_append_memory");
    /// let values = ([0, 1, 1],
    ///     [2, 3, 5]);
    ///
    /// let mut array: BackedArray<u32, _> = BackedArray::default();
    /// let file = OpenOptions::new().read(true).write(true).create(true).open(FILENAME.clone()).unwrap();
    /// array.append_memory(Box::new(values.0), file);
    ///
    /// // Overwrite file, making disk pointer for first array invalid
    /// let file = OpenOptions::new().read(true).write(true).create(true).open(FILENAME.clone()).unwrap();
    /// array.append_memory(Box::new(values.1), file);
    ///
    /// assert_eq!(array.get(0).unwrap(), &0);
    /// remove_file(FILENAME).unwrap();
    /// ```
    pub fn append_memory(
        &mut self,
        values: Box<[T]>,
        backing_store: Disk,
    ) -> bincode::Result<&Self> {
        // End of a range is exclusive
        let start_idx = self.keys.last().map(|key_range| key_range.end).unwrap_or(0);
        self.keys.push(start_idx..(start_idx + values.len()));
        let mut entry = BackedEntryArr::new(backing_store);
        entry.write(values)?;
        self.entries.push(entry);
        Ok(self)
    }
}

impl<T, Disk> BackedArray<T, Disk> {
    /// Removes an entry with the internal index, shifting ranges.
    ///
    /// The getter functions can be used to indentify the target index.
    pub fn remove(&mut self, entry_idx: usize) -> &Self {
        let width = self.keys[entry_idx].len();
        self.keys.remove(entry_idx);
        self.entries.remove(entry_idx);

        // Shift all later ranges downwards
        self.keys[entry_idx..].iter_mut().for_each(|key_range| {
            key_range.start -= width;
            key_range.end -= width
        });

        self
    }
}

impl<T: Serialize, Disk: Serialize> BackedArray<T, Disk> {
    /// Serializes this to disk after clearing all entries from memory to disk.
    ///
    /// Writing directly from serialize wastes disk space and increases load
    /// time by writing the backed data with this struct.
    pub fn save_to_disk<W: Write>(&mut self, writer: W) -> bincode::Result<()> {
        self.clear_memory();
        serialize_into(writer, self)
    }
}

impl<T: DeserializeOwned, Disk: DeserializeOwned> BackedArray<T, Disk> {
    /// Loads the backed array. Does not load backing arrays, unless this
    /// was saved with data (was not saved with [`Self::save_to_disk`]).
    pub fn load<R: Read>(&mut self, writer: &mut R) -> bincode::Result<Self> {
        self.clear_memory();
        deserialize_from(writer)
    }
}