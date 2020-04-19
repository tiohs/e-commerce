const path = require('path')
const express = require('express');
// const rootDir = require('../util/path');
const dataProduct = require('./admin').products;

const routes = express.Router();

routes.get('/', (req, res, next)=> {
    const products = dataProduct;
    console.log(products)
    res.render('shop',{
        prods: products,
        pageTitle: 'Shop',
        path: '/',
        hasProducts: products.length > 0,
        activeShop: true,
        productCSS: true

    });
});

module.exports = routes;