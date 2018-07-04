const Serie = require("../models/series");
const Episode = require("../models/episodes");

module.exports = {
  /* original code without page (you have to modify the routes leave it alone in /)
    index: async (req, res, next) => {
    const serie = await Serie.find({})
    .sort({ createdAt: -1 })
    .limit(9);
    res.render("series", {serie: serie});
  }, */


  index: async (req, res, next) => {
    const serie = await Serie.find({})
    .sort({ createdAt: -1 })
    res.json(serie);
  }, 

/*  
Uncomment this code to use the page with ejs
index: async (req, res, next) => {
    var perPage = 4;
    var page = req.params.page || 1;

    try {
      const serie = await Serie.find({})
        .sort({ createdAt: -1 })
        .skip(perPage * page - perPage)
        .limit(perPage)
        .lean()
        .exec(function(err, serie) {
          Serie.count().exec(function(err, count) {
            if (err) return next(err);
            res.render("series", {
              serie: serie,
              current: page,
              pages: Math.ceil(count / perPage)
            });
          });
        });
    } catch (err) {
      next(err);
    }
  }, */

  newSerie: async (req, res, next) => {
    try {
      const newSerie = new Serie(req.body);
      const serie = await newSerie.save();
      //res.render("addserie",{serie: serie})
      res.json(serie);
      //res.redirect("/users/dashboard");
    } catch (err) {
      next(err);
    }
  },
  //.lean(true) high performance .populate('episodes', 'slug -_id', null, {sort: { createdAt: -1 } });
  getSerie: async (req, res, next) => {
    try {
      const serie = await Serie.findOne({ slug: req.params.slug }).populate({
        path: "episodes",
        select: "slug -_id",
        //, match: { x: 1 },
        options: { sort: { createdAt: -1 }, limit: 9 }
      });
      if (!serie) return next();
      //res.render("anime", { serie: serie });
      res.json(serie);
    } catch (err) {
      next(err);
    }
  },
  /* getSerie: async (req, res, next) => {
        const { serieId } = req.params;
        const serie = await Serie.findById(serieId);
        res.render('anime', { serie: serie });
        //res.json(serie);
    },  */

  replaceSerie: async (req, res, next) => {
    // enforce that req.body must contain all the fields
    try {
      const { serieId } = req.params;
      const newSerie = req.body;
      const result = await Serie.findByIdAndUpdate(serieId, newSerie);
      res.json({ success: true });
    } catch (err) {
      next(err);
    }
  },
  updateSerie: async (req, res, next) => {
    try {
      // req.body may contain any number of fields
      const { serieId } = req.params;
      const newSerie = req.body;
      const result = await Serie.findByIdAndUpdate(serieId, newSerie);
      //res.json({ success: true });
      res.redirect("/");
    } catch (err) {
      next(err);
    }
  },

  //the same as getseries
  getSerieEpisodes: async (req, res, next) => {
    try {
      const { serieId } = req.params;
      const serie = await Serie.findById(serieId).populate("episodes");
      //res.render('episodes', { serie : serie });
      res.json(serie.episodes);
    } catch (err) {
      next(err);
    }
  },

  newSerieEpisode: async (req, res, next) => {
    try {
      const { serieId } = req.params;
      // Create a new episode
      const newEpisode = new Episode(req.body);
      // Get series
      const serie = await Serie.findById(serieId);
      // Assing serie as episode's anime
      newEpisode.anime = serie;
      // Save the episode
      await newEpisode.save();
      // Add episode to the serie's selling array 'episodes'
      serie.episodes.push(newEpisode);
      // Save the series
      await serie.save();
      res.json(newEpisode);
    } catch (err) {
      next(err);
    }
  }
};

/*
We can interact with mongoose in 3 different ways:
1) Callbacks
2) Promises
3) [X] Async/Await (Promises) - this use for the code
*/

//let is used to isolate a code even if they have the same name are two different variables
//const their values after declaring they can be changed as long as the parent object is called

/* Example promises:
 index: (req, res, next) => {
        Serie.find({})
            .then(series => {
                res.status(200).json // res.render(series)
            })
            .catch(err => {
                next(err);
            });
    },
*/
