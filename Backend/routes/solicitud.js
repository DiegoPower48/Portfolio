"use strict";

var express = require("express");
var controller = require("../controllers/solicitud");
const authRequired = require("../middelwares/validate");

const validateSchema = require("../middelwares/validator");
const { registerSchema, loginSchema } = require("../models/validations");

var router = express.Router();

router.post("/correo", controller.correo);
router.post("/registro", validateSchema(registerSchema), controller.registro);
router.post("/loginin", validateSchema(loginSchema), controller.login);
router.post("/logout", controller.logout);
router.get("/profile", authRequired, controller.profile);
router.post("/verify", controller.verifyToken);

module.exports = router;
