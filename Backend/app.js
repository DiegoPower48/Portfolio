// "use strict";

// //CARGAR MODULOS DE NODE PARA CREAR EL SERVER
// var express = require("express");
// var bodyParser = require("body-parser");
// var cors = require("cors");

// // EJECUTAR XPRES
// var app = express();

// //CARGAR RUTAS

// var solicitudRutas = require("./routes/solicitud");

// //CARGAR MIDDLEWARE
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());
// app.use(cors());

// //CORSE

// //AÑADIR PREFIJOS A RUTAS

// app.use(solicitudRutas);

// //EXPORTAR EL MODULO

// module.exports = app;
