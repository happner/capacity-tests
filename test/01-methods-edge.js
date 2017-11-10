/*

This tests a volume of calls to edge methods only. There are no method calling
other methods deeper in the cluster.

A "multitude" of clients each with a separate user and group call at methods.

The rate of method calls is gradually increased until the cluster reaches
saturation point (i.e. methods being called exceeds methods being run).

This establishes the capacity for the given cluster size.

Then the entire procedure is repeated again with cluster size + 1.

This establishes the actual cluster capacity gain with each increment in size.

*/

const path = require('path');
const filename = path.basename(__filename);
const { EventEmitter } = require('events');
const config = require('../config');
const hooks = require('../lib/hooks');
const testId = filename.split('-').shift();

describe(filename, function () {

  var ctx = {};

  hooks.agent.before(ctx, config);

  hooks.metrics.before(ctx, config);

  hooks.metrics.after(ctx);

  hooks.agent.after(ctx);

  config.tests[testId].clusterSizes.forEach(clusterSize => {

    context('with cluster size ' + clusterSize, function () {

      hooks.mongodb.before(ctx, config);

      hooks.servers.before(ctx, config, {
        clusterSize: clusterSize,
        testId: testId
      });

      hooks.clients.before(ctx, config, {
        testId: testId
      });

      hooks.clients.after(ctx);

      hooks.servers.after(ctx);

      it('xxx', function (done) {
        this.timeout(0);

        var interval = setInterval(() => {
          ctx.clients.forEach(client => client.send('increment-activity'));
        }, 1000);

        var countLabouring = 0;
        var activity = config.tests[testId].activity;
        var saturationThreshold = activity.saturationThreshold;
        var saturationConfirmThreshold = activity.saturationConfirmThreshold;

        ctx.metricServer.on('flush', (timestamp, metrics) => {
          var handled = metrics.gauges['methods.called'];
          var replied = metrics.gauges['methods.replied'];
          if (handled > (replied * saturationThreshold)) {
            countLabouring++;
          } else {
            countLabouring = 0;
          }
          if (countLabouring > saturationConfirmThreshold) {
            clearInterval(interval);
            done();
          }
        });

      });

    });

  });

});
