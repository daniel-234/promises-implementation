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
  this.fulfillReactions = [];
  this.rejectReactions = [];
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
  this.fulfillReactions.map(addToTaskQueue);
  this.fulfillReactions = undefined;
  return this;
};

/**
 * Change the state of the Promise to 'rejected' and cache the result in this.promiseResult.
 * 
 * @param {*} reason - The reason for rejection.
 * @returns {Object} An object instance of this class with the assigned property values.
 */
DemoPromise.prototype.reject = function(reason) {
  this.promiseState = 'rejected';
  this.promiseResult = reason;
  this.rejectReactions.map(addToTaskQueue);
  this.rejectReactions = undefined;
  return this;
};

/**
 * Handle the resolved promise result.
 * 
 * @param {Function} - The callback that handles the promise result.
 */
DemoPromise.prototype.then = function(onFulfilled, onRejected) {
  // Create a new DemoPromise object;
  let returnValue = new DemoPromise();

  let fulfilledTask;
  if (typeof onFulfilled === 'function') {
    /**
     * Bind the resolution callback to "fulfilledTask". 
     */
    fulfilledTask = (function() {
      let result = onFulfilled(this.promiseResult);
      // Resolve with whathever onFulfilled returns.
      returnValue.resolve(result);
    }).bind(this);     
  } else {
    fulfilledTask = (function() {
      // Pass on whatever is received. 
      returnValue.resolve(this.promiseResult);
    }).bind(this);
  }  

  let rejectedTask;
  if (typeof onRejected === 'function') {
    /**
     * Bind the rejection callback to "rejectedTask". 
     */
    rejectedTask = (function() {
      let result = onRejected(this.promiseResult);
      // Resolve with whatever onRejected returns. 
      returnValue.resolve(result);
    }).bind(this);
  } else {
    rejectedTask = (function() {
      // Pass on whatever is rejected.
      returnValue.resolve(this.promiseResult);
    }).bind(this);
  }  

  switch(this.promiseState) {
    case 'pending':
      this.fulfillReactions.push(fulfilledTask);
      this.rejectReactions.push(rejectedTask);
      break;
    case 'fulfilled':
      addToTaskQueue(fulfilledTask);
      break;
    case 'rejected':
      addToTaskQueue(rejectedTask);
      break;
  }  

  return returnValue;
};

/**
 * Handle the rejected promise result.
 * 
 * @param {Function} - The callback that handles the promise rejection.
 */
DemoPromise.prototype.catch = function(onRejected) {
  return this.then(null, onRejected);
}

/**
 * Add task to the task queue. 
 * 
 * @param {Function} task 
 */
function addToTaskQueue(task) {
  setTimeout(task, 0);
}