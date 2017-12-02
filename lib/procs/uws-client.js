const startle = require('startle');
const { increment, gauge } = startle;
const WebSocket = require('uws');

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
    increment('uws_replied');
    const now = Date.now();
    const payload = JSON.parse(msg);
    gauge('uws_replytime', now - payload.timestamp);
    const senttime = waiting[payload.id];
    delete waiting[payload.id];
    gauge('uws_totaltime', now - senttime);
  });

  function doActivity() {
    if (!connected) return;
    const payload = {
      thisis: 'hopefully a',
      typical: 'payload size',
      fora: 'happn message',
      with: 'a bunch of bits',
      and: 'bobs of stuff',
      in: 'it but also with an',
      id: count++,
      timestamp: Date.now()
    }
    waiting[payload.id] = payload.timestamp;
    increment('uws_called');
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

  setInterval(function () {
    gauge('uws_waiting', Object.keys(waiting).length);
  }, 500);

});
