const { DataTypes } = require('sequelize');
const sequelize = require('./connection');

const Licence = sequelize.define('Licence',{
    nombre:{
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
});

module.exports = Licence;