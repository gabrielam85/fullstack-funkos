const express = require('express');
const router = express.Router();

router.get('/admin', (req, res) => { res.send('Route for Admin View')});
router.get('/admin/create', (req, res) => { res.send('Route for create a product view')});
router.post('/admin/create', (req, res) => { res.send('Route for create a product')});
router.get('/admin/edit/:id', (req, res) => { res.send('Route for edit a product View')});
router.post('/admin/edit/:id', (req, res) => { res.send('Route for edit a product')});
router.delete('/admin/delete/:id', (req, res) => { res.send('Route for delete a product')});

module.exports = router;