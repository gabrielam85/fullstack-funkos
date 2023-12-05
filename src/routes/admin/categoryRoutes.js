const express = require("express");
const router = express.Router();

const { body } = require("express-validator");

const validations = [
  body("nombre")
    .not()
    .isEmpty()
    .withMessage("El nombre es obligatorio")
    .bail()
    .isLength({ min: 3 })
    .withMessage("Tiene que tener 3 caracteres"),
];

const controller = require("../../controllers/admin/categoryController");

router.get("/", controller.index);

router.get("/create", controller.create);
router.post("/create", validations, controller.store);

router.get("/edit/:id", controller.edit);
router.put("/edit/:id", validations, controller.update);

router.delete("/delete/:id", controller.destroy);

router.get('/search', controller.search);

module.exports = router;