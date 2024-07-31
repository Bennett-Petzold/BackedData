use std::{
    ops::Range,
    path::{Path, PathBuf},
};

use futures::{stream, StreamExt, TryStreamExt};
use tokio::fs::{copy, create_dir_all, remove_dir, remove_file, rename};
use uuid::Uuid;

use crate::array::{
    async_impl::{BackedEntryContainerNestedAsync, BackedEntryContainerNestedAsyncWrite},
    container::{
        BackedEntryContainer, BackedEntryContainerNested, BackedEntryContainerNestedAll,
        ResizingContainer,
    },
    sync_impl::BackedArray,
};

use super::DirectoryBackedArray;

impl<K, E> DirectoryBackedArray<K, E>
where
    K: ResizingContainer<Data = Range<usize>>,
    E: BackedEntryContainerNestedAll + ResizingContainer,
    E::Disk: AsRef<Path>,
{
    pub async fn a_remove(&mut self, entry_idx: usize) -> Result<&mut Self, tokio::io::Error> {
        if let Some(chunk) = self.entries().c_get(entry_idx) {
            remove_file(chunk.as_ref().get_ref().get_disk()).await?;
        }
        self.array.remove(entry_idx);
        Ok(self)
    }

    pub async fn a_delete(mut self) -> Result<(), std::io::Error> {
        while !self.is_empty() {
            self.a_remove(0).await?;
        }
        let _ = remove_dir(self.directory_root).await;
        Ok(())
    }
}

impl<K, E> DirectoryBackedArray<K, E>
where
    K: ResizingContainer<Data = Range<usize>>,
    E: BackedEntryContainerNestedAsyncWrite + ResizingContainer,
    E::Coder: Default,
    E::Disk: From<PathBuf>,
{
    pub async fn a_append<U: Into<E::Unwrapped>>(
        &mut self,
        values: U,
    ) -> Result<&mut Self, E::AsyncWriteError> {
        let next_target = self.a_next_target();
        self.array
            .a_append(values, next_target, <E::Coder>::default())
            .await?;
        Ok(self)
    }

    pub async fn a_append_memory<U: Into<E::Unwrapped>>(
        &mut self,
        values: U,
    ) -> Result<&mut Self, E::AsyncWriteError> {
        let next_target = self.a_next_target();
        self.array
            .a_append_memory(values, next_target, <E::Coder>::default())
            .await?;
        Ok(self)
    }
}

impl<K, E> DirectoryBackedArray<K, E>
where
    K: ResizingContainer<Data = Range<usize>>,
    E: BackedEntryContainerNestedAsyncWrite + ResizingContainer,
    E::Disk: AsRef<Path>,
{
    pub async fn a_append_dir(&mut self, rhs: Self) -> Result<&mut Self, std::io::Error> {
        if self.directory_root != rhs.directory_root {
            stream::iter(rhs.entries().ref_iter())
                .then(|chunk| {
                    let directory_root = &self.directory_root;
                    async move {
                        let disk = chunk.as_ref().get_ref().get_disk().as_ref();
                        let new_loc = directory_root.join(disk.file_name().unwrap());
                        if disk != new_loc {
                            match rename(disk, &new_loc).await {
                                Ok(_) => Ok(()),
                                Err(_) => {
                                    copy(disk, &new_loc).await?;
                                    remove_file(disk).await
                                }
                            }
                        } else {
                            Ok(())
                        }
                    }
                })
                .try_collect::<Vec<_>>()
                .await?;
            let _ = remove_dir(rhs.directory_root).await;
        }
        self.array.merge(rhs.array);
        Ok(self)
    }
}

impl<K, E> DirectoryBackedArray<K, E>
where
    K: Default,
    E: Default,
{
    /// Creates a new directory at `directory_root`.
    ///
    /// * `directory_root`: Valid read/write directory on system
    pub async fn a_new(directory_root: PathBuf) -> std::io::Result<Self> {
        create_dir_all(directory_root.clone()).await?;
        Ok(DirectoryBackedArray {
            array: BackedArray::<K, E>::default(),
            directory_root,
        })
    }
}

