"use strict";

var mongoose = require("mongoose");

const itemSchema = new mongoose.Schema(
  {
    data: [],
  },
  { collection: "Webdata" },
  { _id: false }
);

module.exports = mongoose.model("webdata", itemSchema);
