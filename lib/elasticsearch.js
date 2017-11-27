/*
const request = require('request');
const config = require('../config');

module.exports.store = (timeStamp, metrics) => {
  const url = config.elasticsearch.url;
  if (!url) return;
  var timestamp;
  var value;
  var type;

  timestamp = new Date(timeStamp);

  for (var name in metrics.counters) {
    value = metrics.counters[name];
    type = 'counter';
    storeMetric(url, timestamp, name, value, type);
  }

  for (var name in metrics.gauges) {
    value = metrics.gauges[name];
    type = 'gauge';
    storeMetric(url, timestamp, name, value, type);
  }

}

function storeMetric(url, timestamp, name, value, type) {
  var record = {
    timestamp: timestamp,
    name: name,
    value: value,
    type: type
  };

  record[name] = value;

  request({
    url: url,
    method: 'POST',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify(record)
  }, function (err, res, body) {
    if (err) {
      console.log('elasticsearch error', err.toString());
      return;
    }
    if (res.statusCode !== 201) {
      console.log('elasticsearch insert metric failed:' + res.statusCode +
        ' ' + res.statusMessage, body);
      return;
    }
  });

}
*/
