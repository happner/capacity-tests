const { MongoClient } = require('mongodb');

module.exports.before = (ctx, config) => {

  before('clear mongodb', function (done) {

    const {url, collection} = config.mongodb;

    MongoClient.connect(url + '/' + collection, (err, db) => {
      if (err) return done(err);
      db.collection(collection, (err, dbCollection) => {
        if (err) {
          db.close();
          return done(err);
        }
        dbCollection.drop(err => {
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
