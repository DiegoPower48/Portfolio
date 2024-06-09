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

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// CONFIGURAR EL CORS

// const allowedOrigins = [
//   "https://diego-dev-portfolio.vercel.app",
//   "http://localhost:5173",
// ];

// const corsOptions = {
//   origin: (origin, callback) => {
//     // Permitir solicitudes sin origen (por ejemplo, curl, Postman)
//     if (!origin) return callback(null, true);

//     if (allowedOrigins.indexOf(origin) !== -1) {
//       // Si el origen está en la lista de permitidos
//       callback(null, true);
//     } else {
//       // Si el origen no está en la lista de permitidos
//       callback(new Error("No permitido por el CORS"));
//     }
//   },
//   methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
//   allowedHeaders: ["Content-Type", "Authorization"],
//   credentials: true,
//   optionsSuccessStatus: 204,
// };

// app.use(cors(corsOptions));
var router = express.Router();

const allowedOrigins = [
  "https://diego-dev-portfolio.vercel.app",
  "http://localhost:5173",
];

router.options("/correo", (req, res) => {
  const origin = req.header("origin");
  if (allowedOrigins.includes(origin) || !origin) {
    res.header("Access-Control-Allow-Origin", origin);
    res.header("Access-Control-Allow-Methods", "GET,POST,PATCH");
  }
  res.sendStatus(200);
});

app.use(cors(allowedOrigins));

//CONECTAR MONGOOSE

//CARGAR RUTAS

const solicitudRutas = require("./routes/solicitud");
app.use(solicitudRutas);

//CARGAR MIDDLEWARE

app.listen(PORT, () => {
  console.log("servidor corriendo en http://localhost:" + PORT);
});

//CARGAR SCHEMA

var Schema = mongoose.Schema;
var Solicitud = Schema({
  nombre: String,
  correo: String,
  comentario: String,
  file: String,
});

//UPLOAD

var validator = require("validator");

var controller = {
  correo: async (req, res) => {
    var params = req.body;

    const origin = req.header("origin");
    if (allowedOrigins.includes(origin) || !origin) {
      res.header("Access-Control-Allow-Origin", origin);
      res.header("Access-Control-Allow-Methods", "GET,POST,PATCH");
    }
    await res.sendStatus(200);

    var solicitud = new Solicitud();

    try {
      var validarNombre = !validator.isEmpty(params.nombre);
      var validarcorreo = !validator.isEmpty(params.correo);
      var validarcomentario = !validator.isEmpty(params.comentario);
    } catch (err) {
      return res.status(400).send({
        mensaje: "falta datos",
      });
    }
    if (validarNombre && validarcorreo && validarcomentario) {
      solicitud.nombre = params.nombre;
      solicitud.correo = params.correo;
      solicitud.comentario = params.comentario;

      await solicitud.save();

      return res.status(200).send({
        status: "sucess",
        solicitud,
      });
    }
  },
};

//ROUTRE
var router = express.Router();

router.post("/correo", controller.correo);

mongoose
  .connect("mongodb://127.0.0.1:27017/apirestportfolio")
  .then(() => console.log("conexion a la base de datos exitosa"))
  .catch((err) => console.log(err));
