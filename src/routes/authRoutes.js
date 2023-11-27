const express = require('express');
const { Model } = require('sequelize');
const router = express.Router();

const model = require('../models/Usuario');

const { body, withMessage } = require('express-validator');
const registerValidations = [
	body("email")
		.isEmail()
		.withMessage("El email es incorrecto")
		.bail()
		.custom((value,{req}) => {
			return new Promise(async(resolve, reject) => {
				try{
					const user = await model.findOne({
						where:{
						email: value,
						},
					});
					
					if(user){
						return reject();
					}
					else {
						return resolve();
					}
				}
				catch(error){
					console.log(error);
				}
			})
		})
		.withMessage("Email duplicado"),
	body("password")
		.isStrongPassword({
			minLength: 6,
			minLowercase: 1,
			minUppercase: 1,
			minNumbers:1,
			minSymbols: 1,
		})
		.withMessage("la contraseña debe tener...")
		.bail()
		.custom((value, {req}) => value === req.body.password_confirmation)
		.withMessage("Las contraseñas no coinciden"),
];

const authControllers = require('../controllers/authController');

router.get('/register', authControllers.register);
router.post('/register', registerValidations, authControllers.postRegister);

router.get('/login', authControllers.login);
router.post('/login', authControllers.postLogin);

router.get('/logout', authControllers.logout);

module.exports = router;