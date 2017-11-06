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

describe(filename, function () {

  var context = {};

  hooks.agent.start(context, config);

  hooks.metrics.start(context, config);

  hooks.metrics.stop(context);

  hooks.agent.stop(context);

  it('xxx', function (done) {

    setTimeout(done, 500);

  });

});
