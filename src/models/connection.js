const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
    'gabrielamoreno_funkoshop',
    '330590_admin',
    '!c8rXCm2sFfNdeJ',
    {
        host: 'mysql-gabrielamoreno.alwaysdata.net',
        dialect: 'mysql',
    }
);

module.exports = sequelize;