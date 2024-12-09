"use strict";

const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema(
  {
    nombre: { type: String },
    contraseña: { type: String },
    correo: { type: String, unique: true },
  },
  { timestamps: true },
  { collection: "UserApp" }
);

module.exports = mongoose.model("UserApp", itemSchema);
