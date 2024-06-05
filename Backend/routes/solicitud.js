"use strict";

var express = require("express");
var controller = require("../controllers/solicitud");

var router = express.Router();

var multipart = require("connect-multiparty");
var md_upload = multipart({ uploadDir: "./upload/solicitudes" });

router.post("/correo", controller.correo);
router.get("/solicitudes/:last?", controller.getsolicitudes);
router.get("/solicitud/:id", controller.getsolicitud);
router.put("/solicitud/:id", controller.update);
router.delete("/solicitud/:id", controller.delete);

router.post("/subir/:id", md_upload, controller.upload);

module.exports = router;
