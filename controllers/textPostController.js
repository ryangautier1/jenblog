const db = require('../models');

module.exports = {
  create: function(req, res) {
    db.TextPost
        .create(req.body)
        .then(dbModel => res.json(dbModel))
        .catch(err => res.status(422).json(err));
  },
  findTextPosts: function (req, res) {
    // define limit to be 10 unless otherwise specified
    let limit;
    if (req.query.limit) {
      limit = parseInt(req.query.limit);
    }
    else {
      limit = 10;
    }

    let query = [];
    // if query is not empty
    if (req.query.search !== undefined){
     
      if (req.query.search.length >= 1) {
        req.query.search.map(item => {

          // if the last character is an S
          if (item.charAt(item.length - 1) === "s") {
            query.push(new RegExp(item.substring(0, item.length - 1), 'i'));
          }
          query.push(new RegExp(item, 'i'));
        }
        )
      }
      db.TextPost
      .find({ $or:[ {title: { $in: query }}, {body: { $in: query }}, {tags: { $in: query }} ]})
      .limit(limit)
      .skip(parseInt(req.query.skip))
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