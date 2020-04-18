const  path = require('path');
const express = require('express');
const rootDir = require('../util/path');

const routes = express.Router();

// /add-product get 
routes.get('/add-product', (req, res)=>{
    res.sendFile(path.join(rootDir, 'views', 'add-product.html'))
});

// /add-product post
routes.post('/add-product',(req, res, next)=>{
    res.redirect('/');
});

module.exports = routes;