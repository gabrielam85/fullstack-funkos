const express = require('express');
const router = express.Router();
const adminControllers = require('../controllers/adminController');

router.get('/', adminControllers.admin);
router.get('/create', adminControllers.create);
router.post('/create', adminControllers.create);
router.get('/edit/:id', adminControllers.edit);
router.post('/edit/:id', adminControllers.edit);
router.delete('/delete/:id', adminControllers.delete);

module.exports = router;