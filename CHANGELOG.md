# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [v1.0.1](https://github.com/ljharb/json-stable-stringify/compare/v1.0.0...v1.0.1) - 2016-02-02

### Commits

- Correctly stringify non-cyclic shared references [`c26c700`](https://github.com/ljharb/json-stable-stringify/commit/c26c700f0b1d078512d2eba0eb16d6e5110a5538)

## [v1.0.0](https://github.com/ljharb/json-stable-stringify/compare/v0.1.3...v1.0.0) - 2014-05-27

### Commits

- Added options.replacer for custom object serialization [`ccf5e63`](https://github.com/ljharb/json-stable-stringify/commit/ccf5e636803a55d062e97aaf4e2c27d5c787aff0)
- document replacer [`894f43b`](https://github.com/ljharb/json-stable-stringify/commit/894f43b633724bf0c6c2741143addfe20e149015)

## [v0.1.3](https://github.com/ljharb/json-stable-stringify/compare/v0.1.2...v0.1.3) - 2014-05-27

### Commits

- Enable toJSON function to return different types [`de0debf`](https://github.com/ljharb/json-stable-stringify/commit/de0debff3a36604010279af1868c6172674f9cc9)

## [v0.1.2](https://github.com/ljharb/json-stable-stringify/compare/v0.1.1...v0.1.2) - 2014-04-02

### Commits

- Should call 'toJSON' if it is defined on the object being stringified. [`c1de9d1`](https://github.com/ljharb/json-stable-stringify/commit/c1de9d193e8d6755d6ea2c2e5ead0544a8122040)
- guard the reference [`a723f70`](https://github.com/ljharb/json-stable-stringify/commit/a723f705dd13fcbab1aa0ffa51849395712aaa13)
- reindent [`7ff314f`](https://github.com/ljharb/json-stable-stringify/commit/7ff314fabf3b40074a4aff906b16e087897c6040)

## [v0.1.1](https://github.com/ljharb/json-stable-stringify/compare/v0.1.0...v0.1.1) - 2013-12-21

### Commits

- fixed merge conflicts [`7e139e8`](https://github.com/ljharb/json-stable-stringify/commit/7e139e8bbeb37b4dfd44991f4d6c98bba446b949)
- fix formatting [`b5df6b9`](https://github.com/ljharb/json-stable-stringify/commit/b5df6b9ec0f5a5826eebb5d93424923041e43405)

## [v0.1.0](https://github.com/ljharb/json-stable-stringify/compare/v0.0.1...v0.1.0) - 2013-12-21

### Commits

- New “space” option to enable pretty printing (same as ES5) [`e6815c9`](https://github.com/ljharb/json-stable-stringify/commit/e6815c9dd8ca4052023d2bbd5c5b78b44f0efef0)
- formatting [`962edf4`](https://github.com/ljharb/json-stable-stringify/commit/962edf4abb96189546b4f78f8719d747fd90fd43)

## [v0.0.1](https://github.com/ljharb/json-stable-stringify/compare/v0.0.0...v0.0.1) - 2013-07-17

### Commits

- don't choke on null [`3f4e9c7`](https://github.com/ljharb/json-stable-stringify/commit/3f4e9c78befc32f7d36af68e408e25cdc84be202)

## v0.0.0 - 2013-07-17

### Commits

- docs, more examples [`81f36c1`](https://github.com/ljharb/json-stable-stringify/commit/81f36c1aa645a75ebefa6d66d9cf41660439ebfe)
- package.json etc [`98c5fd6`](https://github.com/ljharb/json-stable-stringify/commit/98c5fd6f9b12e1679b90777b9f6384203a05e983)
- working implementation with 2 examples [`3e5363a`](https://github.com/ljharb/json-stable-stringify/commit/3e5363ac542fa3bf0bdef51034ca9201648f9839)
- turn examples into tests, everything passes [`cccbd24`](https://github.com/ljharb/json-stable-stringify/commit/cccbd24c1a1a6318e3c004c86ae032db98a9abf8)
- badges [`f8ff127`](https://github.com/ljharb/json-stable-stringify/commit/f8ff127df9f05d0b238bae8f91e483a755e0069e)
- comparison test now passes [`8ab93e2`](https://github.com/ljharb/json-stable-stringify/commit/8ab93e2273ec530990e28233fcb96fde548ab16c)
- failing custom comparison test [`3af627d`](https://github.com/ljharb/json-stable-stringify/commit/3af627d0d367451a98fc9cec6580760ade8f9bae)
- fix object.keys shim [`7c16662`](https://github.com/ljharb/json-stable-stringify/commit/7c16662bc1cc6ecfa64159f9277e067cb1bec505)
- fix for the other tests that don't use a cmp function [`f7b9a47`](https://github.com/ljharb/json-stable-stringify/commit/f7b9a476fd3ce9ec09b2c0588605e6c7c053e9ed)
