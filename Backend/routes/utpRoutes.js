"use strict";

var express = require("express");
var controller = require("../controllers/utp");

const validateSchema = require("../middelwares/validator");
const { registerSchema, loginSchema } = require("../models/appvalidation");

var router = express.Router();

router.post(
  "/appregistro",
  validateSchema(registerSchema),
  controller.registro
);
router.post("/applogin", controller.login);
router.post("/appverify", controller.verifyToken);
router.get("/appuserdata", controller.userData);
router.put("/appuseredit", controller.userEdit);

module.exports = router;
