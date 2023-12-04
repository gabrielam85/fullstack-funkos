const path = require('path');
const model = require('../models/Product');

const shop = async (req, res) => {
    try{
        const products = await model.findAll({ 
            attributes: ["id", "nombre", "categoria", "precio", "urlFront", "urlBack", "altFront", "altBack"],
            order: [['categoria', 'ASC'], ['nombre', 'ASC']] 
        });
        res.render(path.resolve(__dirname, '../views/shop/shop'), { products });
    } catch(error){
        console.log(error);
    }
};

const item = async (req, res) => {
    const itemId = req.params.id;

    try{
        const item = await model.findByPk(itemId, {
            attributes: ["id", "nombre", "categoria", "precio", "metodo_pago", "urlFront", "urlBack", "altFront", "altBack"]
        });
        if(!item){
            res.status(404).send('Producto no encontrado');
            return;
        }

        const products = await model.findAll({ 
            attributes: ["id", "nombre", "precio", "urlFront", "urlBack", "altFront", "altBack"],
            order: [['nombre', 'ASC']]
        });

        res.render(path.resolve(__dirname, '../views/shop/item'), { products, item });
    } catch(error){
        console.log(error);
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