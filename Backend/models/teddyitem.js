const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema(
  {
    item: { type: String },
    image: { type: String },
    seccion: { type: String },
    shortDescription: { type: String },
    description: { type: String },
    price: { type: Number },
  },
  { collection: "Teddy" }
);

module.exports = mongoose.model("Teddy", itemSchema);
