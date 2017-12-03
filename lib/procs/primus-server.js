const startle = require('startle');
const { increment, gauge } = startle;
const Primus = require('happn-primus');
const http = require('http');

startle.onStart((opts, done) => {

  const server = http.createServer();
  const primus = new Primus(server, { transformer: 'websockets' });

  primus.on('connection', client => {

    client.on('data', payload => {

      increment('primus_handled');
      const now = Date.now();
      gauge('primus_requesttime', now - payload.timestamp);
      payload.timestamp = now;
      client.write(payload);

    });

  });

  server.listen(9999);
  server.on('listening', done);

});
