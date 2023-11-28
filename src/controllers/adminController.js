const sharp = require('sharp');
const path = require('path');
const { validationResult } = require('express-validator');
const model = require('../models/Producto');
const fs = require('fs');

const admin = async (req, res) => {
    try{
        const productos = await model.findAll();
        
        res.render(path.resolve(__dirname, '../views/admin/admin'), { productos });
    } catch(error){
        res.status(500).render('error', { mensaje_error: error.message });
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

        if(req.file){
            sharp(req.file.buffer)
            .resize(300)
            .toFile(path.resolve(__dirname, "../../../public/uploads/producto_" + producto.id + ".webp"))
        }

        res.redirect("/admin");
    } catch (error) {
        res.status(500).render('error', { mensaje_error: error.message });
    }
};

const edit = (req, res) => {
    res.render(path.resolve(__dirname, '../views/admin/edit'));
};

const destroy = async(req, res) => {
	try{
		const destroyed = await model.destroy({
			where: {
				id: req.params.id,
			},
		});
		if(destroyed == 1){
			fs.unlink(
				path.resolve(
					__dirname,
					`../../../public/uploads/producto_${req.params.id}.jpg`
			),
			(error) => {
				if(error){
					res.status(500).render('error', { mensaje_error: error.message });
				}
			});
		}
		
		res.redirect('/admin');
	}
	catch(error){
        res.status(500).render('error', { mensaje_error: error.message });
	}
}

module.exports = {
    admin,
    create,
    edit,
    destroy
};