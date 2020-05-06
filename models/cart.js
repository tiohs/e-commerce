const fs = require('fs');
const path = require('path');

const p = path.join(
  path.dirname(process.mainModule.filename),
  'data',
  'products.json'
);

module.exports = class Cart {
    static addProduct(id, productPrice) {
        // Fetch the previous cart 
        fs.readFile(p, (err, fileContent) => {
            let cart = { products: [], totalPrice: 0};
            if(!err) {
                if(fileContent){
                    cart = JSON.parse(fileContent);
                }
            }
            // Analyze the cart => Find existing product 
            const existingProduct = cart.products.find(prod => prod.id === id);
            let updatedProduct;
            if(existingProduct){
                updatedProduct = { ...existingProduct};
                updatedProduct.qty = updatedProduct.qty + 1;
            }else {
                updatedProduct = { id : id, qty: 1 };
            }
            cart.totalPrice = cart.totalPrice + productPrice;
        })
    }
}