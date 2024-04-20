import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

import userRoute from "./routes/userRoute.js";

mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log("Database Connected");
  })
  .catch((err) => {
    console.log(err);
  });

const app = express();

app.listen(3000, () => {
  console.log("Server running on port 3000...");
});

app.use("/api/user", userRoute);
