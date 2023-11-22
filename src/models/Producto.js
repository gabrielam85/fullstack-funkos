const { DataTypes } = require('sequelize');
const sequelize = require('./connection');

const Producto = sequelize.define('Producto',{
    nombre:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    codigo: {
        type: DataTypes.STRING,
        allowNull: false,
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
});

(async () => {
    await sequelize.sync();
})();

module.exports = Producto;