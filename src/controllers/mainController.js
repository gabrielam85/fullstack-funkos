const path = require('path');

const index = (req, res) => {
    res.render(path.resolve(__dirname, '../views/index'));
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