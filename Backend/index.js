"use strict";

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
require("dotenv").config();
const cors = require("cors");
const router = require("./routes/solicitud");
const taskrouter = require("./routes/task");
const cookieParser = require("cookie-parser");

const app = express();
const port = process.env.PORT || 3000;

mongoose.connect(process.env.MONGODB_URI);
mongoose.connection.on("connected", () => {
  console.log("Conectado a MongoDB");
});
mongoose.connection.on("error", (err) => {
  console.error("Error al conectar a MongoDB: ", err);
});

app.use(bodyParser.json());
// app.use((req, res, next) => {
//   res.append("Access-Control-Allow-Origin", [
//     "https://chatportfolio.vercel.app",
//   ]);
//   res.append("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
//   res.append("Access-Control-Allow-Headers", "Content-Type");
//   next();
// });

const corsOptions = {
  origin: "https://chatportfolio.vercel.app",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true, // Permitir credenciales (cookies, authorization headers, etc.)
  optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));

app.use(cookieParser());
app.use(router);
app.use(taskrouter);

app.listen(port, () => {
  console.log("servidor corriendo en http://localhost:" + port);
});

module.exports = app;
