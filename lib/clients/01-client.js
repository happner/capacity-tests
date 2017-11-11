const Client = require('./client');
const { increment, gauge } = require('startle');

module.exports = class Client01 extends Client {

  static async createController(meshClient, opts) {
    var client = new Client01(meshClient, opts);
    return await client.start();
  }

  constructor(meshClient, opts) {
    super(meshClient, opts);
    this.componentSelector = -1;
    this.methodSelector = -1;
    this.called = 0;
    this.replied = 0;
    increment('methods_errored', 0);
    setInterval(() => {
      // console.log('intended:', this.intervals.length * this.activity.incrementSize, ' called:', this.called, ' replied:', this.replied);
      this.called = 0;
      this.replied = 0;
    }, 1000);
  }

  doActivity() {
    this.called++;
    const componentNum = this.selectComponent();
    const methodNum = this.selectMethod();
    const component = 'edgeComponent' + componentNum;
    const method = 'shallowMethod' + methodNum;
    const inTS = Date.now();
    increment('methods_called');
    this.meshClient.exchange[component][method](inTS)
      .then(outTs => {
        this.replied++;
        const doneTs = Date.now();
        gauge('methods_replytime', doneTs - outTs);
        gauge('methods_totaltime', doneTs - inTS);
        increment('methods_replied');
      })
      .catch(err => {
        increment('methods_errored');
        this.meshClient.log.warn(err.toString());
      })
  }

  selectComponent() {
    this.componentSelector++;
    if (this.componentSelector > 99) {
      this.componentSelector = 0;
    }
    return Math.floor(this.componentSelector / 10);
  }

  selectMethod() {
    this.methodSelector++;
    if (this.methodSelector > 0) {
      this.methodSelector = 0;
    }
    return this.methodSelector;
  }

}
