const path = require('path');
const model_productos = require('../models/Product');

const index = async (req, res) => {
    try{
        const products = await model_productos.findAll({ 
            attributes: ["id", "nombre", "precio", "altFront", "altBack"],
            order: [['nombre', 'ASC']]
        });

        res.render(path.resolve(__dirname, '../views/index'), { products });
    } catch(error){
        console.log(error);
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