const express = require('express');
const router = express.Router();
const multer = require("multer");
const upload = multer({storage: multer.memoryStorage()});

const { body } = require("express-validator");

const isNumericOrEmpty = (value) => {
    if (value === undefined || value === null || value === '') {
      return true;
    }
  
    const numericValue = parseFloat(value);

    if (isNaN(numericValue)) {
        return false;
      }
  
      return true;
  };

  
const validations = [
    body("CategoryId")
    .not()
    .isEmpty()
    .withMessage("La categoría es requerida"),
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
    .withMessage("El código es requerido")
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
    .custom(isNumericOrEmpty)
    .withMessage("El descuento debe ser numérico")
    .isFloat({ min: 0, max: 100 })
    .withMessage("El descuento debe estar en el rango de 0 a 100"),
];

const controller = require('../../controllers/admin/productController');

router.get('/', controller.index);

router.get('/create', controller.create);
//router.post('/create', upload.single("imagen"), validations, controller.store);
router.post('/create', upload.fields([{ name: 'imagenFront', maxCount: 1 }, { name: 'imagenBack', maxCount: 1 }]), validations, controller.store);

router.get('/edit/:id', controller.edit);
//router.put('/edit/:id', upload.single("imagen"), validations, controller.update);
router.put('/edit/:id', upload.fields([{ name: 'imagenFront', maxCount: 1 }, { name: 'imagenBack', maxCount: 1 }]), validations, controller.update);

router.delete('/:id', controller.destroy);

router.get('/search', controller.search);

module.exports = router;