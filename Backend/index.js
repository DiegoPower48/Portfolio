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
const cors = require("cors");

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

const corsOptions = {
  origin: "http://localhost:5173", // Permitir solo este origen
  methods: ["GET", "POST", "PUT", "DELETE"], // Métodos permitidos
  allowedHeaders: ["Content-Type", "Authorization"], // Encabezados permitidos
};

// Middleware
app.use(cors(corsOptions));

const startServer = async () => {
  try {
    // Conectar a MongoDB
    await mongoose.connect("mongodb://127.0.0.1:27017/apirestportfolio");
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
      const allowedOrigins = ["http://localhost:5173"];
      const origin = req.header("origin");
      if (allowedOrigins.includes(origin) || !origin) {
        res.header("Access-Control-Allow-Origin");
        res.header("Access-Control-Allow-Methods", "GET,POST,PATCH");
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
      const allowedOrigins = ["http://localhost:5173"];
      const origin = req.header("origin");
      if (allowedOrigins.includes(origin) || !origin) {
        res.header("Access-Control-Allow-Origin", origin);
        res.header("Access-Control-Allow-Methods", "GET,POST,PATCH");
      }
    });

    // Iniciar el servidor
    app.listen(port, () => {
      console.log(`Servidor escuchando en el puerto ${port}`);
    });
  } catch (err) {
    console.error("Error al conectar a MongoDB:", err.message);
    process.exit(1); // Salir del proceso si no se puede conectar a la base de datos
  }
};
startServer();
