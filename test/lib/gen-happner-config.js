module.exports = test => {
  return state => {

    console.log('TODO: min peers');
    console.log('TODO: database');
    console.log('TODO: security');

    var config = {
      // name: 'MESH_' + state.count,
      domain: 'DOMAIN_NAME',
      port: 57000 + state.count,
      cluster: {
        requestTimeout: 10 * 1000,
        responseTimeout: 20 * 1000
      },
      happn: {
        secure: false,
        services: {
          membership: {
            config: {
              host: '127.0.0.1',
              port: 56000 + state.count,
              seed: state.count == 0,
              seedWait: 2000,
              hosts: ['127.0.0.1:56000']
            }
          },
          proxy: {
            config: {
              port: 55000 + state.count
            }
          },
          orchestrator: {
            config: {
              // minimumPeers: minPeers || 3
            }
          }
        }
      }
    }

    return config;
  }
}
