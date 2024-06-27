"use strict";

var express = require("express");
var controller = require("../controllers/solicitud");

var router = express.Router();

router.post("/correo", controller.correo);
router.post("/registro", controller.registro);
router.get("/loginin", controller.login);
module.exports = router;
