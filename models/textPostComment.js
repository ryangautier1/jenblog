const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const textPostCommentSchema = new Schema({
  textpost: 
    {
      type: Schema.Types.ObjectId,
      ref: "TextPost"
    },
  comments: [
    {
      author: { type: String, required: true },
      date: { type: Date, required: true },
      comment: { type: String, required: true }
    }
  ]
})

const ytComment = mongoose.model("textPostComment", textPostCommentSchema);

module.exports = ytComment;