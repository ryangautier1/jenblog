const db = require('../models');

module.exports = {
  findAll: function(req, res) {
    db.TextPostComment
      .find(req.query)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  getCommentsByPost: function(req, res) {
    db.TextPostComment
      .find({
        textpost: req.params.textpost
      })
      .then(dbModels => res.json(dbModels))
      .catch(err => res.status(422).json(err));
  },
  create: function(req, res) {
    db.TextPostComment
      .create(req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  update: function(req, res) {
    db.TextPostComment
      .findOneAndUpdate(
        { textpost: req.params.textpost },
        { $push: { comments: req.body }}
      )
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  remove: function(req, res) {
    db.TextPostComment
      .findById({ _id: req.params.id })
      .then(dbModel => dbModel.remove())
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  }
}