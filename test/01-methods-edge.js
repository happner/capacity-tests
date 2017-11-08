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
const hooks = require('./lib/hooks');
const testId = filename.split('-').shift();

describe(filename, function () {

  var ctx = {};

  hooks.agent.before(ctx, config);

  hooks.metrics.before(ctx, config);

  // hooks.users.before(ctx, config, {
  //   testId: testId
  // });

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

        // this.timeout(0);
        // setTimeout(done, 100000);

        setTimeout(done, 1000);

      });

    });

  });

});
