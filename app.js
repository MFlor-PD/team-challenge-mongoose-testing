require('dotenv').config();
const express = require('express');
const app = express();
const { dbConnection } = require('./config/config');
const Postroutes = require('./routes/post.js');

app.use(express.json());

app.get("/", (req, res) => {
    res.send("Agregar /post al URL del localhost y ver los resultados");
});

app.use("/post", Postroutes);

// Conectamos la base de datos
dbConnection();

module.exports = app;
