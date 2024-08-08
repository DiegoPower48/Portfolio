"use strict";

const teddyitem = require("../models/teddyitem");
const Teddyuser = require("../models/teddyuser");
const createAccessToken = require("./jwt");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const diacritics = require("diacritics");
require("dotenv").config();

const controller = {
  registro: async (req, res) => {
    const { contraseña, correo } = req.body;

    try {
      // const nombreduplicado = await Teddyuser.findOne({ nombre });
      // if (nombreduplicado) {
      //   return res
      //     .status(400)
      //     .send("El nombre de usuario ya se encuentra en uso");
      // }

      const correoduplicado = await Teddyuser.findOne({ correo });
      if (correoduplicado) {
        return res.status(400).send("El correo ya se encuentra en uso");
      }
      console.log("terminada validacion");
      const paswordhash = await bcrypt.hash(contraseña, 10);

      const usuario = new Teddyuser({
        // nombre: nombre,
        contraseña: paswordhash,
        correo: correo,
      });
      const usuarioguardado = await usuario.save();

      const token = await createAccessToken({ id: usuarioguardado._id });

      return res.send(token);
    } catch (err) {
      return res.status(500).send({ message: err.message });
    }
  },
  login: async (req, res) => {
    const { correo, contraseña } = req.body;

    try {
      const userFound = await Teddyuser.findOne({ correo });

      if (!userFound) {
        return res.status(400).send("correo de usuario incorrecto");
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

  profile: async (req, res) => {
    const { data } = req.body;
    try {
      const userFound = await Teddyuser.findOne({ data });

      if (!userFound) {
        return res.status(400).send("Usuario no encontrado");
      }

      return res.status(200).send(userFound);
    } catch (error) {
      return res.status(500).send("Error en el servidor");
    }
  },

  createTeddy: async (req, res) => {
    try {
      const { item, image, seccion, shortDescription, description, price } =
        req.body;

      const newTeddy = new teddyitem({
        item,
        image,
        seccion,
        shortDescription,
        description,
        price,
      });

      const savedTeddy = await newTeddy.save();
      return res.json(savedTeddy);
    } catch (error) {
      return res.status(500).send("error al guardar en el servidor");
    }
  },

  getTeddy: async (req, res) => {
    const teddy = req.params.id;

    if (teddy === undefined) {
      return res.status(404).send("peluche no encontrado");
    }

    try {
      const Teddy = await teddyitem.findById(teddy);
      if (!Teddy) {
        return res.status(404).send("peluche no encontrado");
      }

      return res.json(Teddy);
    } catch (error) {
      const Teddy = await teddyitem.findOne().sort({ field: 1 });
      return res.status(400).send("no encontrado");
    }
  },

  getTeddys: async (req, res) => {
    try {
      const Teddy = await teddyitem.find({});
      return res.status(200).json(Teddy);
    } catch (error) {
      return res.status(400).send("error al cargar teddys");
    }
  },

  getcart: async (req, res) => {
    try {
      const data = req.body;

      const Teddy = [];

      for (let i = 0; i < data.length; i++) {
        Teddy.push(await teddyitem.findById(data[i]));
      }
      return res.status(200).json(Teddy);
    } catch (error) {
      return res.status(400).send(error);
    }
  },

  addTeddy: async (req, res) => {
    const { nombre, teddy } = req.body;

    const userFound = await Teddyuser.findOne({ correo: nombre });

    if (!userFound) {
      return res.status(400).send("Usuario no encontrado");
    }

    userFound.carrito.push(teddy);
    await userFound.save();
    const cantidad = userFound.carrito.length;
    return res.status(200).send({ carrito: cantidad });
  },

  searchTeddy: async (req, res) => {
    try {
      const { teddy } = req.params;

      const searchTeddy = diacritics.remove(teddy);

      const teddyFound = await teddyitem.find({
        item: { $regex: searchTeddy, $options: "i" },
      });

      if (!teddyFound) {
        return res.status(400).send("no encontrado");
      }
      return res.status(200).send(teddyFound);
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  },

  deleteTeddy: async (req, res) => {
    try {
      const { user, teddy } = req.params;
      const userFound = await Teddyuser.findOne({ correo: user });
      const indices = userFound.carrito.indexOf(teddy);
      if (indices > -1) {
        userFound.carrito.splice(indices, 1);
      } else {
        return res.status(404).send("Teddy no encontrado en el carrito");
      }
      await userFound.save();
      const cantidad = userFound.carrito.length;
      return res.status(200).send({ carrito: cantidad });
    } catch (error) {
      res.status(400).send(error);
    }
  },
  verifyToken: async (req, res) => {
    const { token } = req.body;

    if (!token) {
      return res.status(401).send("back: falta el token");
    }
    jwt.verify(token, process.env.SECRET_WORD, async (err, user) => {
      if (err) return res.status(401).send("usuario no autorizado");
      const userFound = await Teddyuser.findById(user.id);
      if (!userFound) {
        return res.status(401).send("back: cookie o token incorrecto");
      }
      return res.status(200).send({
        correo: userFound.correo,
      });
    });
  },
};

module.exports = controller;
