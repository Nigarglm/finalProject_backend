import mongoose from "mongoose";

const CommentsSchema = new mongoose.Schema({
  comment:{
    type: String,
    required: true
  },
  userId: {
    type: String,
    required: true,
    unique: true
  },
  movieId: {
    type: String,
    required: true,
    unique: true
  }
});

export const Comments = mongoose.model("Comments", CommentsSchema);

export default Comments;