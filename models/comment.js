const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new Schema({
  postId: 
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

const Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;