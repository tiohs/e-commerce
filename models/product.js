const mongodb = require('mongodb');
const getDb = require('../util/db').getDb;

class Product {
  constructor(title, price, description, imageUrl, id) {
    this.title = title;
    this.price = price;
    this.description = description;
    this.imageUrl = imageUrl;
    this.id = new mongodb.ObjectId(id);
  }

  save() {
    const db = getDb();
    let dbOp;
    if(this.id){
      dbOp = db.collection('products').updateOne({ _id: this.id}, {$set : this});
    }else {
      dbOp.insertOne(this);
    }
    return dbOp
      .then(result => {
        return result;
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
  static deleteById(prodId){
    let db = getDb();
    return db.collection('products').deleteOne({ _id: new mongodb.ObjectId(prodId) })
      .then((r)=>{ }).catch((e) => {})
  }
}

module.exports = Product;
