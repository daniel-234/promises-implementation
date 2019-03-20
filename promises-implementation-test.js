/* To run the test, type in the terminal:

    npm t promises-implementation-test.js
*/

let assert = require('assert');
let { test } = require('mocha');
let { demoPromise, DemoPromise } = require('./promises-implementation');

test('settings are ok', function() {
  assert.equal(demoPromise, `A Promise implementation`);
});

describe('In the standalone DemoPromise implementation', function() {
  test('You can create a DemoPromise', function() {
    let dp = new DemoPromise();
    assert.equal(dp instanceof DemoPromise, true);
  });
});