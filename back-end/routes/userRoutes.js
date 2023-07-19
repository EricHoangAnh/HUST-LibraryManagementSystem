const express = require("express");
const userControler = require("../controller/userController");
const router = express.Router();

router.route("/signup").post(userControler.createUser);
router.route("/login").post(userControler.handleLogin)

router.route("/users").get(userControler.getAllUsers)
router.route("/user").get(userControler.getUser)
router.route("/user/:id").put(userControler.updateUser)

module.exports = router;
