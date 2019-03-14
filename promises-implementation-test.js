/* To run the test, type in the terminal:

    npm t promises-implementation-test.js
*/

let assert = require('assert');
let mocha = require('mocha');
let test = mocha.test;
let promisesImplementation = require('./promises-implementation');

test('settings are ok', function() {
  assert.equal(promisesImplementation.demoPromise, `A promises implementation`);
});