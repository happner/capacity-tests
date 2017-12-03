const startle = require('startle');
const { increment, gauge } = startle;
const Primus = require('happn-primus');
const Socket = Primus.createSocket({ transformer: 'websockets' });

startle.onStart((opts, done) => {

  const { incrementSize, startAt } = opts.activity;
  const interval = 1000 / incrementSize;
  const intervals = [];
  const waiting = {};
  var count = 0;
  var connected = false;

  const client = new Socket('http://localhost:9999');

  client.on('open', () => {
    connected = true;
    done();
  });

  client.on('data', payload => {
    increment('primus_replied');
    const now = Date.now();
    gauge('primus_replytime', now - payload.timestamp);
    const senttime = waiting[payload.id];
    delete waiting[payload.id];
    gauge('primus_totaltime', now - senttime);
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
    increment('primus_called');
    client.write(payload);
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
    gauge('primus_waiting', Object.keys(waiting).length);
  }, 500);


});
