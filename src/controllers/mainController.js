const path = require('path');
const model_productos = require('../models/Producto');

const index = async (req, res) => {
    try{
        const productos = await model_productos.findAll({ 
            attributes: ["id", "nombre", "precio", "urlFront", "urlBack", "altFront", "altBack"],
            order: [['nombre', 'ASC']]
        });

        res.render(path.resolve(__dirname, '../views/index'), { productos });
    } catch(error){
        res.status(500).render('error', { mensaje_error: error.message });
    }
};

const contact = (req, res) => {
    res.render(path.resolve(__dirname, '../views/contact'));
};

const about = (req, res) => {
    res.render(path.resolve(__dirname, '../views/about'));
};

const faqs = (req, res) => {
    res.render(path.resolve(__dirname, '../views/faqs'));
};

const terminos = (req, res) => {
    res.render(path.resolve(__dirname, '../views/terminos-condiciones'));
};

module.exports = {
    index,
    contact,
    about,
    faqs,
    terminos,
};