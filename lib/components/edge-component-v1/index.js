module.exports = Component;

const {NetrixClient} = require('netrix');

function Component() {};

Component.prototype.start = function ($happn, callback) {
  this.nc = new NetrixClient({
    host: $happn.metricsAddress
  });
  this.nc.start()
    .then(function () {
      callback();
    })
    .catch(callback);
}

Component.prototype.stop = function ($happn, callback) {
  this.nc.stop()
    .then(function () {
      callback();
    })
    .catch(callback);
}

Component.prototype.shallowMethod1 = function($happn, timestamp, callback) {
  callback();
}
