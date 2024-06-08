"use strict";

var mongoose = require("mongoose");
// var app = require("./app");
var PORT = process.env.PORT || 3000;
var express = require("express");
var bodyParser = require("body-parser");
var cors = require("cors");

mongoose.Promise = global.Promise;

mongoose
  .connect("mongodb://localhost:27017/apirestportfolio", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("La conexión a la base de datos se ha realizado con bien!!");
    app.listen(PORT, () => {
      console.log("servidor corriendo en http://localhost:" + PORT);
    });
  });

var app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

//CORSE

//AÑADIR PREFIJOS A RUTAS

app.use(solicitudRutas);

//EXPORTAR EL MODULO

module.exports = app;
