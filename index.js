'use strict';

var fs,
    Promise = require('promise'),
    slice = Array.prototype.slice,
    noError = /exists/,
    returnValue = /Sync$/;

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
    if(returnValue.test(key)){
      exports[key] = fs[key];
    } else if(noError.test(key)){
      exports[key] = promiseWithoutError(func);
    } else {
      exports[key] = promise(func);
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
