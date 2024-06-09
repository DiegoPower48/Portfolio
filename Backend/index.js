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

app.use((req, res, next) => {
  console.log(`Request Method: ${req.method}`);
  console.log(`Request Origin: ${req.headers.origin}`);
  console.log(`Request Headers: ${JSON.stringify(req.headers)}`);
  next();
});

//CONECTAR MONGOOSE

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
