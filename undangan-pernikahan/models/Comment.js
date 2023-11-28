import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
  uuid: String,
  nama: String,
  hadir: Boolean,
  komentar: String,
  created_at: { type: String, default: Date.now },
  like: {
    love: {
      type: Number,
      default: 0,
    },
  },
});

export default mongoose.model("Comment", commentSchema);
