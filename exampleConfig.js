module.exports = {

  startle: {
    connections: [{
      port: 50001
    }, {
      port: 50002
    }, {
      port: 50003
    }],
    defaults: {
      token: 'XXX',
      rejectUnauthorized: false,
      host: 'localhost'
    }
  },

  netrix: {
    opts: {
      flushInterval: 2000
    }
  },

  happn: {
    adminPassword: 'xxx'
  },

  elasticsearch: {
    // url: 'http://localhost:9200/cluster-capacity/stats'
  },

  mongodb: {
    collection: 'happner-capacity-tests',
    url: 'mongodb://127.0.0.1:27017'
  },

  tests: {
    '01': {
      clusterSizes: [3],
      clientCount: 1,

      activity: {
        // each increment increases load by 2 actions per second
        incrementSize: 2,

        // start at 5 incrementSizes of load (5 * 2 actions per second)
        startAt: 5,

        saturationThreshold: 1.25,
        saturationConfirmThreshold: 10

      }
    }
  }

}
