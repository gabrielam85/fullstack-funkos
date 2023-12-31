const express = require('express');
const router = express.Router();

const mainControllers = require('../controllers/mainController');

router.get('/', (req, res) => {
    res.redirect('/home');
});
router.get('/home', mainControllers.index);
router.get('/contact', mainControllers.contact);
router.get('/about', mainControllers.about);
router.get('/faqs', mainControllers.faqs);
router.get('/terminos', mainControllers.terminos);

module.exports = router;