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

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://chatportfolio.vercel.app",
      "https://diegotorres-portfoliodev.vercel.app",
      "https://chatportfolio-production-c9b8.up.railway.app",
    ],
    methods: ["GET", "PUT", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
); // en origin va la url de nuestro frontend

app.use(cookieParser());

app.use(router);
app.use(taskrouter);

app.listen(port, () => {
  console.log("servidor corriendo en http://localhost:" + port);
});

module.exports = app;
