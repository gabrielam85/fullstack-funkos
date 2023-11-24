const path = require('path');
const model_productos = require('../models/Producto');

const index = async (req, res) => {
    try{
        const productos = await model_productos.findAll();
        res.render(path.resolve(__dirname, '../views/index'), { productos });
    } catch(error){
        console.log(error);
        res.status(500).send(error);
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

module.exports = {
    index,
    contact,
    about,
    faqs
};