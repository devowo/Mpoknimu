const Episode = require("../models/episodes");
const Serie = require("../models/series");

module.exports = {
  index: async (req, res, next) => {
    try {
      // Get all the episodes
      const episode = await Episode.find({})
        .lean()
        .sort({ createdAt: -1 })
        .limit(9); // the correct order is -1
      //res.render("index", { episode: episode });
      //res.render('index', { name: 'John' });
      res.json(episode);
    } catch (err) {
      next(err);
    }
  },

  newEpisode: async (req, res, next) => {
    try {
      // 1. Find the actual anime
      const anime = await Serie.findById(req.body.anime);
      // 2. Create a new episode
      const newEpisode = req.body;
      delete newEpisode.anime;
      const episode = new Episode(newEpisode);
      episode.anime = anime;
      //anime.markModified('episode.anime');
      await episode.save();
      // 3. Add newly created episode to the actual anime
      anime.episodes.push(episode);
      //episode.markModified('anime.episodes');
      //anime.markModified('anime.serie');
      await anime.save();
      // We're done!
      res.json(episode);
     // res.redirect("/");
    } catch (err) {
      next(err);
    }
  },

  getEpisode: async (req, res, next) => {
    try {
      const episode = await Episode.findOne({ slug: req.params.slug });
      if (!episode) return next();
      res.json(episode)
      //res.render("show", { episode: episode });
    } catch (err) {
      next(err);
    }
  },

  /* getEpisode: async (req, res, next) => {
        const episode = await Episode.findById(req.params.episodeId);
        res.render('show', { episode: episode });
        //res.json(episode);
    }, */

  replaceEpisode: async (req, res, next) => {
    try {
      const { episodeId } = req.params;
      const newEpisode = req.body;
      const result = await Episode.findByIdAndUpdate(episodeId, newEpisode);
      res.json({ success: true });
    } catch (err) {
      next(err);
    }
  },

  updateEpisode: async (req, res, next) => {
    try {
      const { episodeId } = req.params;
      const newEpisode = req.body;
      const result = await Episode.findByIdAndUpdate(episodeId, newEpisode);
      //res.json({ success: true });
      res.redirect("/");
    } catch (err) {
      next(err);
    }
  },

  deleteEpisode: async (req, res, next) => {
    try {
      const { episodeId } = req.params;
      // Get a episode
      const episode = await Episode.findById(episodeId);
      if (!episode) {
        return res.status(404).json({ error: "Episode no existe" });
      }
      const animeId = episode.anime;
      // Get a anime
      const anime = await Serie.findById(animeId);
      // Remove the episode
      await episode.remove();
      // Remove episode from the anime's selling list
      console.log("anime", anime);
      anime.episodes.pull(episode);
      console.log("anime", anime);
      await anime.save();
      res.json({ success: true });
    } catch (err) {
      next(err);
    }
  }
};
