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

Component.prototype.shallowMethod0 = function($happn, inTs, callback) {
  const outTs = Date.now();
  const inLag = outTs - inTs;
  this.nc.gauge('methods.inlag', inLag);
  this.nc.increment('methods.handled');
  callback(null, outTs);
}
