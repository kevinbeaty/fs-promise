# fs-promise

[![Build Status](https://secure.travis-ci.org/kevinbeaty/fs-promise.png)](http://travis-ci.org/kevinbeaty/fs-promise)

Proxies all async `fs` methods exposing them as Promises/A+ compatible promises (when, Q, etc).
Passes all sync methods through as values.

Also exposes to `graceful-fs` and/or `fs-extra` methods if they are installed.
