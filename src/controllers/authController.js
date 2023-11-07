const authControllers = {
    login: (req, res) => res.send('Route for Login View'),
    //login: (req, res) => res.send('Route for Login an user'),
    register: (req, res) => res.send('Route for Register View'),
    //register: (req, res) => res.send('Route for Register an user'),
}

module.exports = authControllers;