const db = require('../models');

module.exports = {
  create: function(req, res) {
    db.TextPost
        .create(req.body)
        .then(dbModel => res.json(dbModel))
        .catch(err => res.status(422).json(err));
  },
  findTextPosts: function (req, res) {
    let query;
    // if query is not empty
    if (req.query.search !== undefined){
      // if the last character is an S
      // if (req.query.search.charAt(req.query.search.length-1) === "s") {
        
      // }
      if (req.query.search.length > 1) {
        query = req.query.search.map(item => new RegExp(item, 'i'));
      }
      db.TextPost
      .find({ $or:[ {title: { $in: query }}, {body: { $in: query }}, {tags: { $in: query }} ]})
      .then(dbModel => {
        res.json(dbModel);
      })
      .catch(err => res.status(422).json(err));
    }
    // if no search terms are given, return all videos for now
    else {
      db.TextPost
      .find(req.query)
      .then(dbModel => {
        res.json(dbModel);
      })
      .catch(err => res.status(422).json(err));
    }

    
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