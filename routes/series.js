const express = require("express");
const router = express.Router();
//const router = require("express-promise-router")(); // Elimina la necesidad de usar try catch

const SeriesController = require("../controllers/series");
//const { validateParam, validateBody, schemas } = require('../helpers/routeHelper');


/* router
.route("/")
.post(SeriesController.newSerie);
 */

router
  .route("/:page")
  .get(SeriesController.index)
  .post(SeriesController.newSerie);
  
router
.route("/:page/:slug")
.get(SeriesController.getSerie);
/*.put(SeriesController.replaceSerie)
  .patch(SeriesController.updateSerie);
 .delete(); */
router
  .route("/:serieId")
  .put(SeriesController.replaceSerie)
  .patch(SeriesController.updateSerie);

router
  .route("/:serieId/episodes")
  .get(SeriesController.getSerieEpisodes)
  .post(SeriesController.newSerieEpisode);

module.exports = router;
