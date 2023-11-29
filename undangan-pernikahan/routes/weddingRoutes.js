import { Router } from "express";
import {
  addComment,
  addCommentToParent,
  addLikeToSpesificComment,
  getAllComments,
  getCommentById,
  removeLikeFromSpecificComment,
} from "../controllers/weddingController.js";

const weddingRoutes = Router();

weddingRoutes.get("/", getAllComments);
weddingRoutes.get("/:id", getCommentById);
weddingRoutes.post("/", addComment);
weddingRoutes.post("/comment", addCommentToParent);
weddingRoutes.post("/:id", addLikeToSpesificComment);
weddingRoutes.delete("/:id", removeLikeFromSpecificComment);

export default weddingRoutes;
