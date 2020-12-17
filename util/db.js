const mongodb = require('mongodb')
const MongoClient = mongodb.MongoClient

let _db
// Connection URL
const url = 'mongodb://localhost:27017'

// Database Name
const dbName = 'E-commerce'
const mongoConnect = callback => {
  MongoClient.connect(url, { useUnifiedTopology: true })
    .then(client => {
      console.log('Connected!')
      _db = client.db(dbName)
      callback()
    })
    .catch(err => {
      console.log(err)
      throw err
    })
}

const getDb = () => {
  if (_db) {
    return _db
  }
  throw new Error('No database found!')
}

exports.mongoConnect = mongoConnect
exports.getDb = getDb
