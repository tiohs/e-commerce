const  path = require('path');
const express = require('express');
// const rootDir = require('../util/path');

const routes = express.Router();

// Data product 
const product = [];

// /add-product get 
routes.get('/add-product', (req, res)=>{
    res.render('add-product', {
        pageTitle: 'Add Product',
        path: '/admin/add-product',
        formsCSS: true,
        productCSS: true,
        activeAddProduct: true
      });
});

// /add-product post
routes.post('/add-product',(req, res, next)=>{
    product.push({ title : req.body.title});
    res.redirect('/');
});

exports.router = routes;
exports.products = product;