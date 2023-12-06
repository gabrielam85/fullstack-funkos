const bcryptjs = require("bcryptjs");
const path = require('path');
const { validationResult} = require('express-validator');

const model = require('../models/User');

const register = (req, res) => {
    res.render(path.resolve(__dirname, '../views/auth/register'));
};

const postRegister = async (req, res) => {
	const errors = validationResult(req);

	if(!errors.isEmpty() || !req.body.terminos){
		return res.render('auth/register', {
			values: req.body,
			errors: errors.array().concat([{ msg: "Debes aceptar los términos y condiciones." }]),
		});
	}
	
	try{
		const user = await model.create(req.body);
		res.redirect('/auth/login');
	} catch(error){
		console.log(error);
	}
};

const login = (req, res) => {
    res.render(path.resolve(__dirname, '../views/auth/login'));
};

const postLogin = async (req, res) => {

	const errors = validationResult(req);

  	if (!errors.isEmpty()) {
		return res.render("auth/login", {
			values: req.body,
			errors: errors.array(),
    	});
  	}

  	try {
    	const user = await model.findOne({
			where: {
				email: req.body.email,
			},
    	});

		if (!user) {
			res.render("auth/login", {
				values: req.body,
				errors: [{ msg: "El email y/o contraseña son incorrectos (email)" }],
			});
		} else if (!(await bcryptjs.compare(req.body.password, user.password))) {
			res.render("auth/login", {
				values: req.body,
				errors: [
					{ msg: "El email y/o contraseña son incorrectos (password)" },
				],
			});
		} else {
			req.session.userId = user.id;
			req.user = user;

			res.redirect("/product");
		}
	} catch (error) {
		console.log(error);
	}
};

const logout = (req, res) => {
	req.session = null;
	
	res.redirect("/home");
}

module.exports = {
    register,
	postRegister,
	login,
	postLogin,
    logout
};