/* To run the test, type in the terminal:

    npm t promises-implementation-test.js
*/

let assert = require('assert');
let { test } = require('mocha');
let { demoPromise, DemoPromise } = require('./promises-implementation');

test('Settings are ok', function() {
  assert.equal(demoPromise, `A Promise implementation`);
});

describe('The standalone DemoPromise implementation', function() {
  test('lets you create a promise', function() {
    let dp = new DemoPromise();
    assert.equal(dp instanceof DemoPromise, true);
  });

  test('promises can resolve', function(done) {
    let dp = new DemoPromise();
    dp.resolve('just a common string');
    dp.then(function(value) {
      assert.equal(value, 'just a common string');
      done();
    });
  });

  test('promises can reject', function(done) {
    let dp = new DemoPromise();
    dp.reject('for some reason');
    dp.then(function(reason) {
      assert.equal(reason, 'for some reason');
      done();
    })
  });
});