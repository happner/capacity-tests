const startle = require('startle');
const HappnerCluster = require('happner-cluster');

var server;

startle.onStart(async (opts, done) => {
  if (!opts.happn.services.membership.config.seed) {
    // give the seed server a head start because otherwise
    // all the servers race to create the admin users and
    // then:
    //
    // MongoError: E11000 duplicate key error collection:
    // happner-capacity-tests.happner-capacity-tests
    // index: path_1 dup key: { : "/_SYSTEM/_SECURITY/_GROUP/_ADMIN" }
    await pause(1000);
  }
  server = await HappnerCluster.create(opts);
});

startle.on('create-user', async function (user, group) {
  try {
    await createUser(user, group);
    startle.send(user.username);
  } catch (e) {
    startle.send({
      name: e.name,
      message: e.message
    });
  }
});

function pause (ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function createUser(user, group) {
  var user = await server.exchange.security.addUser(user);
  var group = await server.exchange.security.addGroup(group);
  await server.exchange.security.linkGroup(group, user);
}
