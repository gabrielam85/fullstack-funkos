const { DataTypes } = require('sequelize');
const sequelize = require('./connection');

const bcryptjs = require('bcryptjs');

const Usuario = sequelize.define('Usuario',{
    email:{
        type:DataTypes.STRING,
		allowNull: false,
		unique: true,
    },
    password: {
        type: DataTypes.STRING,
		allowNull: false,
    },
});

Usuario.beforeSave(async (user, options) => {
	const { password } = user;
	
	const hash = await bcryptjs.hash(password, 12);
	
	user.password = hash;
})

module.exports = Usuario;