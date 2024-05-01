import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

import userRoute from "./routes/userRoute.js";
import authRoute from "./routes/authRoute.js";

mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log("Database Connected");
  })
  .catch((err) => {
    console.log(err);
  });

const app = express();

app.use(express.json());

app.listen(3000, () => {
  console.log("Server running on port 3000...");
});

app.use("/api/user", userRoute);
app.use("/api/auth/", authRoute);

app.use((err, req, res, next) => {
  const statuscode = err.statuscode || 500;
  const message = err.message || "Internel server error";
  res.status(statuscode).json({
    success: false,
    statuscode,
    message,
  });
});
