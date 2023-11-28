import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import routes from "./routes/index.js";

const app = express();

app.use(cors({ origin: ["http://127.0.0.1:5500", process.env.PORT_VPS] }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/api", routes);

export default app;
