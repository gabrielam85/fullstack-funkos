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

const create = async (req, res) => {
    const errors =  validationResult(req);

    if(!errors.isEmpty()){
        return res.render(path.resolve(__dirname, '../views/admin/create'), {
            values: req.body,
            errors: errors.array(),
        });
    }

    try {
        const producto = await model.create(req.body);
        console.log(producto);

        if(req.file){
            sharp(req.file.buffer)
            .resize(300)
            .toFile(path.resolve(__dirname, "../../../public/uploads/producto_" + producto.id + ".webp"))
        }

        res.redirect("/admin");
    } catch (error) {
        console.log(error);
        res.send(error);
    }
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