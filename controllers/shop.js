const Product = require('../models/products');

// Data product 

exports.getProducts = (req, res, next) => {
    Product.fetchAll(products => {
        res.render('shop/Product-list',{
            prods: products,
            pageTitle: 'All Products',
            path: '/products',
            hasProducts: products.length > 0,
            activeShop: true,
            productCSS: true
        });
    });  
}

exports.getIndex = (req, res, next) => {
    Product.fetchAll(products => {
        res.render('shop/index',{
            prods: products,
            pageTitle: 'Shop',
            path: '/',
        });
    });  
}

exports.getCart = (req, res, next) => {
    res.render('shop/cart', {
        pageTitle: 'Your Cart',
        path: '/cart'
    });
}

exports.getCheckout = (req, res, next) => {
    res.render('shop/checkout', {   
        pageTitle: 'Checkout',
        path: '/checkout'
    });
}




















