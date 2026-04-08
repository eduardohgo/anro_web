const express = require("express");

const publicController = require("./public.controller");

const router = express.Router();

router.get("/public/home", publicController.getHomeContent);

module.exports = router;
