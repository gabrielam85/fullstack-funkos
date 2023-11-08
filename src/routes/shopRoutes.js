const express = require('express');
const router = express.Router();
const shopControllers = require('../controllers/shopController');

router.get('/', shopControllers.shop);
router.get('/item/:id', shopControllers.item);
router.post('/item/:id/add', shopControllers.item);
router.get('/cart', shopControllers.cart);
router.post('/cart', shopControllers.cart);

module.exports = router;