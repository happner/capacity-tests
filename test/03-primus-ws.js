/*

  how fast can primus go, just by itself

*/

const path = require('path');
const filename = path.basename(__filename);
const config = require('../config');
const hooks = require('../lib/hooks');
const testId = filename.split('-').shift();


describe(filename, function () {

  const ctx = {};

  hooks.agent.before(ctx, config);

  hooks.agent.after(ctx);

  before('start primus server', async function () {
    this.timeout(0);
    ctx.server = await ctx.agent.start({
      script: 'lib/procs/primus-server',
      group: 'servers'
    });
  });

  before('start primus clients', async function () {
    this.timeout(0);
    var {clientCount, activity} = config.tests[testId];
    var promises = [];
    for (var i = 0; i < clientCount; i++) {
      promises.push(ctx.agent.start({
        script: 'lib/procs/primus-client',
        group: 'clients'
      }, {
        host: ctx.server.address,
        activity: activity
      }));
    }
    ctx.clients = await Promise.all(promises);
  });

  after('stop primus clients', async function () {
    if (!ctx.clients) return;
    await Promise.all(ctx.clients.map(client => client.kill()));
  });

  after('stop primus server', async function () {
    if (!ctx.server) return;
    await ctx.server.kill();
  });

  it('xxx', function (done) {
    this.timeout(0);

    var interval = setInterval(() => {
      ctx.clients.forEach(client => client.send('increment-activity'));
    }, 1000);

  });

});
