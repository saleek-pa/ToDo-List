const express = require("express");
const router = express.Router();
const controller = require("../controllers/userController");
const checkPermission = require("../middleware/checkPermission");

router.post("/login", controller.login);
router.get("/todo", checkPermission(1), controller.viewTask);
router.post("/todo", checkPermission(2), controller.addTask);
router.delete("/todo/:id", checkPermission(3), controller.deleteTask);

module.exports = router;
