const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema(
  {
    contraseña: { type: String },
    preferences: { type: String },
    correo: { type: String },
    carrito: [],
  },
  { collection: "TeddyUser" }
);

module.exports = mongoose.model("TeddyUser", itemSchema);
