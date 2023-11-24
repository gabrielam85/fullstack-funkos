const path = require('path');
const model_productos = require('../models/Producto');

const shop = async (req, res) => {
    try{
        const productos = await model_productos.findAll();
        res.render(path.resolve(__dirname, '../views/shop/shop'), { productos });
    } catch(error){
        console.log(error);
        res.status(500).send(error);
    }
};

const item = async (req, res) => {
    const itemId = req.params.id;
    console.log(itemId);

    try{
        const item = await model_productos.findByPk(itemId);
        if(!item){
            res.status(404).send('Producto no encontrado');
            return;
        }

        const productos = await model_productos.findAll();
        res.render(path.resolve(__dirname, '../views/shop/item'), { productos, item });
    } catch(error){
        console.log(error);
        res.status(500).send(error);
    }
};

const cart = (req, res) => {
    res.render(path.resolve(__dirname, '../views/shop/cart'));
};

module.exports = {
    shop,
    item,
    cart
};