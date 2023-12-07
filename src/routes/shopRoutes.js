const express = require('express');
const router = express.Router();
const modelUser = require('../models/User');

const controller = require('../controllers/shopController');

const loadUser = async (req, res, next) => {
    if (req.session.userId) {
      try {
        const user = await modelUser.findByPk(req.session.userId);
        if (user) {
          req.user = user;
        }
      } catch (error) {
        console.error(error);
      }
    }
    next();
};
  
//Se aplica a todas las rutas de shop
router.use(loadUser);

router.get('/', controller.shop);

router.get('/item/:id', controller.item);
router.post('/item/:id/add', controller.addToCart);

router.get('/cart', controller.cart);

router.post('/cart/delete/:cartItem', controller.deleteCartItem);

router.post('/cart/checkout', controller.checkout);

module.exports = router;