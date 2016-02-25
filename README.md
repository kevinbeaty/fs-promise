# fs-promise

[![Build Status](https://secure.travis-ci.org/kevinbeaty/fs-promise.svg)](http://travis-ci.org/kevinbeaty/fs-promise)

Proxies all async [`fs`][1] and [`fs-extra`][2] methods exposing them as ES 2015 (ES6) compatible promises.

Passes all sync methods through as values.

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

Detects a `Promise` implementation using [`any-promise`][3]. If you have a preferred implementation, or are working in an environment without a global implementation, you must explicitly register a `Promise` implementation and it will be used. See [`any-promise`][3] for details.

Typical installation:

```bash
$ npm install --save fs-promise
```

Note that `fs-extra` depends on `graceful-fs`, so you will get the benefits of both libraries.

[1]: https://nodejs.org/api/fs.html
[2]: https://www.npmjs.org/package/fs-extra
[3]: https://github.com/kevinbeaty/any-promise
