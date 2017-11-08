const startle = require('startle');

startle.onStart(async opts => {

  console.log('USER', opts.user);

});

startle.onStop(async opts => {

});
