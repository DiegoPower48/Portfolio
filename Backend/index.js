"use strict";

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

// Conectar a MongoDB
mongoose.connect(process.env.MONGODB_URI);
console.log("Conectado a MongoDB");

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

const ACCEPTED_ORIGINS = ["http://localhost:5173/"];

app.post("/correo", async (req, res) => {
  const origin = req.header("origin");
  if (ACCEPTED_ORIGINS.includes(origin) || !origin) {
    res.header("Access-Control-Allow-Origin", origin);
  }
  try {
    const item = new Item({
      nombre: req.body.nombre,
      correo: req.body.correo,
      comentario: req.body.comentario,
    });
    await item.save();
    res.send(item);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
});

app.options("/correo", async (req, res) => {
  const origin = req.header("origin");
  if (ACCEPTED_ORIGINS.includes(origin) || !origin) {
    res.header("Access-Control-Allow-Origin", origin);
    res.header("Access-Control-Allow-Methods", "POST");
  }
  res.status(200);
});

// Iniciar el servidor
app.listen(port, () => {
  console.log("servidor corriendo en http://localhost:" + port);
});
