const { NetrixClient } = require('netrix');
const config = require('../../config');

module.exports = class Client {

  constructor(meshClient, opts) {
    this.meshClient = meshClient;
    this.test = opts.test;
    this.intervals = [];
    this.activity = config.tests[opts.test.testId].activity;
    this.interval = 1000 / this.activity.incrementSize;
    this.nc = new NetrixClient({
      host: opts.metricsAddress
    });
  }

  async start() {
    await this.nc.start();
    for (var i = 0; i < this.activity.startAt; i++) {
      this.incrementActivity();
    }
    return this;
  }

  incrementActivity() {
    this.intervals.push(setInterval(() => {
      this.doActivity();
    }, this.interval));
  }

  decrementActivity() {
    clearInterval(this.intervals.pop());
  }

}
