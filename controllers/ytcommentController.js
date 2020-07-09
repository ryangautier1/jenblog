const db = require('../models');

module.exports = {
  findAll: function(req, res) {
    db.ytComment
        .find(req.query)
        .then(dbModel => res.json(dbModel))
        .catch(err => res.status(422).json(err));
  },
  getCommentsByVideo: function(req, res) {
    db.ytComment
      .find({
        video: req.params.video
      })
      .then(dbModels => res.json(dbModels))
      .catch(err => res.status(422).json(err));
  },
  create: function(req, res) {
    db.ytComment
        .create(req.body)
        .then(dbModel => res.json(dbModel))
        .catch(err => res.status(422).json(err));
  },
  update: function(req,res) {
    db.ytComment
      .findOneAndUpdate(
        { video: req.params.video },
        { $push: {comments: req.body}}
      )
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  }
}