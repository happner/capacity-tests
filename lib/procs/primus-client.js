const startle = require('startle');
const Primus = require('happn-primus');
const Socket = Primus.createSocket();

startle.onStart((opts, done) => {

  const client = new Socket('http://localhost:9999');

  client.on('open', done);

});

/*

var Primus = require('primus') // Primus library from npm install primus
  , Socket = Primus.createSocket({ transformer: transformer, parser: parser })
  , client = new Socket('http://localhost:8080');

  */
