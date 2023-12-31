const { DataTypes } = require('sequelize');
const sequelize = require('./connection');

const Category = require("./Category");
const Licence = require("./Licence");

const Product = sequelize.define('Product',{
    nombre:{
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    codigo: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    CategoryId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    LicenceId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    metodo_pago: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    precio: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    descripcion: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    stock: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    descuento: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    //altFront: {
    //    type: DataTypes.STRING,
    //    allowNull: true,
    //},
    //altBack: {
    //    type: DataTypes.STRING,
    //    allowNull: true,
    //},
});

Product.belongsTo(Category);
Product.belongsTo(Licence);

module.exports = Product;