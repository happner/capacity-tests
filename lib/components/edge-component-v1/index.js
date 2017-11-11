module.exports = Component;
const { increment, gauge } = require('startle');

// var count = 0;
// setInterval(() => {
//   console.log('methods.handled', count);
//   count = 0;
// }, 1000);

function Component() {};

Component.prototype.start = function ($happn, callback) {
  callback();
}

Component.prototype.stop = function ($happn, callback) {
  callback();
}

Component.prototype.shallowMethod0 = function ($happn, inTs, callback) {
  // count++;
  const outTs = Date.now();
  const inLag = outTs - inTs;
  gauge('methods_requesttime', inLag);
  increment('methods_handled');
  callback(null, outTs);
}
