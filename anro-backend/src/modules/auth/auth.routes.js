const express = require("express");
const router = express.Router();

const authController = require("./auth.controller");
const { protectAdmin } = require("../../middlewares/auth.middleware");

router.post("/login", authController.login);
router.get("/me", protectAdmin, authController.me);

module.exports = router;