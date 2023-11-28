import { Router } from "express";

const routes = Router();

routes.get("/wedding", (req, res) => {
  res.send("Hello World");
});

export default routes;
