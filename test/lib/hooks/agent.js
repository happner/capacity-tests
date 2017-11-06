const startle = require('startle');

module.exports.start = (context, config) => {

  before('start agent', async function () {
    this.timeout(0);
    const { connections, defaults } = config.startle;
    context.agent = await startle.createAgent(connections, defaults);
  });

}

module.exports.stop = context => {

  after('stop agent', async function () {
    if (!context.agent) return;
    this.timeout(0);
    await context.agent.destroy();
  });

}
