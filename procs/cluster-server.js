startle = require('startle');
HappnerCluster = require('happner-cluster');

var server;

startle.onStart(async (opts, done) => {
  server = await HappnerCluster.create(opts);
});
