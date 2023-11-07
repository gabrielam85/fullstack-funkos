const express = require('express');
const router = express.Router();

router.get('/admin/login', (req, res) => { res.send('Route for Login View')});
router.post('/admin/login', (req, res) => { res.send('Route for login an user')});
router.get('/admin/register', (req, res) => { res.send('Route for Register View')});
router.post('/admin/register', (req, res) => { res.send('Route for Register an user')});

module.exports = router;