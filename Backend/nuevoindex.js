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

const allowedOrigins = [
  "https://diego-dev-portfolio.vercel.app",
  "http://localhost:5173",
];

app.post("/correo", async (req, res) => {
  const origin = await req.header("origin");
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

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
});
