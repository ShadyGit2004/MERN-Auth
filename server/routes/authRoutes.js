const express = require("express");
const router = express.Router({mergeParams : true});

const authController = require("../controller/authController.js");
const userAuth = require("../middleware/userauth.js")

router.post("/register", authController.register);
router.post("/login", authController.login);
router.post("/logout", authController.logout);
router.post("/send-verify-otp", userAuth, authController.sendVerifyOtp);
router.post("/verify-account", userAuth, authController.verifyEmail);
router.get("/is-auth", userAuth, authController.isAuthenticated);
router.post("/send-reset-otp", authController.sendResetOtp);
router.post("/reset-password", authController.resetPassword);

module.exports.authRoutes = router;

