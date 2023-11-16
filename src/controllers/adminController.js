const sharp = require('sharp');
const path = require('path');
const { validationResult } = require('express-validator');

let productos = [
    { id: 1, codigo: 'STW001001', nombre: 'Baby Yoda Blueball', categoria: 'STAR WARS'},
    { id: 2, codigo: 'STW001002', nombre: 'Boba Fett Fighter', categoria: 'STAR WARS'},
    { id: 3, codigo: 'STW001003', nombre: 'Luke Skylwalker & Grogu', categoria: 'STAR WARS'},
    { id: 4, codigo: 'STW001004', nombre: 'Stormtrooper Lightsaber', categoria: 'STAR WARS'},
    { id: 5, codigo: 'PKM001001', nombre: 'Charmander Smiley', categoria: 'POKEMON'},
    { id: 6, codigo: 'PKM001002', nombre: 'Dragonite Hi!', categoria: 'POKEMON'},
    { id: 7, codigo: 'PKM001003', nombre: 'Pidgeotto Flying', categoria: 'POKEMON'},
    { id: 8, codigo: 'PKM001004', nombre: 'Pikachu Smiley', categoria: 'POKEMON'},
    { id: 9, codigo: 'PKM001005', nombre: 'Vulpix Fancy', categoria: 'POKEMON'},
    { id: 10, codigo: 'HPT001001', nombre: 'Harry Potter & Hegwid', categoria: 'HARRY POTTER'},
    { id: 11, codigo: 'HPT001002', nombre: 'Herminione Ball Dress', categoria: 'HARRY POTTER'},
    { id: 12, codigo: 'HPT001003', nombre: 'Luna Lovegood Lion Mask', categoria: 'HARRY POTTER'},
    { id: 13, codigo: 'HPT001004', nombre: 'Snape Patronus', categoria: 'HARRY POTTER'},
];

const admin = (req, res) => {
    res.render(path.resolve(__dirname, '../views/admin/admin'), { productos });
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