const  path = require('path');
const express = require('express');

const routes = express.Router();

// /add-product get 
routes.get('/add-product', (req, res)=>{
    res.sendFile(path.join(__dirname, '../', 'views', 'add-product.html'))
});

// /add-product post
routes.post('/add-product',(req, res, next)=>{
    res.redirect('/');
});

module.exports = routes;