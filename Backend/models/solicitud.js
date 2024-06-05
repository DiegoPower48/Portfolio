"use strict";

var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var SolicitudSchema = Schema({
  nombre: String,
  correo: String,
  comentario: String,
  file: String,
});

module.exports = mongoose.model("Solicitud", SolicitudSchema);
