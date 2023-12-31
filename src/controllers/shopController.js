const path = require('path');
const model = require('../models/Product');
const Cart = require('../models/Cart');
const CartItem = require('../models/CartItem');

const shop = async (req, res) => {
    try{
        const categoryId = req.query.category; 
        let products;

        if (categoryId) {
          products = await model.findAll({
              where: { CategoryId: categoryId },
              order: [['nombre', 'ASC']]
          });
        } else {
          products = await model.findAll({ 
            order: [['nombre', 'ASC']] 
          });
        }

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
            order: [['updatedAt', 'DESC']],
            limit: 6,
        });

        res.render(path.resolve(__dirname, '../views/shop/item'), { products, item });
    } catch(error){
        console.log(error);
    }
};

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
            },
        });

        const cartItemsQuantity = cart ? cart.CartItems.reduce((total, item) =>
         total + item.Quantity, 0) : 0;

        const cartItemsSubtotal = cart ? cart.CartItems.reduce((total, item) => 
        total + (item.Quantity * item.Product.precio), 0) : 0;

        res.render(path.resolve(__dirname, '../views/shop/cart'), { cart, cartItemsQuantity, cartItemsSubtotal });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al obtener el carrito');
    }
};

const addToCart = async (req, res) => {
    try {
      if(!req.user){
          return res.redirect("/auth/login");
      }

      const userId = req.user.id;
      const productId = req.params.id;
      const quantity = req.body.quantity || 1;
  
      let cart = await Cart.findOne({
        where: { UserId: userId, status: 'active' }
      });
  
      if (!cart) {
        cart = await Cart.create({
          UserId: userId,
          status: 'active'
        });
      }
  
      const [cartItem, created] = await CartItem.findOrCreate({
        where: { CartId: cart.id, ProductId: productId },
        defaults: { Quantity: quantity }
      });

      if (!created) {
      cartItem.Quantity += parseInt(quantity, 10);
      await cartItem.save();
    }

      res.redirect('/shop/cart');
    } catch (error) {
      console.error(error);
      res.status(500).send('Error al agregar el producto al carrito');
    }
  };

  const deleteCartItem = async (req, res) => {
    try {
        const cartItemId = req.params.cartItem;
        
        const cartItem = await CartItem.findByPk(cartItemId);
        if (cartItem) {
            console.log('Producto eliminado correctamente.');
            await cartItem.destroy();
        }

        res.redirect('/shop/cart');
    } catch (error) {
      console.error(error);
      res.status(500).send('Error al eliminar el producto del carrito');
    }
  };

  const checkout = async (req, res) => {
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
        },
      });
  
      if (cart) {
        await cart.update({ status: 'inactive' });
  
        return res.redirect("/");
      }
  
      res.status(404).send('Carrito no encontrado');
    } catch (error) {
      console.error(error);
      res.status(500).send('Error al procesar el pago');
    }
  };
  
module.exports = {
    shop,
    item,
    cart,
    addToCart,
    deleteCartItem,
    checkout,
};