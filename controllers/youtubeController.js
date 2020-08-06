const db = require('../models');

module.exports = {
  create: function (req, res) {
    db.Youtube
      .create(req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  findVideos: function (req, res) {

    // if query is not empty
    // if (req.query.search !== ""){
    //   // if the last character is an S
    //   if (req.query.search.charAt(req.query.search.length-1) === "s") {
        
    //   }
    // }

    db.Youtube
      .find({ title: { $regex: req.query.search, $options: 'i' } })
      .then(dbModel => {
        res.json(dbModel);
        console.log(req.query.title);
      })
      .catch(err => res.status(422).json(err));
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