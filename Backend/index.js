"use strict";

var mongoose = require("mongoose");
var app = require("./app");
var port = 3900;

mongoose.Promise = global.Promise;

mongoose.connect("mongodb://localhost:27017/apirestportfolio").then(() => {
  console.log("La conexión a la base de datos se ha realizado con bien!!");
  app.listen(port, () => {
    console.log("servidor corriendo en http://localhost:" + port);
  });
});
