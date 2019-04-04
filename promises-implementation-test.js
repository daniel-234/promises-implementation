/* To run the test, type in the terminal:

    npm t promises-implementation-test.js
*/

let assert = require('assert');
let { test } = require('mocha');
let { demoPromise, DemoPromise } = require('./promises-implementation');

test('Settings are ok', function() {
  assert.equal(demoPromise, `A Promise implementation`);
});

describe('The DemoPromise implementation', function() {
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
    });
  });

  test('promises can chain', function(done) {
    let dp = new DemoPromise();
    dp.resolve(123);
    dp.then(function(value1) {
      assert.equal(value1, 123);
      return 'abc';
    }).then(function(value2) {
      assert.equal(value2, 'abc');
      done();
    })
  });
});

describe('DemoPromise fulfills by returning in reactions', function() {
  test('it fulfills via onFulfilled', function(done) {
    let dp = new DemoPromise();
    dp.resolve();
    dp.then(function(value1) {
        assert.equal(value1, undefined);
        return 123;
      }).then(function(value2) {
        assert.equal(value2, 123);
        done();
      })
  });

  test('it fulfills via onRejected', function(done) {
    let dp = new DemoPromise();
    dp.reject();
    dp.catch(function(reason) {
        assert.equal(reason, undefined);
        return 123;
      }).then(function(value) {
        assert.equal(value, 123);
        done();
      });
  });
});

describe('Rejecting by throwing in reactions', function() {
  test('it rejects via onFulfilled', function(done) {
    let myError;
    let dp = new DemoPromise();
    dp.resolve();
    dp.then(function(value) {
        assert.equal(value, undefined);
        throw myError = new Error();
      }).catch(function(reason) {
        assert.equal(reason, myError);
        done();
      });
  });

  test('it rejects via onRejected', function(done) {
    let myError;
    let dp = new DemoPromise();
    dp.reject();
    dp.catch(function(reason1) {
        assert.equal(reason1, undefined);
      }).catch(function(reason2) {
        assert.equal(reason2, myError);
      });
  });
});