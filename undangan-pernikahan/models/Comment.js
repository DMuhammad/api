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
  parent_id: {
    type: String,
    default: null,
  },
  comments: [{ type: mongoose.Schema.Types.Mixed, ref: "Comment" }],
});

export default mongoose.model("Comment", commentSchema);
