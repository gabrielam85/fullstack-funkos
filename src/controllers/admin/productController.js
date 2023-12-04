const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const { validationResult } = require('express-validator');

const model = require('../../models/Product');

const index = async (req, res) => {
    try{
        const products = await model.findAll();
        
        res.render("admin/product/index", { products });
    } catch(error){
        console.log(error);
        res.status(500).send(error);
    }
};

const create = async (req, res) => {
    res.redirect("admin/product/create");
};

const edit = (req, res) => {
    res.render("admin/product/edit");
};

const update = (req, res) => {
    res.render("admin/product/edit");
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
					console.log(error);
				}
			});
		}
		
		res.redirect('/admin');
	}
	catch(error){
        console.log(error);
        res.send(error);
	}
}

module.exports = {
    index,
    create,
    edit,
    update,
    destroy
};