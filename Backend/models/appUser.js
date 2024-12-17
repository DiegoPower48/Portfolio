"use strict";

const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema(
  {
    nombre: { type: String },
    correo: { type: String, unique: true },
    contraseña: { type: String },
  },
  { timestamps: true },
  { collection: "UserApp" }
);

module.exports = mongoose.model("UserApp", itemSchema);
