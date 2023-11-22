require('dotenv').config();

const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const methodOverride = require("method-override");

const app = express();
const path = require('path');

const mainRoutes = require('./src/routes/mainRoutes');
const shopRoutes = require('./src/routes/shopRoutes');
const adminRoutes = require('./src/routes/adminRoutes');
const authRoutes = require('./src/routes/authRoutes');

const sequelize = require('./src/models/connection');

app.use(express.static('public'));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/src/views'));

// Layout para "/auth"
app.use('/auth', (req, res, next) => {
    app.set('layout', 'layouts/mainLayout');
    next();
});
// Layout para "/shop",
app.use('/shop', (req, res, next) => {
    app.set('layout', 'layouts/mainLayout');
    next();
});
// Layout para "/home"
app.use('/', (req, res, next) => {
    app.set('layout', 'layouts/mainLayout');
    next();
});
// Layout para "/admin"
app.use('/admin', (req, res, next) => {
    app.set('layout', 'layouts/adminLayout');
    next();
});

app.use(expressLayouts); //siempre se coloca despues de definir el view engine

app.use(express.urlencoded({extended: false}));
app.use(methodOverride("_method"));

app.use('/', mainRoutes);
app.use('/shop', shopRoutes);
app.use('/admin', adminRoutes);
app.use('/auth', authRoutes);

app.use((req, res, next) => {
    res.status(404).render('404', { titulo: 'Página no encontrada' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, async () => {
    try{
        await sequelize.authenticate();
    } catch(error){
        console.log(error);
    }

    console.log("Servidor corriendo en http://localhost:" + PORT);
});