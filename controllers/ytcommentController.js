const db = require('../models');

module.exports = {
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
      .findOneAndUpdate({ _id: req.params.id }, req,body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  }
}