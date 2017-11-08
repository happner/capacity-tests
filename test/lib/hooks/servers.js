const genHappnerConfig = require('../gen-happner-config');

module.exports.before = (ctx, config, test) => {

  before('start servers', async function () {
    this.timeout(0);
    var promises = [];
    for (var i = 0; i < test.clusterSize; i++) {
      promises.push(ctx.agent.start({
        script: 'procs/cluster-server',
        group: 'servers',
        timeout: 20 * 1000
      }, genHappnerConfig(test)));
    }

    ctx.servers = await Promise.all(promises);
  });

}

module.exports.after = ctx => {

  after('stop servers', async function () {
    if (!ctx.servers) return;
    this.timeout(0);
    await Promise.all(
      ctx.servers.map(server => server.kill())
    )
  });

}
