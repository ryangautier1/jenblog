const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ytcommentSchema = new Schema({
  video: 
    {
      type: Schema.Types.ObjectId,
      ref: "Youtube"
    },
  comments: [
    {
      author: { type: String, required: true },
      date: { type: Date, required: true },
      comment: { type: String, required: true }
    }
  ]
})

const ytComment = mongoose.model("ytComment", ytcommentSchema);

module.exports = ytComment;