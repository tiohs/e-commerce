const express = require('express');
// const rootDir = require('../util/path');
const shopController = require('../controllers/shop')

const routes = express.Router();

routes.get('/', shopController.getIndex);

routes.get('/products', shopController.getProducts);

routes.get('/cart',shopController.getCart);

routes.get('/checkout',shopController.getCheckout);

module.exports = routes;