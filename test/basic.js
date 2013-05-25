'use strict';
/*globals describe, it, beforeEach, afterEach */

var fsp = require('..'),
    path = require('path'),
    assert = require('assert'),
    testdir = path.join(__dirname, 'tmp');

describe('basic', function(){
  beforeEach(function(){
    return fsp.mkdir(testdir).then(existstmp(true));
  });

  afterEach(function(){
    return fsp.remove(testdir).then(existstmp(false));
  });

  it('should create files and readdir', function(){
    return fsp.createFile(file('hello')).then(readtmp).then(function(files){
      assert.deepEqual(files.sort(), ['hello']);
      return fsp.createFile(file('world'));
    }).then(readtmp).then(function(files){
      assert.deepEqual(files.sort(), ['hello', 'world']);
    });
  });

  it('should pass through Sync as value', function(){
    return fsp.createFile(file('hello')).then(function(files){
      assert(fsp.existsSync(file('hello')));
      assert(!fsp.existsSync(file('world')));
      return fsp.createFile(file('world'));
    }).then(readtmp).then(function(files){
      assert(fsp.existsSync(file('hello')));
      assert(fsp.existsSync(file('world')));
    });
  });
});

function file(){
  var args = [].slice.call(arguments);
  args.unshift(testdir);
  return path.join.apply(path, args);
}

function existstmp(shouldExist){
  return function(){
    return fsp.exists(testdir).then(function(exists){
        assert.equal(exists, shouldExist);
      });
  };
}

function readtmp(){
  return fsp.readdir(testdir);
}
