const startle = require('startle');
const Happner = require('happner-2');

// create an instance of happner in order
// to insert users into the database

startle.onStart(async opts => {

  let server = await Happner.create({
    happn: {
      services: {
        security: {
          config: {
            adminUser: {
              username: '_ADMIN',
              password: opts.happn.adminPassword
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
                  collection: opts.mongodb.collection,
                  database: opts.mongodb.collection,
                  url: opts.mongodb.url
                }
              }
            ]
          }
        }
      }
    }
  });

});
