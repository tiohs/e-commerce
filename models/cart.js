const fs = require('fs');
const path = require('path');

const p = path.join(
  path.dirname(process.mainModule.filename),
  'data',
  'cart.json'
);

module.exports = class Cart {
    static addProduct(id, productPrice) {
        // Fetch the previous cart 
        fs.readFile(p, (err, fileContent) => {
            let cart = { products: [], totalPrice: 0};
            if(!err) {
                if(String(fileContent)){
                    cart = JSON.parse(fileContent);
                }
            }
            // Analyze the cart => Find existing product 
            const existingProductIndex = cart.products.findIndex(prod => prod.id === id);
            const existingProduct = cart.products[existingProductIndex];
            // Add new Product 
            let updatedProduct;
            if(existingProduct){
                updatedProduct = {...existingProduct};
                updatedProduct.qty = updatedProduct.qty + 1;
                cart.products = [...cart.products];
                cart.products[existingProductIndex] = updatedProduct;
            }else {
                updatedProduct = { id : id, qty: 1 };
                cart.products = [...cart.products, updatedProduct];
            }
            cart.totalPrice += parseInt(productPrice);
            fs.writeFile(p, JSON.stringify(cart), (err) => {
                console.log(err)
            })
        })
    }
    static deleteProduct(id, productPrice) {
        fs.readFile(p, (err, fileContent) => {
            if(err && String(productPrice)){
                return;
            }
            const updatedCard = {...JSON.parse(fileContent)};
            const product = updatedCard.products.find(prod => prod.id === id);
            const productQty = product.qty;
            updatedCard.products = updatedCard.products.filter(prod => prod.id !== id);
            updatedCard.totalPrice -= parseInt(productQty) * parseInt(productPrice);
            fs.writeFile(p, JSON.stringify(updatedCard), (err) => {
                console.log(err);
            });
        });
    }
    static getCart(cb){
    fs.readFile(p, (err, fileContent) => {
        const cart = JSON.parse(fileContent);
        if (err){
            cb(null);
        }else {
            cb(cart);
        }
    });
    }
}