const startle = require('startle');
const { MeshClient } = require('happner-2');
const genClientController = require('../gen-client-controller');
var meshClient;
var controller;

startle.onStart(async opts => {
  meshClient = new MeshClient(opts.connect);
  await meshClient.login(opts.user);
  controller = await genClientController(meshClient, opts);
});

startle.on('increment-activity', callsPerSecond => {
  controller.incrementActivity();
});
