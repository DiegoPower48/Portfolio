const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema(
  {
    nombre: { type: String },
    contraseña: { type: String },
    correo: { type: String },
  },
  { collection: "USERS" }
);

module.exports = mongoose.model("User", itemSchema);
