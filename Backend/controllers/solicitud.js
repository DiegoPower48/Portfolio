"use strict";

const sendMail = require("./mail");
var Item = require("../models/solicitud");

require("dotenv").config();

var controller = {
  correo: async (req, res) => {
    try {
      await Item.create({
        nombre: req.body.nombre,
        correo: req.body.correo,
        comentario: req.body.message,
      });

      await sendMail(item.nombre, item.correo, item.comentario);

      res.status(201).send(item);
    } catch (err) {
      res.status(400).send({ message: err.message });
    }
  },
};

module.exports = controller;
