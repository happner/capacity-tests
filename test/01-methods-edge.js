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
const testId = parseInt(filename.split('-').shift());

describe(filename, function () {

  var vars = {};

  hooks.agent.before(vars, config);

  hooks.metrics.before(vars, config);

  hooks.mongodb.before(vars, config);

  // hooks.users.before(vars, config, {
  //   testId: testId
  // });

  hooks.metrics.after(vars);

  hooks.agent.after(vars);

  config.tests[testId].clusterSizes.forEach(clusterSize => {

    context('with cluster size ' + clusterSize, function () {

      hooks.servers.before(vars, config, {
        clusterSize: clusterSize,
        testId: testId
      });

      hooks.clients.before(vars, config, {
        testId: testId
      });

      hooks.clients.after(vars);

      hooks.servers.after(vars);

      it('xxx', function (done) {

        setTimeout(done, 100);

      });

    });

  });

});
