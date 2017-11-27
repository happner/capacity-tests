const startle = require('startle');
const { increment, gauge } = startle;
const WebSocket = require('ws');

startle.onStart((opts, done) => {

  const { incrementSize, startAt } = opts.activity;
  const interval = 1000 / incrementSize;
  const intervals = [];
  const waiting = {};
  var count = 0;
  var connected = false;

  const client = new WebSocket(`ws://${opts.host}:9999`);
  client.on('open', () => {
    connected = true;
    done();
  });

  client.on('message', msg => {
    increment('ws_replied');
    const now = Date.now();
    const payload = JSON.parse(msg);
    gauge('ws_replytime', now - payload.timestamp);
    const senttime = waiting[payload.id];
    delete waiting[payload.id];
    gauge('ws_totaltime', now - senttime);
  });

  function doActivity() {
    if (!connected) return;
    const payload = {
      thisis: 'hopefully a',
      typical: 'payload size',
      fora: 'happn message',
      with: 'a bunch of bits',
      and: 'bobs of stuff',
      in: 'it but also with a',
      id: count++,
      timestamp: Date.now()
    }
    waiting[payload.id] = payload.timestamp;
    increment('ws_called');
    client.send(JSON.stringify(payload));
  }

  function incrementActivity() {
    intervals.push(setInterval(() => {
      doActivity();
    }, interval));
  }

  function decrementActivity() {
    clearInterval(intervals.pop());
  }

  for (var i = 0; i < startAt; i++) {
    incrementActivity()
  }

  startle.on('increment-activity', incrementActivity);
  startle.on('decrement-activity', decrementActivity);

});

/*

const WebSocket = require('ws');

const ws = new WebSocket('ws://www.host.com/path');

ws.on('open', function open() {
  ws.send('something');
});

ws.on('message', function incoming(data) {
  console.log(data);
});

*/
