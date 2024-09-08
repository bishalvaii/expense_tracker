import bcrypt from "bcryptjs";
import { Request, Response } from "express";
import User, { IUser } from "../models/User";

const generateHash = async (password: string) => {
  const salt = await bcrypt.genSalt(10);
  const pwd = await bcrypt.hash(password, salt);
  return pwd;
};

export const register = async (req: Request, res: Response) => {
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

    newUser.password = await generateHash(password);

    // Save the user to the database
    await newUser.save();

    res.status(201).json({ msg: "User registered successfully" });
  } catch (err) {
    console.error("Error during user signup:", err);
    res.status(500).send("Server error");
  }
};
export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    const isMatch = await bcrypt.compare(password, user?.password || "");
    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }
    res.status(200).json({ msg: "User logged in successfully", user });
  } catch (error: any) {
    res.status(400).json({ msg: error.message });
  }
};
