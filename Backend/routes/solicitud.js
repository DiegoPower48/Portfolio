"use strict";

var express = require("express");
var controller = require("../controllers/solicitud");

var router = express.Router();

router.post("/correo", controller.correo);
module.exports = router;
