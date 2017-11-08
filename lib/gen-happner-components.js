module.exports = (config, test, state) => {

  return require('./configs/' + test.testId + '-components')(config, test, state);

}
