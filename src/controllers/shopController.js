const path = require('path');
const model = require('../models/Product');
const Cart = require('../models/Cart');
const CartItem = require('../models/CartItem');

const shop = async (req, res) => {
    try{
        const products = await model.findAll({ 
            order: [['nombre', 'ASC']] 
        });
        res.render(path.resolve(__dirname, '../views/shop/shop'), { products });
    } catch(error){
        console.log(error);
    }
};

const item = async (req, res) => {
    const itemId = req.params.id;

    try{
        const item = await model.findByPk(itemId);
        if(!item){
            res.status(404).send('Producto no encontrado');
            return;
        }

        const products = await model.findAll({ 
            attributes: ["id", "nombre", "precio", "altFront", "altBack"],
            order: [['nombre', 'ASC']]
        });

        res.render(path.resolve(__dirname, '../views/shop/item'), { products, item });
    } catch(error){
        console.log(error);
    }
};

//const cart = (req, res) => {
//    res.render(path.resolve(__dirname, '../views/shop/cart'));
//};

const cart = async (req, res) => {
    try {
        const userId = req.user.id;

        if (!userId) {
            return res.redirect("/auth/login");
        }

        const cart = await Cart.findOne({
            where: { UserId: userId, status: 'active' },
            include: {
                model: CartItem,
                include: model,
                attributes: ['Quantity', 'ProductId', 'CartId'],
            },
        });


        res.render(path.resolve(__dirname, '../views/shop/cart'), { cart });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al obtener el carrito');
    }
};

const addToCart = async (req, res) => {
    try {
        const userId = req.user.id; // Supongamos que el ID del usuario está disponible en req.user después de la autenticación.
        const productId = req.params.productId; // ID del producto que el usuario desea agregar al carrito.

        // Verificar si el usuario tiene un carrito activo
        let cart = await Cart.findOne({
            where: { UserId: userId, status: 'active' }
        });

        // Si no tiene un carrito activo, crea uno
        if (!cart) {
            cart = await Cart.create({
                UserId: userId,
                status: 'active'
            });
        }

        // Agregar el producto al carrito
        await CartItem.create({
            CartId: cart.id,
            ProductId: productId,
            Quantity: 1 // Puedes ajustar esto según tu lógica de cantidad
        });

        res.redirect('/shop/cart');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al agregar el producto al carrito');
    }
};

module.exports = {
    shop,
    item,
    cart,
    addToCart,
};