'use strict';

var fs = require('fs-extra');
var Promise = require('any-promise');
var slice = Array.prototype.slice;

var keys = Object.keys(fs);
var promiseKeys = ['access', 'readFile', 'close', 'open', 'read', 'write', 'rename', 'truncate', 'ftruncate', 'rmdir', 'fdatasync', 'fsync', 'mkdir', 'readdir', 'fstat', 'lstat', 'stat', 'readlink', 'symlink', 'link', 'unlink', 'fchmod', 'lchmod', 'chmod', 'lchown', 'fchown', 'chown', '_toUnixTimestamp', 'utimes', 'futimes', 'writeFile', 'appendFile', 'realpath', 'lutimes', 'gracefulify', 'copy', 'mkdirs', 'mkdirp', 'ensureDir', 'remove', 'readJson', 'readJSON', 'writeJson', 'writeJSON', 'outputJson', 'outputJSON', 'move', 'createOutputStream', 'emptyDir', 'emptydir', 'createFile', 'ensureFile', 'createLink', 'ensureLink', 'createSymlink', 'ensureSymlink', 'outputFile'];
var streamKeys = ['walk'];
var noErrorKeys = ['exists'];

keys.forEach(function (key) {
  var func = fs[key];

  if (promiseKeys.indexOf(key) !== -1) {
    exports[key] = function () {
      var args = slice.call(arguments);

      return new Promise(function (resolve, reject) {
        args.push(function(error, response) {
          if (error) {
            reject(error);
          } else {
            resolve(response);
          }
        });

        func.apply(fs, args);
      });
    };
  } else if (noErrorKeys.indexOf(key) !== -1) {
    exports[key] = function () {
      var args = slice.call(arguments);

      return new Promise(function (resolve) {
        args.push(resolve);

        func.apply(fs, args);
      });
    };
  } else if (streamKeys.indexOf(key) !== -1) {
    exports[key] = function () {
      var args = slice.call(arguments);

      return new Promise(function (resolve, reject) {
        var stream = func.apply(fs, args);
        var items = [];

        stream
          .on('data', function (item) {
            items.push(item);
          })
          .on('end', function () {
            resolve(items);
          })
          .on('error', function (error) {
            reject(error);
          });
      });
    };
  } else {
    exports[key] = func;
  }
});
