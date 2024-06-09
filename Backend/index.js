"use strict";

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

app.use(bodyParser.json());

const MONGODB_URI =
  "mongodb+srv://diegotorres11:aCljStNR9of8uZhi@portfoliosolicitudes.zim6muz.mongodb.net";

// Conectar a MongoDB
mongoose.connect(MONGODB_URI);
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

app.post("/correo", async (req, res) => {
  try {
    res.header("Access-Control-Allow-Origin", "*");

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

app.options("/api/items", cors(corsOptions), (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
});

// Iniciar el servidor
app.listen(port, () => {
  console.log("servidor corriendo en http://localhost:" + port);
});
