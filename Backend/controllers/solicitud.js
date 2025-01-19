"use strict";

const sendMail = require("../models/mail");
const Item = require("../models/solicitud");
const User = require("../models/user");
const block = require("../models/block");
const bcrypt = require("bcryptjs");
const webPush = require("web-push");
const createAccessToken = require("./jwt");
const jwt = require("jsonwebtoken");
const Horario = require("../models/horario");
const schedule = require("node-schedule");
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
    const { nombre, contrasenia, correo } = req.body;

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
      const paswordhash = await bcrypt.hash(contrasenia, 10);

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
    const { nombre, contrasenia } = req.body;

    try {
      const userFound = await User.findOne({ nombre });

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
  horario: async (req, res) => {
    try {
      const horario = await Horario.find({});
      return res.status(200).send(horario);
    } catch (error) {
      return res.status(400).send(error);
    }
  },

  edithorario: async (req, res) => {
    const { Lunes, Martes, Miercoles, Jueves, Viernes, Sabado, Domingo } =
      req.body;
    try {
      const horarioBuscado = await Horario.findById("672f2b4bae015af979216dac");

      if (!horarioBuscado) {
        const horario = new Horario({
          Lunes,
          Martes,
          Miercoles,
          Jueves,
          Viernes,
          Sabado,
          Domingo,
        });
        await horario.save();
        return res.status(200).send("registrado");
      }

      horarioBuscado.Lunes = Lunes;
      horarioBuscado.Martes = Martes;
      horarioBuscado.Miercoles = Miercoles;
      horarioBuscado.Jueves = Jueves;
      horarioBuscado.Viernes = Viernes;
      horarioBuscado.Sabado = Sabado;
      horarioBuscado.Domingo = Domingo;

      await horarioBuscado.save();

      return res.status(200).send("registrado");
    } catch (error) {
      console.log(error);
      return res.status(400).send(error);
    }
  },

  notificaciones: async (req, res) => {
    const { subscription, message, timeZone } = req.body;
    const [hour, minute] = time.split(":").map(Number);

    webPush.setVapidDetails(
      "mailto:examplemail.com",
      process.env.PUBLIC_VAPID_KEY,
      process.env.PRIVATE_VAPID_KEY
    );

    if (!subscription || !subscription.endpoint) {
      return res
        .status(400)
        .json({ error: "Suscripción inválida o no proporcionada." });
    }

    const rule = new schedule.RecurrenceRule();
    rule.hour = hour;
    rule.minute = minute;
    rule.second = 0;
    rule.tz = timeZone;

    const payload = JSON.stringify({
      title: "Reminder",
      body: message,
      icon: "icono",
    });

    try {
      schedule.scheduleJob(rule, async () => {
        await webPush.sendNotification(subscription, payload);
      });

      res.status(200).json({ message: "Notificación enviada" });
    } catch (error) {
      console.error("Error enviando notificación:", error);
      res.status(500).json({ error: "Error enviando notificación" });
    }
  },
};

module.exports = controller;
