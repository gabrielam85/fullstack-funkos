const path = require('path');

let items = [
    {
        id: 1,
        nombre: 'STORMTROOPER LIGHTSABER',
        categoria: 'Stars Wars',
        precio: '1.799,99',
        promo: '3 CUOTAS SIN INTERÉS',
        urlFront: '/img/star-wars/trooper-1.webp',
        urlBack: '/img/star-wars/trooper-box.webp',
        altFront: 'Figura coleccionable Funko de un Stormtrooper',
        altBack: 'Figura coleccionable Funko de un Stormtrooper en caja',
    },
    {
        id: 2,
        nombre: 'PIDGEOTTO',
        categoria: 'POKEMON',
        precio: '1.799,99',
        promo: '3 CUOTAS SIN INTERÉS',
        urlFront: '/img/pokemon/pidgeotto-1.webp',
        urlBack: '/img/pokemon/pidgeotto-box.webp',
        altFront: 'Figura coleccionable Funko de un Pidgeotto',
        altBack: 'Figura coleccionable Funko de un Pidgeotto en caja',
    },
    {
        id: 3,
        nombre: 'LUNA LOVEGOOD LION MASK',
        categoria: 'HARRY POTTER',
        precio: '1.799,99',
        promo: '3 CUOTAS SIN INTERÉS',
        urlFront: '/img/harry-potter/luna-1.webp',
        urlBack: '/img/harry-potter/luna-box.webp',
        altFront: 'Figura coleccionable Funko de Luna Lovegood',
        altBack: 'Figura coleccionable Funko de un Luna Lovegood en caja',
    },
    {
        id: 1,
        nombre: 'STORMTROOPER LIGHTSABER',
        categoria: 'Stars Wars',
        precio: '1.799,99',
        promo: '3 CUOTAS SIN INTERÉS',
        urlFront: '/img/star-wars/trooper-1.webp',
        urlBack: '/img/star-wars/trooper-box.webp',
        altFront: 'Figura coleccionable Funko de un Stormtrooper',
        altBack: 'Figura coleccionable Funko de un Stormtrooper en caja',
    },
    {
        id: 2,
        nombre: 'PIDGEOTTO',
        categoria: 'POKEMON',
        precio: '1.799,99',
        promo: '3 CUOTAS SIN INTERÉS',
        urlFront: '/img/pokemon/pidgeotto-1.webp',
        urlBack: '/img/pokemon/pidgeotto-box.webp',
        altFront: 'Figura coleccionable Funko de un Pidgeotto',
        altBack: 'Figura coleccionable Funko de un Pidgeotto en caja',
    },
    {
        id: 3,
        nombre: 'LUNA LOVEGOOD LION MASK',
        categoria: 'HARRY POTTER',
        precio: '1.799,99',
        promo: '3 CUOTAS SIN INTERÉS',
        urlFront: '/img/harry-potter/luna-1.webp',
        urlBack: '/img/harry-potter/luna-box.webp',
        altFront: 'Figura coleccionable Funko de Luna Lovegood',
        altBack: 'Figura coleccionable Funko de un Luna Lovegood en caja',
    },
    {
        id: 1,
        nombre: 'STORMTROOPER LIGHTSABER',
        categoria: 'Stars Wars',
        precio: '1.799,99',
        promo: '3 CUOTAS SIN INTERÉS',
        urlFront: '/img/star-wars/trooper-1.webp',
        urlBack: '/img/star-wars/trooper-box.webp',
        altFront: 'Figura coleccionable Funko de un Stormtrooper',
        altBack: 'Figura coleccionable Funko de un Stormtrooper en caja',
    },
    {
        id: 2,
        nombre: 'PIDGEOTTO',
        categoria: 'POKEMON',
        precio: '1.799,99',
        promo: '3 CUOTAS SIN INTERÉS',
        urlFront: '/img/pokemon/pidgeotto-1.webp',
        urlBack: '/img/pokemon/pidgeotto-box.webp',
        altFront: 'Figura coleccionable Funko de un Pidgeotto',
        altBack: 'Figura coleccionable Funko de un Pidgeotto en caja',
    },
    {
        id: 3,
        nombre: 'LUNA LOVEGOOD LION MASK',
        categoria: 'HARRY POTTER',
        precio: '1.799,99',
        promo: '3 CUOTAS SIN INTERÉS',
        urlFront: '/img/harry-potter/luna-1.webp',
        urlBack: '/img/harry-potter/luna-box.webp',
        altFront: 'Figura coleccionable Funko de Luna Lovegood',
        altBack: 'Figura coleccionable Funko de un Luna Lovegood en caja',
    },
];

const shop = (req, res) => {
    res.render(path.resolve(__dirname, '../views/shop/shop'), { items });
};

const item = (req, res) => {
    res.render(path.resolve(__dirname, '../views/shop/item'));
};

const cart = (req, res) => {
    res.render(path.resolve(__dirname, '../views/shop/cart'));
};

module.exports = {
    shop,
    item,
    cart
};