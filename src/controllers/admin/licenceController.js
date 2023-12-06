const { Op } = require('sequelize');

const { validationResult } = require('express-validator');

const model = require('../../models/Licence');

const index = async (req, res) => {
    try{
        const licences = await model.findAll();
        
        res.render("admin/licence/index", { licences });
    } catch(error){
        console.log(error);
        res.status(500).send(error);
    }
};

const create = async (req, res) => {
    res.render("admin/licence/create");
};

const store = async (req, res) => {
	const errors = validationResult(req);
  
	if (!errors.isEmpty()) {
	  return res.render("/admin/licence/create", {
		values: req.body,
		errors: errors.array(),
	  });
	}
  
	try {
	  const licence = await model.create(req.body);
	  
	  res.redirect("/licence");
	} catch (error) {
	  res.status(500).send("Error al crear la licencia");
	}
  };

  const edit = async (req, res) => {
	try {
	  const licence = await model.findByPk(req.params.id);
  
	  if (licence) {
		res.render("admin/licence/edit", { values: licence });
	  } else {
		res.status(404).send("No existe la licencia");
	  }
	} catch (error) {
	  res.send(error);
	}
  };

  const update = async (req, res) => {
	const errors = validationResult(req);
  
	if (!errors.isEmpty()) {
	  return res.render("admin/licence/edit", {
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
  
	  res.redirect("/licence");
	} catch (error) {
	  console.log(error);
	  res.send(error);
	}
  };

  const destroy = async (req, res) => {
	try {
	  const destroyed = await model.destroy({
		where: {
		  id: req.params.id,
		},
	  });
  
	  res.redirect("/licence");
	} catch (error) {
	  console.log(error);
	  res.send(error);
	}
  };

  const search = async (req, res) => {
	try {
	  const searchTerm = req.query.search;

	  if (!searchTerm) {
		return res.redirect("/licence");
	  }

	  const licences = await model.findAll({
		where: {
		  nombre: {
			[Op.like]: `%${searchTerm}%`,
		  },
		},
	  });
  
	  res.render("admin/licence/index", { licences });
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