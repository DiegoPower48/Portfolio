"use strict";

var express = require("express");

var controller = require("../controllers/webdata");

var router = express.Router();

router.get("/webdata", controller.data);

module.exports = router;
