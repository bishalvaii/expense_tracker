import cors from "cors";
import dotenv from "dotenv";
import express, { Application } from "express"; // Import Request and Response types
import mongoose from "mongoose";
import router from "./routes/router";

dotenv.config();

const app: Application = express();
app.use(cors());

interface ProcessEnv {
  MONGO_URI?: string;
  PORT?: string;
  JWT_SECRET?: string;
  JWT_REFRESH_TOKEN_EXPIRES_IN?: string;
  JWT_ACCESS_TOKEN_EXPIRES_IN?: string;
}

const { PORT, MONGO_URI } = process.env as ProcessEnv;

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

app.use("/api", router);
