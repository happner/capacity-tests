const startle = require('startle');
const elasticsearch = require('../elasticsearch');

module.exports.before = (ctx, config) => {

  before('start agent', async function () {
    this.timeout(0);
    const { connections, defaults } = config.startle;
    ctx.agent = await startle.createAgent(connections, defaults);
    ctx.agent.on('metrics', (timestamp, metrics) => {
      // console.log(timestamp, metrics);
      elasticsearch.store(timestamp, metrics);
    })
  });

}

module.exports.after = ctx => {

  after('stop agent', async function () {
    if (!ctx.agent) return;
    this.timeout(0);
    await ctx.agent.destroy();
  });

}
