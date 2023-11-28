import { Router } from "express";
import weddingRoutes from "./weddingRoutes.js";

const routes = Router();

routes.use("/wedding", weddingRoutes);

export default routes;
