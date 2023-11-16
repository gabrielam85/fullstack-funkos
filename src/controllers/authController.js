const path = require('path');

const login = (req, res) => {
    res.render(path.resolve(__dirname, '../views/auth/login'));
};

const register = (req, res) => {
    res.render(path.resolve(__dirname, '../views/auth/register'));
};

module.exports = {
    login,
    register
};