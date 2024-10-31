"use strict";

var express = require("express");
var controller = require("../controllers/solicitud");

const validateSchema = require("../middelwares/validator");
const { registerSchema, loginSchema } = require("../models/validations");

var router = express.Router();

router.post("/correo", controller.correo);
router.post("/registro", validateSchema(registerSchema), controller.registro);
router.post("/loginin", validateSchema(loginSchema), controller.login);
router.post("/verify", controller.verifyToken);
router.get("/blocks", controller.blocks);
router.post("/editblock", controller.editblock);

module.exports = router;
