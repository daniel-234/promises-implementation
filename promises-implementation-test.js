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

  test('promises resolve after the callable "then"', function(done) {
    let dp = new DemoPromise();
    dp.resolve('just a common string');
    dp.then(function(value) {
      assert.equal(value, 'just a common string');
      done();
    });
  });
});