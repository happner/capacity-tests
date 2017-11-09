const Client = require('./client');

module.exports = class Client01 extends Client {

  static async createController(meshClient, opts) {
    var client = new Client01(meshClient, opts);
    return await client.start();
  }

  constructor(meshClient, opts) {
    super(meshClient, opts);
    this.componentSelector = -1;
    this.methodSelector = -1;
  }

  doActivity() {
    const componentNum = this.selectComponent();
    const methodNum = this.selectMethod();
    const component = 'edgeComponent' + componentNum;
    const method = 'shallowMethod' + methodNum;
    const inTS = Date.now();
    this.nc.increment('methods.called');
    this.meshClient.exchange[component][method](inTS)
      .then(outTs => {
        const doneTs = Date.now();
        this.nc.gauge('methods.outlag', doneTs - outTs);
        this.nc.gauge('methods.lag', doneTs - inTS);
        this.nc.increment('methods.replied');
      })
      .catch(err => {
        this.meshClient.log.warn(err);
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
