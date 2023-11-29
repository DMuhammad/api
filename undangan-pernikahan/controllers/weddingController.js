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
      const own = uuidv4();
      res.status(201).json({ code: 201, data: comment, own: own });
    })
    .catch((err) => res.status(400).json({ error: err }));
};

const addCommentToParent = (req, res) => {
  const { nama, komentar, id } = req.body;

  new Comment({
    uuid: uuidv4(),
    nama: nama,
    hadir: false,
    komentar: komentar,
    parent_id: id,
  })
    .save()
    .then((comment) => {
      const own = uuidv4();
      res.status(201).json({ code: 201, data: comment, own: own });
    })
    .catch((err) => res.status(400).json({ error: err }));
};

const getChildCommentsRecursive = async (parent_id) => {
  try {
    const childComments = await Comment.find({ parent_id: parent_id });
    const comments = [];

    for (const childComment of childComments) {
      const count = await Like.find({
        comment_id: childComment.uuid,
      }).countDocuments();
      childComment.like.love = count;

      childComment.created_at = formatDistanceToNow(
        new Date(Number(childComment.created_at)),
        { addSuffix: true, includeSeconds: true, locale: id }
      );

      const comment = childComment.toObject();
      const nestedChildComments = await getChildCommentsRecursive(
        childComment.uuid
      );

      comment.comments = nestedChildComments;
      comments.push(comment);
    }

    return comments;
  } catch (error) {
    console.error(error);
  }
};

const getAllComments = async (req, res) => {
  const { per, next } = req.query;

  try {
    const comments = await Comment.find({ parent_id: null })
      .sort({ created_at: -1 })
      .skip(next)
      .limit(per);

    await Promise.all(
      comments.map(async (comment) => {
        const childComments = await getChildCommentsRecursive(comment.uuid);
        comment.comments = childComments;

        const count = await Like.find({
          comment_id: comment.uuid,
        }).countDocuments();

        comment.like.love = count;
        comment.created_at = formatDistanceToNow(
          new Date(Number(comment.created_at)),
          { addSuffix: true, includeSeconds: true, locale: id }
        );
      })
    );

    res.status(200).json({ code: 200, data: comments });
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: error });
  }
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
  addCommentToParent,
  getAllComments,
  getCommentById,
  addLikeToSpesificComment,
  removeLikeFromSpecificComment,
};
