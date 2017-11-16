const genHappnerComponents = require('./gen-happner-components');

module.exports = (config, test) => {
  return state => {

    const {components, modules} = genHappnerComponents(config, test, state);

    var genConfig = {
      domain: 'DOMAIN_NAME',
      port: 57000 + state.count,
      cluster: {
        requestTimeout: 10 * 1000,
        responseTimeout: 20 * 1000
      },
      happn: {
        secure: true,
        // setOptions: {
        //   timeout: 60000
        // },
        services: {
         //  queue: {
         //     config: {
         //         mode: 'direct'
         //     }
         // },
          security: {
            config: {
              adminUser: {
                username: '_ADMIN',
                password: config.happn.adminPassword
              }
            }
          },
          data: {
            config: {
              datastores: [
                {
                  name: 'mongo',
                  provider: 'happn-service-mongo-2',
                  isDefault: true,
                  settings: {
                    collection: config.mongodb.collection,
                    database: config.mongodb.collection,
                    url: config.mongodb.url
                  }
                }
              ]
            }
          },
          membership: {
            config: {
              host: state.target.address,
              port: 56000 + state.count,
              seed: state.count == 0,
              seedWait: 2000
              // hosts: []
            }
          },
          proxy: {
            config: {
              port: 55000 + state.count
            }
          },
          orchestrator: {
            config: {
              minimumPeers: test.clusterSize
            }
          }
        }
      },
      modules: modules,
      components: components
    }

    if (state.count != 0) {
      genConfig.happn.services.membership.config.hosts = [
        state.groups.servers[0].address + ':56000'
      ]
    } else {
      genConfig.happn.services.membership.config.hosts = [
        state.target.address + ':56000'
      ]
    }

    return genConfig;
  }
}
