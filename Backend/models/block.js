"use strict";

var mongoose = require("mongoose");

const itemSchema = new mongoose.Schema(
  {
    _id: { type: Number },
    texto: { type: String },
  },
  { collection: "BlockDaysi" },
  { _id: false }
);

module.exports = mongoose.model("block", itemSchema);
