import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import express, { Application, Request, Response } from "express"; // Import Request and Response types
import mongoose from "mongoose";
import User, { IUser } from "./models/User"; // Import IUser interface

dotenv.config();

const app: Application = express();

interface ProcessEnv {
  PORT?: string;
  MONGO_URI?: string;
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

app.post("/api/users/signup", async (req: Request, res: Response) => {
  const { username, email, password } = req.body;

  try {
    // Check if the user already exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: "User already exists" });
    }

    // Create a new user instance
    const newUser: IUser = new User({
      username,
      email,
      password,
    });

    // Encrypt the password before saving the user
    const salt = await bcrypt.genSalt(10);
    newUser.password = await bcrypt.hash(password, salt);

    // Save the user to the database
    await newUser.save();

    res.status(201).json({ msg: "User registered successfully" });
  } catch (err) {
    console.error("Error during user signup:", err);
    res.status(500).send("Server error");
  }
});
