"use strict";

var mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
  Lunes: {
    type: [String],
  },
  Martes: {
    type: [String],
  },
  Miercoles: {
    type: [String],
  },
  Jueves: {
    type: [String],
  },
  Viernes: {
    type: [String],
  },
  Sabado: {
    type: [String],
  },
  Domingo: {
    type: [String],
  },
});

module.exports = mongoose.model("horario", itemSchema);
