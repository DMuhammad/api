import { v4 as uuidv4 } from "uuid";
import Comment from "../models/Comment.js";
import Like from "../models/Like.js";
import { formatDistanceToNow } from "date-fns";
import { id } from "date-fns/locale/index.js";

const addComment = (req, res) => {
  const { nama, hadir, komentar } = req.body;

  new Comment({
    uuid: uuidv4(),
    nama: nama,
    hadir: hadir,
    komentar: komentar,
  })
    .save()
    .then((comment) => {
      comment.own = uuidv4();
      res.status(201).json({ code: 201, data: comment });
    })
    .catch((err) => res.status(400).json({ error: err }));
};

const getAllComments = async (req, res) => {
  const { per, next } = req.query;

  Comment.find({})
    .sort({ created_at: -1 })
    .skip(next)
    .limit(per)
    .then((comments) => {
      const response = comments.map((comment) => {
        return Like.find({ comment_id: comment.uuid })
          .countDocuments()
          .then((count) => {
            comment.like.love = count;
            comment.created_at = formatDistanceToNow(
              new Date(Number(comment.created_at)),
              { addSuffix: true, includeSeconds: true, locale: id }
            );
          })
          .catch((err) => res.json({ error: err }));
      });

      return Promise.all(response).then(() => {
        res.status(200).json({ code: 200, data: comments });
      });
    })
    .catch((err) => res.status(400).json({ error: err }));
};

const getCommentById = (req, res) => {
  Comment.findOne({ uuid: req.params.id })
    .exec()
    .then((comment) => {
      comment.created_at = formatDistanceToNow(
        new Date(Number(comment.created_at)),
        { addSuffix: true, includeSeconds: true, locale: id }
      );
      res.status(200).json({ code: 200, data: comment });
    })
    .catch((err) => res.status(400).json({ error: err }));
};

const addLikeToSpesificComment = (req, res) => {
  const { id } = req.params;

  new Like({
    uuid: uuidv4(),
    comment_id: id,
  })
    .save()
    .then((like) => {
      res.status(201).json({ code: 201, data: like });
    })
    .catch((err) => res.status(401).json({ error: err }));
};

const removeLikeFromSpecificComment = (req, res) => {
  const { id } = req.params;

  Like.findOneAndDelete({ uuid: id })
    .then(() => {
      res.status(200).json({ code: 200, status: true });
    })
    .catch((err) => res.status(400).json({ error: err, status: false }));
};

export {
  addComment,
  getAllComments,
  getCommentById,
  addLikeToSpesificComment,
  removeLikeFromSpecificComment,
};
