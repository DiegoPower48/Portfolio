"use strict";

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

const corsOptions = {
  origin: "http://localhost:5173", // Reemplaza con tu dominio
  optionsSuccessStatus: 200,
};

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors(corsOptions));

app.use(cors(corsOptions));

mongoose
  .connect("mongodb://127.0.0.1:27017/apirestportfolio")
  .then(() => console.log("conexion a la base de datos exitosa"))
  .catch((err) => console.log(err));

//CARGAR RUTAS

const solicitudRutas = require("./routes/solicitud");
app.use(solicitudRutas);

//CARGAR MIDDLEWARE

app.listen(PORT, () => {
  console.log("servidor corriendo en http://localhost:" + PORT);
});
