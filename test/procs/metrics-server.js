const startle = require('startle');
const { createServer } = require('netrix');

var server;

startle.onStart(async opts => {
  server = await createServer(opts);

  server.on('flush', (timestamp, metrics) => {
    startle.send('flush', timestamp, metrics);
  });
});

startle.onStop(async () => await server.stop());

startle.on('reset', () => server.reset());
