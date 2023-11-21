const path = require('path');

const login = (req, res) => {
    res.render(path.resolve(__dirname, '../views/auth/login'));
};

const register = (req, res) => {
    res.render(path.resolve(__dirname, '../views/auth/register'));
};

const logout = (req, res) => {
    res.send('Esta ruta hace el logout del usuario.')
}

module.exports = {
    login,
    register,
    logout
};