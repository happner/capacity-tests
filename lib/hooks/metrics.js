const elasticsearch = require('../elasticsearch');

module.exports.before = (ctx, config) => {

  before('start metrics server', async function () {
    this.timeout(0);
    const { opts } = config.netrix;
    ctx.metricServer = await ctx.agent.start({
      script: 'lib/procs/metrics-server',
      group: 'metrics',
      timeout: 20 * 1000 // ample
    }, opts);

    ctx.metricServer.on('flush', (timestamp, metrics) => {
      elasticsearch.store(
        config.elasticsearch.url,
        timestamp,
        metrics,
        ctx
      );
    });
  });

}

module.exports.after = ctx => {

  after('stop metrics server', async function () {
    if (!ctx.metricServer) return;
    this.timeout(0);
    await ctx.metricServer.stop({
      timeout: 20 * 1000
    });
  });

}
