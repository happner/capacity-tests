module.exports = async (meshClient, opts) => {
  const modulePath = './clients/' + opts.test.testId + '-client.js';
  const {createController} = require(modulePath);
  return await createController(meshClient, opts);
}
