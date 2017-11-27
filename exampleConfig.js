module.exports = {

  startle: {
    connections: [
      { port: 50001 },
      { port: 50002 }
    ],
    defaults: {
      token: 'XXX',
      rejectUnauthorized: false,
      host: 'localhost'
    }
  },

  happn: {
    adminPassword: 'xxx'
  },

  elasticsearch: {
    // DEBUG=happn-stats* npm test
    url: 'http://localhost:9200',
    index: 'capacity-stats',
    type: 'stats'
  },

  mongodb: {
    collection: 'happner-capacity-tests',
    url: 'mongodb://127.0.0.1:27017'
  },

  tests: {
    '01': {
      clusterSizes: [1],
      clientCount: 1,

      activity: {
        // each increment increases load by 2 actions per second
        incrementSize: 2,

        // start at 20 incrementSizes of load (20 * 2 actions per second)
        startAt: 20,

        // saturationThreshold: 1.25,
        // saturationConfirmThreshold: 10

      }
    },
    '02': {
      clientCount: 5,
      activity: {
        incrementSize: 2,
        startAt: 20
      }
    }
  }

}
