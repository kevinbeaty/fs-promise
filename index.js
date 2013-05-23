'use strict';

var fs,
    Promise = require('promise'),
    slice = Array.prototype.slice,
    noError = ['exists', 'existsSync'];

try {
  fs = require('fs-extra');
} catch(e) {
  try {
    fs = require('graceful-fs');
  } catch(e2){
    fs = require('fs');
  }
}

Object.keys(fs).forEach(function(key) {
  var func = fs[key];
  if (typeof func == 'function')
    if(noError.indexOf(key) < 0){
      exports[key] = promise(func);
    } else {
      exports[key] = promiseWithoutError(func);
    }
});

function promise(func){
  return function(){
    var args = slice.call(arguments);
    return new Promise(function(resolve, reject){
      args.push(function(err, res){
        if(err) reject(err);
        else resolve(res);
      });
      func.apply(fs, args);
    });
  };
}

function promiseWithoutError(func){
  return function(){
    var args = slice.call(arguments);
    return new Promise(function(resolve){
      args.push(resolve);
      func.apply(fs, args);
    });
  };
}
