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
    body("codigo")
    .not()
    .isEmpty()
    .withMessage("El SKU es requerido")
    .isLength({min:3})
    .withMessage("El código debe tener por lo menos 3 caracteres"),
    body("precio")
    .not()
    .isEmpty()
    .withMessage("El precio es requerido")
    .isNumeric()
    .withMessage("El precio debe ser numérico")
    .isLength({min:1})
    .withMessage("El precio debe tener por lo menos 1 dígito"),
    body("descuento")
    .isNumeric()
    .withMessage("El descuento debe ser numérico")
    .isFloat({ min: 0, max: 100 })
    .withMessage("El descuento debe estar en el rango de 0 a 100"),
    body("CategoryId")
    .not()
    .isEmpty()
    .withMessage("La categoría es requerida")
    .isLength({min:3})
    .withMessage("La categoría debe tener por lo menos 3 caracteres"),
];

const controller = require('../../controllers/admin/productController');

router.get('/', controller.index);

router.get('/create', controller.create);
router.post('/create', controller.create);

router.get('/edit/:id', controller.edit);
router.put('/edit/:id', controller.update);

router.delete('/delete/:id', controller.destroy);

module.exports = router;