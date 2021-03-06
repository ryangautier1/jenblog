const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const youtubeSchema = new Schema({
  title: { type: String, required: true },
  date: { type: Date, required: true},
  video: { type: String, required: true },
  caption: { type: String},
  tags: [{type: String}]
});

const Youtube = mongoose.model("Youtube", youtubeSchema);

module.exports = Youtube;