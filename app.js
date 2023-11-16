const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const methodOverride = require("method-override");

const app = express();
const path = require('path');

const mainRoutes = require('./src/routes/mainRoutes');
const shopRoutes = require('./src/routes/shopRoutes');
const adminRoutes = require('./src/routes/adminRoutes');
const authRoutes = require('./src/routes/authRoutes');

app.use(express.static('public'));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/src/views'));

// Layout para "/shop", "/index", "/auth"
app.use('/shop', (req, res, next) => {
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
    res.status(404).send("Ruta no encontrada");
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log("Servidor corriendo en http://localhost:" + PORT);
});