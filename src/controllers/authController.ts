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
    let user = await User.findOne({ email });
    console.log(user);
    if (user) {
      return res.status(409).json({ msg: "User already exists" });
    }

    const newUser: IUser = new User({
      username,
      email,
      password,
    });

    newUser.password = await generateHash(password);
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
    res.status(200).json({
      msg: "User logged in successfully",
      user: { _id: user?._id, username: user?.username, email: user?.email },
    });
  } catch (error: any) {
    res.status(400).json({ msg: error.message });
  }
};
