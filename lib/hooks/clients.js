const genUser = require('../gen-user');

module.exports.before = (ctx, config, test) => {

  before('start clients', async function () {
    var user = await genUser(ctx, config, test);

    console.log('USER', user);


  });

}

module.exports.after = ctx => {

  after('stop clients', async function () {
    // TOdO
  });

}
