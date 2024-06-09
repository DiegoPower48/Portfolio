// "use strict";

// // mongoose.connect("mongodb://127.0.0.1:27017/apirestportfolio").then(() => {
// //   console.log("La conexión a la base de datos se ha realizado con bien!!");
// //   app.listen(PORT, () => {
// //     console.log("servidor corriendo en http://localhost:" + PORT);
// //   });
// // });

// const express = require("express");
// const mongoose = require("mongoose");
// const bodyParser = require("body-parser");
// const cors = require("cors");
// const PORT = process.env.PORT || 3000;

// // MongoDB connection

// // EJECUTAR XPRES
// const app = express();

// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());
// app.use(cors());

// mongoose
//   .connect("mongodb://127.0.0.1:27017/apirestportfolio")
//   .then(() => console.log("conexion a la base de datos exitosa"))
//   .catch((err) => console.log(err));

// //CARGAR RUTAS

// const solicitudRutas = require("./routes/solicitud");
// app.use(solicitudRutas);

// //CARGAR MIDDLEWARE

// app.listen(PORT, () => {
//   console.log("servidor corriendo en http://localhost:" + PORT);
// });

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());

// Conexión a MongoDB
mongoose
  .connect("mongodb://127.0.0.1:27017/apirestportfolio")
  .then(() => console.log("Conectado a MongoDB"))
  .catch((err) => console.error("Error al conectar a MongoDB", err));

// Definir un modelo
const Item = mongoose.model(
  "Solicitud",
  new mongoose.Schema({
    nombre: String,
    correo: String,
    comentario: String,
  })
);

// Rutas

const allowedOrigins = ["http://localhost:5173"];

app.post("/correo", async (req, res) => {
  const origin = req.header("origin");
  if (allowedOrigins.includes(origin) || !origin) {
    res.header("Access-Control-Allow-Origin", origin);
    res.header("Access-Control-Allow-Methods", "GET,POST,PATCH");
  }

  const item = new Solicitud({
    name: req.body.name,
    name: req.body.correo,
    name: req.body.comentario,
  });

  await item.save();
  res.send(item);
});

app.options("/correo", async (req, res) => {
  const origin = req.header("origin");
  if (allowedOrigins.includes(origin) || !origin) {
    res.header("Access-Control-Allow-Origin", origin);
    res.header("Access-Control-Allow-Methods", "GET,POST,PATCH");
  }

  const item = new Solicitud({
    name: req.body.name,
    name: req.body.correo,
    name: req.body.comentario,
  });
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
});
