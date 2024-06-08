"use strict";

var validator = require("validator");
var Solicitud = require("../models/solicitud");
var fs = require("fs");

var controller = {
  correo: async (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");

    var params = req.body;

    var solicitud = new Solicitud();

    try {
      var validarNombre = !validator.isEmpty(params.nombre);
      var validarcorreo = !validator.isEmpty(params.correo);
      var validarcomentario = !validator.isEmpty(params.comentario);
    } catch (err) {
      return res.status(400).send({
        mensaje: "falta datos",
      });
    }
    if (validarNombre && validarcorreo && validarcomentario) {
      solicitud.nombre = params.nombre;
      solicitud.correo = params.correo;
      solicitud.comentario = params.comentario;

      await solicitud.save();

      return res.status(200).send({
        status: "sucess",
        solicitud,
      });
    }
  },

  getsolicitudes: async (req, res) => {
    var query = await Solicitud.find({});

    var last = req.params.last;

    if (last || last != undefined) {
      query.limit(4);
    }

    query.then((solicitud) => {
      if (!solicitud) {
        return res.status(404).send({
          status: "error",
          mensaje: "no hay articulo",
        });
      }
      return res.status(200).send({
        status: "exito",
        solicitud,
      });
    });
  },

  getsolicitud: async (req, res) => {
    var solicitudId = req.params.id;

    if (!solicitudId) {
      return res.status(400).send({
        error: " error",
        mensaje: "no existe el articulo",
      });
    }

    await Solicitud.findById(solicitudId).then((solicitud) => {
      return res.status(404).send({
        mensaje: "exito",
        solicitud,
      });
    });
  },
  update: async (req, res) => {
    var solicitudId = req.params.id;

    var params = req.body;

    try {
      var validarNombre = !validator.isEmpty(params.nombre);
      var validarCorreo = !validator.isEmpty(params.correo);
      var validarComentario = !validator.isEmpty(params.comentario);
    } catch (error) {
      return res.status(404).send({
        mensaje: "faltan datoS por enviar",
      });
    }
    if (validarNombre && validarCorreo && validarComentario) {
      await Solicitud.findOneAndUpdate({ _id: solicitudId }, params, {
        new: true,
      }).then((solicitudActualizada) => {
        if (!solicitudActualizada) {
          return res.status(500).send({
            mensaje: "faltan datos",
          });
        }
        return res.status(200).send({
          status: "sucess",
          solicitud: solicitudActualizada,
        });
      });
    } else {
      return res.status(200).send({
        mensaje: "la validación no es correcta",
      });
    }
  },
  delete: async (req, res) => {
    var solicitudId = req.params.id;

    await Solicitud.findOneAndDelete({ _id: solicitudId }).then(
      (solicitudBorrada) => {
        if (!solicitudBorrada) {
          return res.status(404).send({
            mensaje: "articulo no encontrado",
          });
        }
        return res.status(200).send({
          mensaje: "articulo borrado",
          solicitud: solicitudBorrada,
        });
      }
    );
  },
  upload: async (req, res) => {
    var solicitudId = req.params.id;
    var file_name = "imagen no subida";

    if (!req.files) {
      return res.status(404).send({
        mensaje: file_name,
      });
    }

    var file_path = req.files.archivo.path;
    var path_split = file_path.split("\\");
    var file_name = path_split[2];
    var path_extension = file_name.split(".");
    var path_final = path_extension[1];

    if (path_final != "docx" && path_final != "pdf") {
      fs.unlink(file_path, (err) => {
        return res.status(500).send({
          mensaje: "la extension de la imagen no es valida.",
        });
      });
    } else {
      await Solicitud.findOneAndUpdate(
        { _id: solicitudId },
        { file: file_name },
        { new: true }
      ).then((solicitudActualizada) => {
        if (!solicitudActualizada) {
          return res.status(404).send({ status: "error" });
        }

        return res.status(200).send({
          status: "SUCCESS",
          solicitudActualizada,
        });
      });
    }
  },
};

module.exports = controller;
