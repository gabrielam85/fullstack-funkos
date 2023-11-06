const express = require("express");
const app = express();

app.use(express.static('public'));

app.get('/', (req,res) => {
res.sendFile(__dirname + './public/index.html');
});


app.use((req, res, next) => {
    res.status(404).send("Ruta no encontrada");
});

const PORT = 5000;

app.listen(PORT, () => {
    console.log("Servidor corriendo en http://localhost:" + PORT);
});