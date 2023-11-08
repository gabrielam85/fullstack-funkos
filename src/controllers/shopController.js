const shopControllers = {
    shop: (req, res) => res.send('Route for Shop View'),
    item: (req, res) => res.send(`Route for find and retrieve a product from id: ${req.params.id}`),
    cart: (req, res) => res.send('Route for Cart View'),
};

module.exports = shopControllers;