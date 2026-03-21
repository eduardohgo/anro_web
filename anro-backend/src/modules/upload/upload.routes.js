const express = require("express");
const router = express.Router();

const { protectAdmin } = require("../../middlewares/auth.middleware");
const { uploadPodcastImage } = require("./upload.middleware");
const uploadController = require("./upload.controller");

router.post(
  "/admin/uploads/podcast-image",
  protectAdmin,
  uploadPodcastImage.single("image"),
  uploadController.uploadImage
);

module.exports = router;