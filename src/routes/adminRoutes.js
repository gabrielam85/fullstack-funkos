const express = require('express');
const router = express.Router();
const multer = require("multer");
const upload = multer({storage: multer.memoryStorage()});

const { body } = require("express-validator");

const validations = [
    body("nombre")
    .not()
    .isEmpty()
    .withMessage("El nombre es obligatorio")
    .bail()
    .isLength({min: 3})
    .withMessage("El nombre debe tener como mínimo 3 caracteres"),
    body("precio")
    .not()
    .isEmpty()
    .withMessage("El precio es requerido")
    .isLength({min:1})
    .withMessage("El precio debe tener por lo menos 1 dígito"),
];

const adminControllers = require('../controllers/adminController');

router.get('/', adminControllers.admin);
router.get('/create', adminControllers.create);
router.post('/create', adminControllers.create);
router.get('/edit/:id', adminControllers.edit);
router.put('/edit/:id', adminControllers.edit);
router.delete('/delete/:id', adminControllers.destroy);

module.exports = router;