const mongodb = require('mongodb');
const getDb = require('../util/db').getDb;

class Product {
  constructor(title, price, description, imageUrl, id) {
    this.title = title;
    this.price = price;
    this.description = description;
    this.imageUrl = imageUrl;
    this.id = id;
  }

  save() {
    const db = getDb();
    let dbOp;
    if(this.id){
      dbOp = db.collection('products').updateOne({ _id: new mongodb.ObjectId(prodId)}, {$set : this});
    }else {
      dbOp.insertOne(this);
    }
    return dbOp
      .insertOne(this)
      .then(result => {
        console.log(result);
      })
      .catch(err => {
        console.log(err);
      });
  }

  static fetchAll() {
    const db = getDb();
    return db
      .collection('products')
      .find()
      .toArray()
      .then(products => {
        return products;
      })
      .catch(err => {
        console.log(err);
      });
  }

  static findById(prodId) {
    const db = getDb();
    return db
      .collection('products')
      .find({ _id: new mongodb.ObjectId(prodId) })
      .next()
      .then(product => {
        return product;
      })
      .catch(err => {
        console.log(err);
      });
  }
}

module.exports = Product;
