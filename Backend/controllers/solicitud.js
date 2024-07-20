"use strict";

const sendMail = require("../models/mail");
const Item = require("../models/solicitud");
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const createAccessToken = require("./jwt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

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

    try {
      console.log("primera validacion");
      const nombreduplicado = await User.findOne({ nombre });
      if (nombreduplicado) {
        return res
          .status(400)
          .send("El nombre de usuario ya se encuentra en uso");
      }
      console.log("segunda validacion");
      const correoduplicado = await User.findOne({ correo });
      if (correoduplicado) {
        return res.status(400).send("El correo ya se encuentra en uso");
      }
      console.log("terminada validacion");
      const paswordhash = await bcrypt.hash(contraseña, 10);

      const usuario = new User({
        nombre: nombre,
        contraseña: paswordhash,
        correo: correo,
      });
      const usuarioguardado = await usuario.save();

      const token = createAccessToken({ id: usuarioguardado._id });
      // res.cookie("token", token, {
      //   secure: true,
      //   sameSite: "None",
      //   maxAge: 1000 * 60 * 60 * 24, // 1 día
      // });
      res.send(token);
    } catch (err) {
      res.status(500).send({ message: err.message });
    }
  },
  login: async (req, res) => {
    const { nombre, contraseña } = req.body;
    console.log("antes de setear cookies");

    try {
      const userFound = await User.findOne({ nombre });

      if (!userFound) {
        return res.status(400).send("Nombre de usuario incorrecto");
      }

      const isMatch = await bcrypt.compare(contraseña, userFound.contraseña);
      if (!isMatch) {
        return res.status(400).send("Contraseña incorrecta");
      }
      const token = await createAccessToken({ id: userFound._id });
      console.log("casi antes de setear cookies");

      // await res.cookie("token", token, {
      //   secure: true,
      //   sameSite: "None",
      //   maxAge: 1000 * 60 * 60 * 24, // 1 día
      // });
      console.log("despues de setear cookies");
      res.send(token);
    } catch (error) {
      res.status(500).send("Error en el servidor");
    }
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
      return res.status(500).send("Error en el servidor");
    }
  },
  verifyToken: async (req, res) => {
    const { token } = req.body;
    console.log(token);
    console.log("verificando token");
    if (!token) {
      console.log("no se encuentra el token");
      return res.status(401).send("back: falta la cookie");
    }
    jwt.verify(token, process.env.SECRET_WORD, async (err, user) => {
      if (err) return res.status(401).send("usuario no autorizado");
      const userFound = await User.findById(user.id);
      if (!userFound) {
        return res.status(401).send("back: cookie o token incorrecto");
      }
      return res.status(200).send({
        nombre: userFound.nombre,
      });
    });
  },
};

module.exports = controller;
