const adminControllers = {
    admin: (req, res) => res.send('Route for Admin View'),
    create: (req, res) => res.send('Route for create a product view'),
  //  create: (req, res) => res.send('Route for create a produc'),
    edit: (req, res) => res.send('Route for edit a product View'),
  //  edit: (req, res) => res.send('Route for edit a product'),
    delete: (req, res) => res.send('Route for delete a product'),
};

module.exports = adminControllers;