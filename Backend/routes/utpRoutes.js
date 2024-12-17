"use strict";

var express = require("express");
var controller = require("../controllers/utp");

const validateSchema = require("../middelwares/validator");
const { registerSchema, loginSchema } = require("../models/appvalidation");

var router = express.Router();

router.post(
  "/appregistro",
  // validateSchema(registerSchema),
  controller.registro
);
router.post("/applogin", validateSchema(loginSchema), controller.login);
router.post("/appverify", controller.verifyToken);

module.exports = router;
