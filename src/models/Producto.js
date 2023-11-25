const { DataTypes } = require('sequelize');
const sequelize = require('./connection');

const Producto = sequelize.define('Producto',{
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
    categoria: {
        type: DataTypes.STRING,
        allowNull: false
    },
    metodo_pago: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    precio: {
        type: DataTypes.FLOAT,
        allowNull: true,
    },
    urlFront: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    urlBack: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    altFront: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    altBack: {
        type: DataTypes.STRING,
        allowNull: true,
    },
});

//Para dev, en produccion se comenta
(async () => {
    await sequelize.sync();
})();

module.exports = Producto;