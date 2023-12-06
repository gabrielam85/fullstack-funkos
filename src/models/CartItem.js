const { DataTypes } = require('sequelize');
const sequelize = require('./connection');

const Product = require("./Product");

const CartItem = sequelize.define('CartItem',{
    CartId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    ProductId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    Quantity: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
});

CartItem.belongsTo(Product, { foreignKey: 'ProductId' });

module.exports = CartItem;