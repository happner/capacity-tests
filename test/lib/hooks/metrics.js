module.exports.before = (vars, config) => {

  before('start metrics server', async function () {
    const { opts } = config.netrix;
    vars.metricServer = await vars.agent.start({
      script: 'procs/metrics-server',
      group: 'metrics',
      timeout: 20 * 1000 // ample
    }, opts);

    // vars.metricServer.on('flush', console.log);
  });

}

module.exports.after = vars => {

  after('stop metrics server', async function () {
    if (!vars.metricServer) return;
    this.timeout(0);
    await vars.metricServer.stop({
      timeout: 20 * 1000
    });
  });

}
