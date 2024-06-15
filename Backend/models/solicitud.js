"use strict";

var mongoose = require("mongoose");

const itemSchema = new mongoose.Schema(
  {
    nombre: { type: String },
    correo: { type: String },
    comentario: { type: String },
  },
  { collection: "COMENTARIOS" }
);

module.exports = mongoose.model("Item", itemSchema);
