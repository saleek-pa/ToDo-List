const express = require("express");
const router = express.Router();
const controller = require("../controllers/adminController");

router.post("/login", controller.login);
router.get("/users", controller.viewUsers);
router.put("/users/:id/permission", controller.changePermission)

module.exports = router;