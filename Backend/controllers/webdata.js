"use strict";

const webdata = require("../models/webdata");

const controller = {
  data: async (req, res) => {
    try {
      const result = await webdata.findOne({}, "data").select("-_id -__v");
      return res.status(200).send(result.data);
    } catch (error) {
      console.error("Error al ejecutar Puppeteer:", error);
      return res.status(500).send("Error interno del servidor");
    }
  },
};

module.exports = controller;
