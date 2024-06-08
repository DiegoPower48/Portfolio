"use strict";

// var mongoose = require("mongoose");
// var app = require("./app");
// var PORT = process.env.PORT || 3000;

// mongoose.Promise = global.Promise;

// mongoose.connect("mongodb://127.0.0.1:27017/apirestportfolio").then(() => {
//   console.log("La conexión a la base de datos se ha realizado con bien!!");
//   app.listen(PORT, () => {
//     console.log("servidor corriendo en http://localhost:" + PORT);
//   });
// });

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const PORT = process.env.PORT || 3000;

// MongoDB connection

// EJECUTAR XPRES
const app = express();

app.listen(PORT, () => {
  console.log("servidor corriendo en http://localhost:" + PORT);
});

const run = async () => {
  await mongoose.connect("mongodb://127.0.0.1:27017/apirestportfolio");
};

run().catch((err) => console.error(err));

//CARGAR RUTAS
const solicitudRutas = require("./routes/solicitud");

//CARGAR MIDDLEWARE
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

//CORSE

//AÑADIR PREFIJOS A RUTAS
app.use(solicitudRutas);
