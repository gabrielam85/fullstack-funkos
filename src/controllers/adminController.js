const adminControllers = {
    admin: (req, res) => res.send('Route for Admin View'),
    create: (req, res) => res.send('Route for create a product view'),
    edit: (req, res) => res.send('Route for edit a product View'),
    delete: (req, res) => res.send('Route for delete a product'),
};

module.exports = adminControllers;