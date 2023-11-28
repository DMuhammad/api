import mongoose from "mongoose";
import "dotenv/config";
import app from "./app.js";

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(9000, () => {
      console.log("Your app is listening to port: 9000");
    });
  })
  .catch((err) => {
    console.error(err);
  });
