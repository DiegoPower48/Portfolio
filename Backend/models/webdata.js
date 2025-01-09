"use strict";

var mongoose = require("mongoose");

const itemSchema = new mongoose.Schema(
  {
    data: { type: Array, required: true },
  },
  { collection: "Webdata" },
  { _id: false }
);

module.exports = mongoose.model("webdata", itemSchema);
