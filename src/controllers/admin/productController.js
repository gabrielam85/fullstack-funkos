const fs = require('fs');
const path = require('path');
const sharp = require('sharp');
const { Op } = require('sequelize');

const { validationResult } = require('express-validator');

const model = require('../../models/Product');
const modelCategory = require("../../models/Category");

const index = async (req, res) => {

	if (req.query.search) {
		return res.redirect(`/product/search?search=${req.query.search}`);
	}

    try{
		const products = await model.findAll({
			include: "Category",
		  });
        
        res.render("admin/product/index", { products });
    } catch(error){
        console.log(error);
        res.status(500).send(error);
    }
};

const create = async (req, res) => {
	try {
		const categories = await modelCategory.findAll({
		  order: [["nombre", "ASC"]],
		});
		res.render("admin/product/create", { categories });
	  } catch (error) {
		console.log(error);
		res.status(500).send(error);
	  }
};

const store = async (req, res) => {
	const errors = validationResult(req);
  
	if (!errors.isEmpty()) {
		try {
		  const categories = await modelCategory.findAll({
			order: ["nombre"],
		  });
		  return res.render("admin/product/create", {
			categories,
			values: req.body,
			errors: errors.array(),
		  });
		} catch (error) {
		  console.log(error);
		  res.status(500).send(error);
		}
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
		const categories = await modelCategory.findAll();

		res.render("admin/product/edit", { values: product, categories });
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
		try {
		  const categories = await modelCategory.findAll({
			order: [["nombre", "ASC"]],
		  });
		  return res.render("/product/edit", {
			categories,
			values: { ...req.params, ...req.body },
			errors: errors.array(),
		  });
		} catch (error) {
		  console.log(error);
		  res.status(500).send(error);
		}
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

const search = async (req, res) => {
	try {
	  const searchTerm = req.query.search;

	  if (!searchTerm) {
		return res.redirect("/product");
	  }

	  const products = await model.findAll({
		include: "Category",
		where: {
		  [Op.or]: {
			codigo: { [Op.like]: `%${searchTerm}%` },
			nombre: { [Op.like]: `%${searchTerm}%` },
			'$Category.nombre$': { [Op.like]: `%${searchTerm}%` },
		  }
		},
	  });
  
	  res.render("admin/product/index", { products });
	} catch (error) {
	  console.log(error);
	  res.status(500).send(error);
	}
  };

module.exports = {
    index,
    create,
	store,
    edit,
    update,
    destroy,
	search,
};