const express = require("express");
const router = express.Router();

const podcastController = require("./podcast.controller");
const { protectAdmin } = require("../../middlewares/auth.middleware");

router.get("/podcast/episodes", podcastController.getEpisodes);
router.get("/podcast/episodes/:slug", podcastController.getEpisodeBySlug);

router.get("/admin/podcast", protectAdmin, podcastController.getAdminEpisodes);
router.get("/admin/podcast/:id", protectAdmin, podcastController.getAdminEpisodeById);
router.post("/admin/podcast", protectAdmin, podcastController.createEpisode);
router.put("/admin/podcast/:id", protectAdmin, podcastController.updateEpisode);
router.delete("/admin/podcast/:id", protectAdmin, podcastController.deleteEpisode);
router.patch("/admin/podcast/:id/status", protectAdmin, podcastController.updateStatus);
router.patch("/admin/podcast/:id/feature", protectAdmin, podcastController.toggleFeatured);

module.exports = router;