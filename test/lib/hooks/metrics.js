module.exports.start = (context, config) => {

  before('start metrics server', async function () {
    const { opts } = config.netrix;
    context.metricServer = await context.agent.start({
      script: 'procs/metrics-server',
      group: 'metrics',
      timeout: 20 * 1000 // ample
    }, opts);

    // context.metricServer.on('flush', console.log);
  });

}

module.exports.stop = context => {

  after('stop metrics server', async function () {
    if (!context.metricServer) return;
    this.timeout(0);
    await context.metricServer.stop({
      timeout: 20 * 1000
    });
  });

}
