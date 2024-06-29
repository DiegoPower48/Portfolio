var express = require("express");
var controller = require("../controllers/task");
const authRequired = require("../middelwares/validate");

var router = express.Router();

router.get("/tasks", authRequired, controller.getTasks);
router.get("/tasks/:id", authRequired, controller.getTask);
router.post("/tasks", authRequired, controller.createTask);
router.delete("/tasks/:id", authRequired, controller.deleteTask);
router.put("/tasks/:id", authRequired, controller.updateTask);

module.exports = router;
