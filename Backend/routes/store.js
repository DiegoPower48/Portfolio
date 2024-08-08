var express = require("express");
var controller = require("../controllers/teddy");
const authRequired = require("../middelwares/validate");
const {
  registerSchema,
  loginSchema,
} = require("../models/teddyuservalidation");
const validateSchema = require("../middelwares/validator");

var router = express.Router();

router.post("/register", validateSchema(registerSchema), controller.registro);
router.post("/login", validateSchema(loginSchema), controller.login);
router.get("/store", controller.getTeddys);
router.get("/store/:id", controller.getTeddy);
router.get("/search/:teddy", controller.searchTeddy);
router.post("/store", controller.createTeddy);
router.put("/store/:user/:teddy", controller.deleteTeddy);
router.post("/carrito", controller.getcart);
router.put("/store", controller.addTeddy);
router.get("/profile", controller.profile);
router.post("/validate", controller.verifyToken);

module.exports = router;
