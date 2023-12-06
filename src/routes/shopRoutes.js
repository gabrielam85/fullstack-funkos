const express = require('express');
const router = express.Router();
const modelUser = require('../models/User');

const shopControllers = require('../controllers/shopController');

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

router.get('/', shopControllers.shop);
router.get('/item/:id', shopControllers.item);
router.post('/item/:id/add', shopControllers.addToCart);
router.get('/cart', shopControllers.cart);
router.post('/cart', shopControllers.cart);

module.exports = router;