impl<K, E> DirectoryBackedArray<K, E>
where
    E: BackedEntryContainerNested,
    E::Disk: AsRef<Path> + From<PathBuf>,
{
    /// Moves the directory to a new location wholesale.
    pub async fn a_move_root(&mut self, new_root: PathBuf) -> std::io::Result<&mut Self> {
        if rename(self.directory_root.clone(), new_root.clone())
            .await
            .is_err()
        {
            create_dir_all(new_root.clone()).await?;
            stream::iter(self.array.entries().ref_iter())
                .then(|chunk| {
                    let new_root = &new_root;
                    async move {
                        let disk = chunk.as_ref().get_ref().get_disk().as_ref();
                        copy(disk, new_root.join(disk.file_name().unwrap())).await?;
                        remove_file(disk).await
                    }
                })
                .try_collect::<Vec<_>>()
                .await?;
        }
        Ok(self.update_root(new_root))
    }
}

impl<K, E> DirectoryBackedArray<K, E>
where
    E: BackedEntryContainerNestedAsync,
    E::Disk: From<PathBuf>,
{
    pub fn a_next_target(&self) -> E::Disk {
        self.directory_root.join(Uuid::new_v4().to_string()).into()
    }
}

// Miri: "returning ready events from epoll_wait is not yet implemented"
#[cfg(not(miri))]
#[cfg(test)]
#[cfg(feature = "async_bincode")]
mod tests {
    use std::{array, env::temp_dir, fs::remove_dir_all};

    use tokio::fs::File;

    use crate::{
        directory::AsyncStdDirBackedArray,
        entry::formats::{AsyncBincodeCoder, AsyncDecoder, AsyncEncoder},
    };

    fn values() -> (Box<[String]>, Box<[String]>) {
        (
            Box::<[String; 100]>::new(array::from_fn(|_| "TEST STRING".to_string())),
            Box::<[String; 100]>::new(array::from_fn(|_| "OTHER VALUE".to_string())),
        )
    }

    #[tokio::test]
    async fn write() {
        let directory = temp_dir().join("async_directory_write");
        let _ = remove_dir_all(directory.clone());
        let mut arr =
            AsyncStdDirBackedArray::<String, AsyncBincodeCoder>::new(directory.clone()).unwrap();
        let (values, second_values) = values();

        arr.a_append_memory(values).await.unwrap();
        arr.a_append(second_values).await.unwrap();
        assert_eq!(arr.a_get(10).await.unwrap().as_ref(), &"TEST STRING");
        assert_eq!(arr.a_get(150).await.unwrap().as_ref(), &"OTHER VALUE");

        let _ = remove_dir_all(directory);
    }

    #[tokio::test]
    async fn write_and_read() {
        let directory = temp_dir().join("async_directory_write_and_read");
        let _ = remove_dir_all(directory.clone());
        let mut arr =
            AsyncStdDirBackedArray::<_, AsyncBincodeCoder>::new(directory.clone()).unwrap();
        let (values, second_values) = values();

        arr.a_append(values).await.unwrap();
        arr.a_append_memory(second_values).await.unwrap();
        AsyncBincodeCoder::default()
            .encode(
                &arr,
                &mut File::create(directory.join("meta.data")).await.unwrap(),
            )
            .await
            .unwrap();
        drop(arr);

        let arr: AsyncStdDirBackedArray<String, AsyncBincodeCoder> = AsyncBincodeCoder::default()
            .decode(&mut File::open(directory.join("meta.data")).await.unwrap())
            .await
            .unwrap();
        assert_eq!(arr.a_get(10).await.unwrap().as_ref(), &"TEST STRING");
        assert_eq!(arr.a_get(150).await.unwrap().as_ref(), &"OTHER VALUE");
        assert_eq!(arr.a_get(20).await.unwrap().as_ref(), &"TEST STRING");
        assert_eq!(arr.a_get(1).await.unwrap().as_ref(), &"TEST STRING");

        let _ = remove_dir_all(directory);
    }
}
