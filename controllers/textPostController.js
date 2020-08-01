const db = require('../models');

module.exports = {
  create: function(req, res) {
    db.TextPost
        .create(req.body)
        .then(dbModel => res.json(dbModel))
        .catch(err => res.status(422).json(err));
  },
  findAll: function(req, res) {
    db.TextPost
        .find(req.query)
        .then(dbModel => res.json(dbModel))
        .catch(err => res.status(422).json(err));
  },
  findById: function(req, res) {
    db.TextPost
        .findById({ _id: req.params.id })
        .then(dbModel => res.json(dbModel))
        .catch(err => res.status(422).json(err));
},
  remove: function(req, res) {
    db.TextPost
        .findById({ _id: req.params.id })
        .then(dbModel => dbModel.remove())
        .then(dbModel => res.json(dbModel))
        .catch(err => res.status(422).json(err));
  }
}