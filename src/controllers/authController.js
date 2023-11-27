const path = require('path');
const { validationResult} = require('express-validator');

const model = require('../models/Usuario');

const register = (req, res) => {
    res.render(path.resolve(__dirname, '../views/auth/register'));
};

const postRegister = async (req, res) => {
	const errors = validationResult(req);
	
	if(!errors.isEmpty()){
		return res.render('auth/register', {
			values: req.body,
			errors: errors.array(),
		});
	}
	
	try{
		const user = await model.create(req.body);
		res.redirect('/');
	} catch(error){
		console.log(error);
		res.send(error);
	}

    res.render(path.resolve(__dirname, '../views/auth/register'));
};

const login = (req, res) => {
    res.render(path.resolve(__dirname, '../views/auth/login'));
};

const postLogin = (req, res) => {
    res.render(path.resolve(__dirname, '../views/auth/login'));
};

const logout = (req, res) => {
    res.send('Esta ruta hace el logout del usuario.')
}

module.exports = {
    register,
	postRegister,
	login,
	postLogin,
    logout
};