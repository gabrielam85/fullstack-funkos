const sharp = require('sharp');
const path = require('path');
const { validationResult } = require('express-validator');
const model = require('../models/Producto');

const admin = async (req, res) => {
    try{
        const productos = await model.findAll();
        console.log(productos);
        res.render(path.resolve(__dirname, '../views/admin/admin'), { productos });
    } catch(error){
        console.log(error);
        res.status(500).send(error);
    }
};

const create = (req, res) => {
    res.render(path.resolve(__dirname, '../views/admin/create'));
};

const edit = (req, res) => {
    res.render(path.resolve(__dirname, '../views/admin/edit'));
};

const destroy = (req, res) => {
    res.render(path.resolve(__dirname, '../views/admin/delete'));
};

module.exports = {
    admin,
    create,
    edit,
    destroy
};