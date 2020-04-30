import { getIndex, getProducts, getProduct, getCart, postCart, getOrders, getCheckout } from '../controllers/shop';
const express = require('express');
// const = require('../controllers/shop');
const router = express.Router();

router.get('/', getIndex);
router.get('/products', getProducts);
router.get('/products/:productId', getProduct);
router.get('/cart', getCart);// GEt Cart 
router.post('/cart', postCart);// Post Card 
router.get('/orders', getOrders);
router.get('/checkout', getCheckout);

module.exports = router;
