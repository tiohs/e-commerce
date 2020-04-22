const express = require('express');
// const rootDir = require('../util/path');
const productsController = require('../controllers/products')

const routes = express.Router();

routes.get('/', productsController.getProducts);

module.exports = routes;