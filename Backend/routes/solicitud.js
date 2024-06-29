"use strict";

var express = require("express");
var controller = require("../controllers/solicitud");
const authRequired = require("../middelwares/validate");

var router = express.Router();

router.post("/correo", controller.correo);
router.post("/registro", controller.registro);
router.post("/loginin", controller.login);
router.post("/logout", controller.logout);
router.get("/profile", authRequired, controller.profile);

module.exports = router;
