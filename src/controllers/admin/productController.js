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

const store = async (req, res) => {
	const errors = validationResult(req);
  
	if (!errors.isEmpty()) {
	  return res.render("/admin/product/create", {
		values: req.body,
		errors: errors.array(),
	  });
	}
  
	try {
	  const product = await model.create(req.body);
	  
	  res.redirect("/product");
	} catch (error) {
	  res.status(500).send("Error al crear el producto");
	}
  };
  
const edit = async (req, res) => {
	try {
	  const product = await model.findByPk(req.params.id);
  
	  if (product) {
		res.render("admin/product/edit", { values: product });
	  } else {
		res.status(404).send("No existe el producto");
	  }
	} catch (error) {
	  res.send(error);
	}
  };

  const update = async (req, res) => {
	const errors = validationResult(req);
  
	if (!errors.isEmpty()) {
	  return res.render("admin/product/edit", {
		values: { ...req.params, ...req.body },
		errors: errors.array(),
	  });
	}
  
	try {
	  const count = await model.update(req.body, {
		where: {
		  id: req.params.id,
		},
	  });
  
	  res.redirect("/product");
	} catch (error) {
	  console.log(error);
	  res.send(error);
	}
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
		
		res.redirect('/product');
	}
	catch(error){
        console.log(error);
        res.send(error);
	}
}

module.exports = {
    index,
    create,
	store,
    edit,
    update,
    destroy
};