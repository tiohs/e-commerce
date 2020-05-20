const Cart = require('../models/cart');
const db = require('../util/db');
module.exports = class Product {
  constructor(id = null,title, imageUrl, description, price) {
    this.id = id;
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }

  save() {
    return db.execute('INSERT INTO products (title, price, description, imageUrl) VALUE (?, ?, ?, ?)', [this.title, this.price, this.description, this.imageUrl]);
  }

  static fetchAll() {
    return db.execute('SELECT * FROM products')
  }
  static findById(id){
    return db.execute('SELECT * FROM products WHERE products.id = ? ', [id]);
  }
  static Delete(id) {
   
  }
};
