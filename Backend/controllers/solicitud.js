"use strict";

const sendMail = require("../models/mail");
const Item = require("../models/solicitud");
const User = require("../models/user");
const block = require("../models/block");
const bcrypt = require("bcryptjs");
const createAccessToken = require("./jwt");
const jwt = require("jsonwebtoken");
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
      console.log("Se envio correo desde portfolio con exito");
      res.status(201).send(item);
    } catch (err) {
      console.log("Error de envio de correo desde portfolio");
      res.status(400).send("error en backend");
    }
  },

  registro: async (req, res) => {
    const { nombre, contraseña, correo } = req.body;

    try {
      const nombreduplicado = await User.findOne({ nombre });
      if (nombreduplicado) {
        return res
          .status(400)
          .send("El nombre de usuario ya se encuentra en uso");
      }

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

      const token = await createAccessToken({ id: usuarioguardado._id });
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

      // await res.cookie("token", token, {
      //   secure: true,
      //   sameSite: "None",
      //   maxAge: 1000 * 60 * 60 * 24, // 1 día
      // });

      res.send(token);
    } catch (error) {
      res.status(500).send("Error en el servidor");
    }
  },
  verifyToken: async (req, res) => {
    const { token } = req.body;

    if (!token) {
      return res.status(401).send("back: falta el token");
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
  blocks: async (req, res) => {
    try {
      const texto = await block.find({});
      return res.status(200).send(texto);
    } catch (error) {
      return res.status(400).send(error);
    }
  },
  editblock: async (req, res) => {
    const { id, texto } = req.body;
    try {
      const blockBuscado = await block.findById(id);

      if (!blockBuscado) {
        const textoNuevo = new block({
          _id: id,
          texto: texto,
        });

        await textoNuevo.save();
        return res.status(200).send("registrado");
      }

      blockBuscado.texto = texto;
      await blockBuscado.save();

      return res.status(200).send("registrado");
    } catch (error) {
      console.log(error);
      return res.status(400).send(error);
    }
  },
};

module.exports = controller;
