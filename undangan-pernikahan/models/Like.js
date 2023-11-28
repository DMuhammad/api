import mongoose from "mongoose";

const likeSchema = new mongoose.Schema({
  uuid: String,
  comment_id: {
    type: String,
  },
});

export default mongoose.model("Like", likeSchema);
