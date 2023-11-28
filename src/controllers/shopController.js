const path = require('path');
const model_productos = require('../models/Producto');

const shop = async (req, res) => {
    try{
        const productos = await model_productos.findAll({ 
            attributes: ["id", "nombre", "categoria", "precio", "urlFront", "urlBack", "altFront", "altBack"],
            order: [['categoria', 'ASC'], ['nombre', 'ASC']] 
        });
        res.render(path.resolve(__dirname, '../views/shop/shop'), { productos });
    } catch(error){
        res.status(500).render('error', { mensaje_error: error.message });
    }
};

const item = async (req, res) => {
    const itemId = req.params.id;

    try{
        const item = await model_productos.findByPk(itemId, {
            attributes: ["id", "nombre", "categoria", "precio", "metodo_pago", "urlFront", "urlBack", "altFront", "altBack"]
        });
        if(!item){
            res.status(404).send('Producto no encontrado');
            return;
        }

        const productos = await model_productos.findAll({ 
            attributes: ["id", "nombre", "precio", "urlFront", "urlBack", "altFront", "altBack"],
            order: [['nombre', 'ASC']]
        });

        res.render(path.resolve(__dirname, '../views/shop/item'), { productos, item });
    } catch(error){
        res.status(500).render('error', { mensaje_error: error.message });
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