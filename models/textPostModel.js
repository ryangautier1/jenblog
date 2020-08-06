const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const textPostSchema = new Schema({
  title: { type: String, required: false },
  date: { type: Date, required: true},
  body: { type: String, required: true },
  tags: [{type: String}]
});

const TextPost = mongoose.model("TextPost", textPostSchema);

module.exports = TextPost;