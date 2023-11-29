import { Router } from "express";
import {
  addComment,
  addCommentToParent,
  addLikeToSpesificComment,
  deleteComment,
  getAllComments,
  getCommentById,
  removeLikeFromSpecificComment,
  updateComment,
} from "../controllers/weddingController.js";

const weddingRoutes = Router();

weddingRoutes.get("/", getAllComments);
weddingRoutes.get("/:id", getCommentById);
weddingRoutes.post("/", addComment);
weddingRoutes.post("/comment", addCommentToParent);
weddingRoutes.put("/comment/:id", updateComment);
weddingRoutes.delete("/comment/:id", deleteComment);

weddingRoutes.post("/:id", addLikeToSpesificComment);
weddingRoutes.delete("/:id", removeLikeFromSpecificComment);

export default weddingRoutes;
