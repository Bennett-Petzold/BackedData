#![cfg_attr(docsrs, feature(doc_auto_cfg))]

pub mod entry;

#[cfg(feature = "array")]
pub mod array;
#[cfg(feature = "array")]
pub mod directory;
#[cfg(feature = "array")]
pub mod meta;

#[cfg(any(feature = "zstd", feature = "async-zstd"))]
pub mod zstd;

#[cfg(test)]
mod test_utils;
