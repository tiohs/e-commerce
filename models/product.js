const fs = require('fs');
const path = require('path');

const p = path.join(
  path.dirname(process.mainModule.filename),
  'data',
  'products.json'
);

const getProductsFromFile = cb => {
  fs.readFile(p, (err, fileContent) => {
    if (err) {
      cb([]);
    } else {
      if(String(fileContent)) {
        
        return cb(JSON.parse(fileContent)); 
      }
      return cb([]);
    }
  });
};

module.exports = class Product {
  constructor(id = null,title, imageUrl, description, price) {
    this.id = id;
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }

  save() {
    getProductsFromFile(products => {
      if(this.id){
        const existingProductIndex = products.findIndex(prod => prod.id === this.id);
        const updatedProdcuts = [...products];
        updatedProdcuts[existingProductIndex] = this;
        fs.writeFile(p, JSON.stringify(updatedProdcuts), err => {
          console.log(err);
        });
      }else {
        this.id = Math.random().toString();
        products.push(this);
        fs.writeFile(p, JSON.stringify(products), err => {
          console.log(err);
        });
      }
     
    });
  }

  static fetchAll(cb) {
    getProductsFromFile(cb);
  }
  static findById(p, cb){
    getProductsFromFile(product => {
      const result = product.find(prod => prod.id === p);
      cb(result);
    });
  }
};
