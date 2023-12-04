require('dotenv').config();

const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const methodOverride = require("method-override");

const app = express();
const path = require('path');

const session = require("cookie-session");

app.use(
    session({
      keys: ["S3cr3t01", "S3cr3t02"],
    })
);

const isLogin = (req, res, next) => {
    if (!req.session.userId) {
        return res.redirect("/login");
    }

    next();
};

const mainRoutes = require('./src/routes/mainRoutes');
const shopRoutes = require('./src/routes/shopRoutes');
const productRoutes = require('./src/routes/admin/productRoutes');
const categoryRoutes = require('./src/routes/admin/categoryRoutes');
const authRoutes = require('./src/routes/authRoutes');

const sequelize = require('./src/models/connection');

app.use(express.static('public'));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/src/views'));

// Layout para "/home"
app.use('/', (req, res, next) => {
    app.set('layout', 'layouts/mainLayout');
    next();
});
// Layout para "/auth"
app.use('/auth', (req, res, next) => {
    app.set('layout', 'layouts/authLayout');
    next();
});
// Layout para "/shop",
app.use('/shop', (req, res, next) => {
    app.set('layout', 'layouts/mainLayout');
    next();
});
// Layout para "/product"
app.use('/product', isLogin, (req, res, next) => {
    app.set('layout', 'layouts/adminLayout');
    next();
});
// Layout para "/category"
app.use('/category', isLogin, (req, res, next) => {
    app.set('layout', 'layouts/adminLayout');
    next();
});

app.use(expressLayouts); //siempre se coloca despues de definir el view engine

app.use(express.urlencoded({extended: false}));
app.use(methodOverride("_method"));

app.use('/', mainRoutes);
app.use('/shop', shopRoutes);
app.use('/product', productRoutes);
app.use('/category', categoryRoutes);
app.use('/auth', authRoutes);

app.use((req, res, next) => {
    res.status(404).render('404', { titulo: 'Página no encontrada' });
});

//app.use((err, req, res, next) => {
//    console.error(err.stack);
//    res.status(500).render('error');
//});

const PORT = process.env.PORT || 3000;
app.listen(PORT, async () => {
    try{
        await sequelize.sync();
    }   catch(error){
        console.log(error);
    }

    console.log("Servidor corriendo en http://localhost:" + PORT);
});