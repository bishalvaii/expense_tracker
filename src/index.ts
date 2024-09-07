import dotenv from "dotenv";
import express, { Application } from "express";
import mongoose from "mongoose";

dotenv.config();

const app: Application = express();

interface ProcessEnv {
  PORT?: string;
  MONGO_URI?: string;
}

const { PORT = "5000", MONGO_URI } = process.env as ProcessEnv;

if (!MONGO_URI) {
  throw new Error("MONGO_URI is not defined in environment variables");
}

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("Database is connected");
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err: Error) => {
    console.error("Database connection error:", err.message);
  });

// Middleware
app.use(express.json());
