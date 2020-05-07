const express = require('express');
const shopControllers = require('../controllers/shop');
const router = express.Router();

router.get('/', shopControllers.getIndex);
router.get('/products', shopControllers.getProducts);
router.get('/products/:productId', shopControllers.getProduct);
router.get('/cart', shopControllers.getCart); // GEt Cart 
router.post('/cart', shopControllers.postCart); // Post Card 
router.post('/cart-delete-item', shopControllers.postCardDeleteProduct);
router.get('/orders', shopControllers.getOrders);
router.get('/checkout', shopControllers.getCheckout);

module.exports = router;
