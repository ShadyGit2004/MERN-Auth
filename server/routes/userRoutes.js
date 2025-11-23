const express = require("express");
const router = express.Router();

const userAuth = require("../middleware/userauth.js");
const userController = require("../controller/userController.js");

router.get("/data", userAuth, userController.getUserData);

module.exports.userRoutes = router;