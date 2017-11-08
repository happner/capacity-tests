const { MongoClient } = require('mongodb');

module.exports.before = (vars, config) => {

  before('clear mongodb', function (done) {

    const {url, collection} = config.mongodb;

    MongoClient.connect(url + '/' + collection, function (err, db) {
      if (err) return callback(err);
      db.collection(collection, function (err, dbCollection) {
        if (err) {
          db.close();
          return done(err);
        }
        dbCollection.drop(function (err) {
          db.close();
          if (err && err.message == 'ns not found') {
            return done(); // no such collection to delete
          }
          done(err);
        });
      });

    });

  });

}
