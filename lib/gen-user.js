const random = require('randomstring');

module.exports = async (ctx, config, test) => {
  const generate = require('./configs/' + test.testId + '-user');

  const username = random.generate();
  const password = random.generate();
  const groupname = random.generate();

  const {user, group} = generate(username, password, groupname);
  await createUser(ctx.servers[0], user, group);
  return user;
}

function createUser(server, user, group) {
  return new Promise((resolve, reject) => {
    server.send('create-user', user, group);
    server.once(user.username, function (err) {
      let error;
      if (err) {
        error = new Error(err.message);
        error.name = err.name;
        return reject(error);
      }
      resolve();
    });
  });
}
