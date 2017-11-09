module.exports = (config, test, state) => {
  const modulePath = './configs/' + test.testId + '-components';
  return require(modulePath)(config, test, state);
}
