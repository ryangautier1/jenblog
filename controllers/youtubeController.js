const db = require('../models');

module.exports = {
  create: function (req, res) {
    db.Youtube
      .create(req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  findVideos: function (req, res) {
    console.log(req.query.search);
    // console.log(req.query.search);
    let query;
    // if query is not empty
    if (req.query.search !== undefined){
      // if the last character is an S
      // if (req.query.search.charAt(req.query.search.length-1) === "s") {
        
      // }
      if (req.query.search.length > 1) {
        query = req.query.search.map(item => new RegExp(item, 'i'));
      }
      db.Youtube
      .find({ title: { $in: query } })
      .then(dbModel => {
        res.json(dbModel);
        console.log(query);
      })
      .catch(err => res.status(422).json(err));
    }
    else {
      db.Youtube
      .find(req.query)
      .then(dbModel => {
        res.json(dbModel);
        console.log(query);
      })
      .catch(err => res.status(422).json(err));
    }

    
  },
  findById: function (req, res) {
    db.Youtube
      .findById({ _id: req.params.id })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  remove: function (req, res) {
    db.Youtube
      .findById({ _id: req.params.id })
      .then(dbModel => dbModel.remove())
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  }
}