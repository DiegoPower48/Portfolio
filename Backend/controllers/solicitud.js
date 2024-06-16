"use strict";

const sendMail = require("./resend");
var Item = require("../models/solicitud");

require("dotenv").config();

var controller = {
  correo: async (req, res) => {
    try {
      const item = new Item({
        nombre: req.body.nombre,
        correo: req.body.correo,
        comentario: req.body.comentario,
      });

      sendMail(item.correo, item.comentario);

      await item.save();
      res.status(201).send(item);
    } catch (err) {
      res.status(400).send({ message: err.message });
    }
  },
};

module.exports = controller;
