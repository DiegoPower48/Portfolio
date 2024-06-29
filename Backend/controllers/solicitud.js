"use strict";

const sendMail = require("../models/mail");
const Item = require("../models/solicitud");
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const createAccessToken = require("./jwt");

require("dotenv").config();

const controller = {
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
    const { nombre, contraseña, correo } = req.body;

    const paswordhash = await bcrypt.hash(contraseña, 10);

    try {
      const usuario = new User({
        nombre: nombre,
        contraseña: paswordhash,
        correo: correo,
      });
      const usuarioguardado = await usuario.save();

      const token = createAccessToken({ id: usuarioguardado._id });
      res.cookie("token", token);
      res.json({ message: "usuario creado correctamente" });
    } catch (err) {
      res.status(500).send({ message: err.message });
    }
  },
  login: async (req, res) => {
    const { nombre, contraseña } = req.body;

    try {
      const userFound = await User.findOne({ nombre });

      if (!userFound) {
        return res.status(400).send("Usuario Incorrecto");
      }

      const isMatch = await bcrypt.compare(contraseña, userFound.contraseña);
      if (!isMatch) {
        return res.status(400).send("clave Incorrecta");
      }

      const token = await createAccessToken({ id: userFound._id });

      res.cookie("token", token);
      res.json({ message: "login exitoso" });
    } catch (error) {
      res.status(500).send("Error en el servidor");
    }
  },

  logout: async (req, res) => {
    await res.cookie("token", "", { expires: new Date(0) });
    return res.sendStatus(201);
  },

  profile: async (req, res) => {
    try {
      const userFound = await User.findById(req.user.id);

      if (!userFound) {
        return res.status(400).send("Usuario no encontrado");
      }

      return res.json({
        nombre: userFound.nombre,
      });
    } catch (error) {
      console.error(error);
      res.status(500).send("Error en el servidor");
    }
  },
};

module.exports = controller;
