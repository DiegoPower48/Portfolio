"use strict";

const sendMail = require("../models/mail");
var Item = require("../models/solicitud");
var User = require("../models/user");

require("dotenv").config();

var controller = {
  correo: async (req, res) => {
    try {
      const item = new Item({
        nombre: req.body.nombre,
        correo: req.body.correo,
        comentario: req.body.comentario,
      });
      await item.save();
      await sendMail(item.nombre, item.correo, item.comentario);

      res.status(201).send(item);
    } catch (err) {
      res.status(400).send("error en backend");
    }
  },

  registro: async (req, res) => {
    try {
      const usuario = new User({
        nombre: req.body.nombre,
        contraseña: req.body.contraseña,
        correo: req.body.correo,
      });
      await usuario.save();

      res.status(201).send(usuario);
    } catch (err) {
      res.status(400).send({ message: err.message });
    }
  },
  login: async (req, res) => {
    try {
      const UserOk = usuario.findOne(
        { nombre: req.params.nombre },
        { contraseña: req.params.contraseña }
      );
      if (UserOk) {
        console.log(
          "usuario exitente",
          req.params.nombre,
          req.params.contraseña
        );
        res.status(201).send(usuario);
      } else {
        res.status(404).send("usuario no existe");
      }
    } catch (error) {
      res.status(400).send("error en backend");
    }
  },
};

module.exports = controller;
