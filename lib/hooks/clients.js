const genUser = require('../gen-user');

module.exports.before = (ctx, config, test) => {

  before('start clients', async function () {
    this.timeout(0);
    var clientCount = config.tests[test.testId].clientCount;
    var promises = [];
    for (var i = 0; i < clientCount; i++) {
      promises.push(startClient(ctx, config, test, i));
    }
    ctx.clients = await Promise.all(promises);
  });

}

module.exports.after = ctx => {

  after('stop clients', async function () {
    if (!ctx.clients) return;
    this.timeout(0);
    await Promise.all(
      ctx.clients.map(client => client.kill())
    );
  });

}

async function startClient(ctx, config, test, i) {
  var user = await genUser(ctx, config, test);
  var server = ctx.servers[i % ctx.servers.length];
  var connect = {
    hostname: server.address,
    port: server.opts.happn.services.proxy.config.port,
    secure: true
  };
  var proc = await ctx.agent.start({
    script: 'lib/procs/cluster-client',
    group: 'clients',
    timeout: 20 * 1000
  }, {
    connect: connect,
    user: user,
    test: test,
    metricsAddress: ctx.metricServer.address
  });
  return proc;
}
