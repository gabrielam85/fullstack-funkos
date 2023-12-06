const { DataTypes } = require('sequelize');
const sequelize = require('./connection');

const CartItem = require('./CartItem');
const User = require("./User");

const Cart = sequelize.define('Cart',{
    UserId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    status: {
        type: DataTypes.STRING,
        allowNull: true
    }
});

Cart.belongsTo(User);
Cart.hasMany(CartItem, { foreignKey: 'CartId' });

module.exports = Cart;