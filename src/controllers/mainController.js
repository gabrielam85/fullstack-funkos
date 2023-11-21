const path = require('path');

const index = (req, res) => {
    const funkos = [
        {id: 1, nombre: "funko 1"},
        {id: 2, nombre: "funko 2"},
        {id: 3, nombre: "funko 3"},
        {id: 4, nombre: "funko 4"},
    ]
    
    res.render(path.resolve(__dirname, '../views/index'), funkos);
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