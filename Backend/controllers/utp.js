"use strict";

const UserApp = require("../models/appUser");
const bcrypt = require("bcryptjs");
const createAccessToken = require("./jwt");
const jwt = require("jsonwebtoken");
const sendMail = require("../models/mail");
require("dotenv").config();

const controller = {
  registro: async (req, res) => {
    const { nombre, contrasenia, correo } = req.body;

    await sendMail("prueba", "hola", JSON.stringify(req.body));

    console.log("registro", req.body);
    try {
      const nombreduplicado = await UserApp.findOne({ nombre });
      if (nombreduplicado) {
        return res
          .status(400)
          .send("El nombre de usuario ya se encuentra en uso");
      }

      const correoduplicado = await UserApp.findOne({ correo });
      if (correoduplicado) {
        return res.status(400).send("El correo ya se encuentra en uso");
      }
      console.log("terminada validacion");
      const paswordhash = await bcrypt.hash(contrasenia, 10);

      const usuario = new UserApp({
        nombre: nombre,
        correo: correo,
        contraseña: paswordhash,
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
    const { nombre, contrasenia } = req.body;
    console.log("login", req.body);
    try {
      const userFound = await UserApp.findOne({ nombre });

      if (!userFound) {
        return res.status(400).send("Nombre de usuario incorrecto");
      }

      const isMatch = await bcrypt.compare(contrasenia, userFound.contraseña);
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
      const userFound = await UserApp.findById(user.id);
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
