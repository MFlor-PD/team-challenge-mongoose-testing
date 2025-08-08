require('dotenv').config();
const express = require('express');
const app = express();
const PORT = 8080;
const { dbConnection } = require('./config/config');
const Postroutes = require('./routes/post.js');

app.use(express.json());
app.get("/", (req, res) => {
    res.send (" Agregar  /post  al url del localhost y ver los resultados")
})
app.use("/post", Postroutes);

//console.log("MONGO_URI desde index.js:", process.env.MONGO_URI); // <-- Añade esta línea
dbConnection();

app.listen(PORT, () => console.log(`Server started at port: http://localhost:${PORT}`));


module.exports = app;
