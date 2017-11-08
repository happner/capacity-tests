const startle = require('startle');

module.exports.before = (ctx, config) => {

  before('start agent', async function () {
    this.timeout(0);
    const { connections, defaults } = config.startle;
    ctx.agent = await startle.createAgent(connections, defaults);
  });

}

module.exports.after = ctx => {

  after('stop agent', async function () {
    if (!ctx.agent) return;
    this.timeout(0);
    await ctx.agent.destroy();
  });

}
