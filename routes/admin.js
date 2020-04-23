// const  path = require('path');
const express = require('express');
const productsController = require('../controllers/admin');
// const rootDir = require('../util/path');

const routes = express.Router();

// /add-product get 
routes.get('/add-product', productsController.getaddProduct);

routes.get('/products');
// /add-product post
routes.post('/add-product', productsController.postAddProduct);

exports.router = routes;
