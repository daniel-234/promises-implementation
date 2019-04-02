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
 * Change the state of the Promise to 'rejected' and cache the result in this.promiseResult.
 * 
 * @param {*} reason - The reason for rejection
 * @returns {Object} An object instance of this class with the assigned property values.
 */
DemoPromise.prototype.reject = function(reason) {
  this.promiseState = 'rejected';
  this.promiseResult = reason;
  return this;
};

/**
 * Handle the promise result.
 * 
 * @param {Function} - The callback that handles the promise result.
 */
DemoPromise.prototype.then = function(onFulfilled, onRejected) {
  /**
   * Bind the resolution callback to "fulfilledTask". 
   */
  let fulfilledTask = (function() {
    onFulfilled(this.promiseResult);
  }).bind(this);

  /**
   * Bind the rejection callback to "rejectedTask". 
   */
  let rejectedTask = (function() {
    // TODO
    // CHange later to onRejected
    onFulfilled(this.promiseResult);
  }).bind(this);

  switch(this.promiseState) {
    case 'pending':
      break;
    case 'fulfilled':
      addToTaskQueue(fulfilledTask);
      break;
    case 'rejected':
      addToTaskQueue(rejectedTask);
      break;
  }  
};

/**
 * Add task to the task queue. 
 * 
 * @param {Function} task 
 */
function addToTaskQueue(task) {
  setTimeout(task, 0);
}