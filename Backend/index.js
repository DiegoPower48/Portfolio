"use strict";

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
require("dotenv").config();
const cors = require("cors");
const router = require("./routes/solicitud");
const webdata = require("./routes/webdata");
const store = require("./routes/store");
const utp = require("./routes/utpRoutes");
const cookieParser = require("cookie-parser");
const { Server } = require("socket.io");
const sockets = require("./socket/socket");
const http = require("http");

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
      "http://localhost:59231",
      "https://teddy-store.vercel.app",
      "https://diegotorres-portfoliodev.vercel.app",
      "https://chatportfolio.vercel.app",
      "https://daysi-block.vercel.app",
      "https://criptoweb-portfolio.vercel.app",
      "*",
    ],
    methods: ["GET", "PUT", "POST", "OPTIONS", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
); // en origin va la url de nuestro frontend

app.use(cookieParser());

app.use(router);
app.use(store);
app.use(webdata);
app.use(utp);

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5173", "https://chatportfolio.vercel.app","https://teddy-store.vercel.app"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type"],
    credentials: true,
  },
  transports: ["websocket", "polling"],
  connectionStateRecovery: {
    maxDisconnectionDuration: 2 * 60 * 1000,
  },
});

sockets(io);

server.listen(port, () => {
  console.log("servidor corriendo en http://localhost:" + port);
});

module.exports = app;
