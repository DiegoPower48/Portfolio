"use strict";

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
require("dotenv").config();
const cors = require("cors");

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Conectar a MongoDB
mongoose.connect(process.env.MONGODB_URI);
mongoose.connection.on("connected", () => {
  console.log("Conectado a MongoDB");
});
mongoose.connection.on("error", (err) => {
  console.error("Error al conectar a MongoDB: ", err);
});

// Definir un modelo
const itemSchema = new mongoose.Schema(
  {
    nombre: { type: String },
    correo: { type: String },
    comentario: { type: String },
  },
  { collection: "diegos" }
);

const Item = mongoose.model("Item", itemSchema);

// Rutas

const ACCEPTED_ORIGINS = [
  "http://localhost:5173",
  "https://portfolio-8az3.onrender.com/correo",
  "https://portfolio-8az3.onrender.com",
];

app.post("/correo", async (req, res) => {
  // const origin = req.headers.origin;
  // if (ACCEPTED_ORIGINS.includes(origin) || !origin) {
  //   res.header("Access-Control-Allow-Origin", origin);
  // }

  try {
    const item = new Item({
      nombre: req.body.nombre,
      correo: req.body.correo,
      comentario: req.body.comentario,
    });
    await item.save();
    res.status(201).send(item);
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
});

// app.options("/correo", (req, res) => {
//   const origin = req.headers.origin;
//   if (ACCEPTED_ORIGINS.includes(origin) || !origin) {
//     res.header("Access-Control-Allow-Origin", origin);
//     res.header("Access-Control-Allow-Methods", "POST, OPTIONS");
//   }
//   res.sendStatus(200);
// });

// Iniciar el servidor
app.listen(port, () => {
  console.log("servidor corriendo en http://localhost:" + port);
});
