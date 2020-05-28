const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

let _db;
const url = 'mongodb://localhost:27017/test';
const mongoConnect = callback => {
  MongoClient.connect(url, { useUnifiedTopology: true })
    .then(client => {
      console.log('Connected!');
      _db = client.db();
      callback();
    })
    .catch(err => {
      console.log(err);
      throw err;
    });
};

const getDb = () => {
  if (_db) {
    return _db;
  }
  throw 'No database found!';
};

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;
