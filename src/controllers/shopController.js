const shopControllers = {
    shop: (req, res) => res.send('Route for Shop View'),
    item: (req, res) => res.send(`Route for find and retrieve a product from id: ${req.params.id}`),
    //router.post('/item/:id/add', (req, res) => { res.send('Route for add Item to cart View')});
    cart: (req, res) => res.send('Route for Cart View'),
    //router.post('/cart', (req, res) => { res.send('Route for got to checkout page')});
};

module.exports = shopControllers;