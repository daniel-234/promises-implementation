/**
 * Implementation of the Promise functionality.
 * Demo for self study (Copied piece by piece from Alex Rauschmayer project)
 * 
 * See README for credits and links.
 */

module.exports = {
  demoPromise: `A Promise implementation`,
  DemoPromise
};

/**
 * A Promise implementation.
 * @constructor
 */
function DemoPromise() {
  this.promiseResult = undefined;
  this.promiseState = 'pending';
}

/**
 * Change the state of the Promise to 'fulfilled' and cache the result in this.promiseResult.
 * 
 * @param {*} value - The value passed to the promise.
 * @returns {Object} An object instance of this class with the assigned property values. 
 */
DemoPromise.prototype.resolve = function(value) {
  this.promiseState = 'fulfilled';
  this.promiseResult = value;
  return this;
};

/**
 * Handle the promise result.
 * 
 * @param {Function} - The callback that handles the promise result.
 */
DemoPromise.prototype.then = function(onFulfilled) {
  /**
   * Run the callback and store its result. Bind the expression to 
   * same "this" as in DemoPromise.prototype. 
   */
  let fulfilledTask = (function() {
    onFulfilled(this.promiseResult);
  }).bind(this);

  // Add the callback onFulfilled to the Task Queue.
  setTimeout(fulfilledTask, 0);
};