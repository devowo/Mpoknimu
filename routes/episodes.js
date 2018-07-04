const express = require("express");
const router = express.Router();
//const router = require("express-promise-router")();
const EpisodesController = require("../controllers/episodes");

router
  .route("/")
  .get(EpisodesController.index)
  .post(EpisodesController.newEpisode);

router
  .route("/:slug")
  .get(EpisodesController.getEpisode)
  /*   .put(EpisodesController.replaceEpisode)
  .patch(EpisodesController.updateEpisode) */
  .delete(EpisodesController.deleteEpisode);

router
  .route("/:episodeId")
  .put(EpisodesController.replaceEpisode)
  .patch(EpisodesController.updateEpisode);

module.exports = router;
