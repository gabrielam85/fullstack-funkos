const { validationResult } = require('express-validator');

const model = require('../../models/Category');

const index = async (req, res) => {
    try{
        const categories = await model.findAll();
        
        res.render("admin/category/index", { categories });
    } catch(error){
        console.log(error);
        res.status(500).send(error);
    }
};

const create = async (req, res) => {
    res.render("admin/category/create");
};

const store = async (req, res) => {
	const errors = validationResult(req);
  
	if (!errors.isEmpty()) {
	  return res.render("/admin/category/create", {
		values: req.body,
		errors: errors.array(),
	  });
	}
  
	try {
	  const category = await model.create(req.body);
	  console.log("category created", category);
	  res.redirect("/category");
	} catch (error) {
	  console.log(error);
	  res.status(500).send("Error al crear la categoría");
	}
  };

  const edit = async (req, res) => {
	try {
	  const category = await model.findByPk(req.params.id);
  
	  if (category) {
		res.render("admin/category/edit", { values: category });
	  } else {
		res.status(404).send("No existe la categoria");
	  }
	} catch (error) {
	  res.send(error);
	}
  };

  const update = async (req, res) => {
	console.log(req.params, req.body);
  
	const errors = validationResult(req);
  
	if (!errors.isEmpty()) {
	  return res.render("admin/category/edit", {
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
  
	  res.redirect("admin/category");
	} catch (error) {
	  console.log(error);
	  res.send(error);
	}
  };

  const destroy = async (req, res) => {
	console.log(req.params);
  
	try {
	  const destroyed = await model.destroy({
		where: {
		  id: req.params.id,
		},
	  });
  
	  res.redirect("admin/category");
	} catch (error) {
	  console.log(error);
	  res.send(error);
	}
  };

module.exports = {
    index,
    create,
	store,
    edit,
    update,
    destroy
};