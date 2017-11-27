const startle = require('startle');
const ElasticsearchPlugin = require('happn-stats-elasticsearch');
const { EventEmitter } = require('events');
// const elasticsearch = require('../elasticsearch');

module.exports.before = (ctx, config) => {

  before('start agent', async function () {
    this.timeout(0);
    const { connections, defaults } = config.startle;
    ctx.agent = await startle.createAgent(connections, defaults);

    process.env.ELASTIC_URL = config.elasticsearch.url;
    process.env.ELASTIC_INDEX = config.elasticsearch.index;
    process.env.ELASTIC_TYPE = config.elasticsearch.type;

    ctx.elasticPlugin = new ElasticsearchPlugin(new EventEmitter());
    await ctx.elasticPlugin.start();

    ctx.agent.on('metrics', (timestamp, metrics) => {
      var time = new Date(timestamp);
      ctx.elasticPlugin._storeMetrics(time, 'counters', metrics.counters);
      ctx.elasticPlugin._storeMetrics(time, 'gauges', metrics.gauges);
    });

  });

}

module.exports.after = ctx => {

  after('stop agent', async function () {
    if (!ctx.agent) return;
    this.timeout(0);
    await ctx.elasticPlugin.stop();
    await ctx.agent.destroy();
  });

}
