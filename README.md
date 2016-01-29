# fs-promise

[![Build Status](https://secure.travis-ci.org/kevinbeaty/fs-promise.svg)](http://travis-ci.org/kevinbeaty/fs-promise)

Proxies all async `fs` methods exposing them as ES 2015 (ES6) compatible promises.

Passes all sync methods through as values.

Also exposes to [graceful-fs][1] and/or [fs-extra][2] methods if they are installed.

Uses [any-promise][3] to load preferred `Promise` implementation.

```javascript
var fsp = require('fs-promise');

fsp.writeFile(file('hello1'), 'hello world')
  .then(function(){
    return fsp.readFile(file('hello1'), {encoding:'utf8'});
  })
  .then(function(contents){});
```

## Usage

Attempts to load libraries in the following order. The first successful require will be proxied to a Promise based implementation.

- [`fs-extra`](https://github.com/jprichardson/node-fs-extra)
- [`graceful-fs`](https://github.com/isaacs/node-graceful-fs)
- `fs` from standard library

Detects a `Promise` implementation using [`any-promise`][3]. If you have a preferred implementation, or are working in an environment without a global implementation, you must explicitly register a `Promise` implementation and it will be used. See [`any-promise`][3] for details.

Typical installation:

```bash
$ npm install --save fs-extra
$ npm install --save fs-promise
```

Note that `fs-extra` depends on `graceful-fs`, so you would get the benefits of both libraries.

[1]: https://github.com/isaacs/node-graceful-fs
[2]: https://www.npmjs.org/package/fs-extra
[3]: https://github.com/kevinbeaty/any-promise
