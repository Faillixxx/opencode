# Project conventions

## Branches and tags
- GitFlow is the branch model.
- `master` is stable; `develop` is unstable.
- Only `master` and `develop` have no prefix.
- Branches off `develop` use `feature/`.
- Fixes off `master` use `hotfix/`.
- Tags use `v` plus the version, for example `v1.0.0`.

## Text encoding
- Source files are UTF-8 without BOM; 7-bit ASCII is valid UTF-8.
- CLI options, STDIN, input files, and Thrift text are UTF-8 unless an application explicitly exposes an input-encoding flag.
- Internally, text must stay Unicode-safe: do not process UTF-8 by byte index or raw character pointer; iterate with UTF-8-aware library functions or split into Unicode scalar values/code points as appropriate.
- Directory filenames must round-trip through the filesystem encoding: convert to UTF-8 for internal processing/display, then restore the original filesystem encoding when writing names back.
- Encoding bugs are fixed case-by-case, at the shared boundary that owns the conversion.
