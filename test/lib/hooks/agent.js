const startle = require('startle');

module.exports.before = (vars, config) => {

  before('start agent', async function () {
    this.timeout(0);
    const { connections, defaults } = config.startle;
    vars.agent = await startle.createAgent(connections, defaults);
  });

}

module.exports.after = vars => {

  after('stop agent', async function () {
    if (!vars.agent) return;
    this.timeout(0);
    await vars.agent.destroy();
  });

}
