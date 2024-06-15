"use strict";

var Item = require("../models/solicitud");
var brevo = require("@getbrevo/brevo");
require("dotenv").config();

const apiInstance = new brevo.TransactionalEmailsApi();

apiInstance.setApiKey(
  brevo.TransactionalEmailsApiApiKeys.apiKey,
  process.env.CORREO_URI
);
const Email = new brevo.SendSmtpEmail();

var controller = {
  correo: async (req, res) => {
    try {
      const item = new Item({
        nombre: req.body.nombre,
        correo: req.body.correo,
        comentario: req.body.comentario,
      });

      await item.save();
      res.status(201).send(item);

      Email.subject = "COMENTARIO DE PORTFOLIO";
      Email.to = [
        { email: "diego_torres_11@hotmail.com", name: "Diego y Daysi" },
      ];
      Email.htmlContent = item.comentario;
      Email.sender = {
        name: item.nombre + " " + item.correo,
        email: "diego_torres_11@hotmail.com",
      };

      apiInstance.sendTransacEmail(Email);
    } catch (err) {
      res.status(400).send({ message: err.message });
    }
  },
};

module.exports = controller;
