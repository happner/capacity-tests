const startle = require('startle');
const Primus = require('happn-primus');
const http = require('http');

startle.onStart((opts, done) => {

  const server = http.createServer();
  const primus = new Primus(server, { transformer: 'websockets' });

  primus.on('connection', connection => {


  });

  server.listen(9999);
  server.on('listening', done);

});
