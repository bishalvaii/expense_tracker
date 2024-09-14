import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import User, { IUser } from "../models/User";

const generateHash = async (password: string) => {
  const salt = await bcrypt.genSalt(10);
  const pwd = await bcrypt.hash(password, salt);
  return pwd;
};

const generateToken = (user: IUser) => {
  return jwt.sign({ id: user._id }, secret, { expiresIn: "1h" });
};

dotenv.config();
const secret = process.env.JWT_SECRET || "secret";
console.log(secret);

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
    const token = generateToken(newUser);

    res.status(201).json({
      msg: "User registered successfully",
      token,
      data: {
        _id: newUser._id,
        username: newUser.username,
        email: newUser.email,
      },
    });
  } catch (err) {
    console.error("Error during user signup:", err);
    res.status(500).send("Server error");
  }
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const user: IUser | null = await User.findOne({ email });
    const isMatch = await bcrypt.compare(password, user?.password || "");

    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    if (!user) {
      return res.status(400).json({ msg: "User does not exist" });
    }

    const token = generateToken(user);
    res.status(200).json({
      msg: "User logged in successfully",
      token,
      user: {
        msg: "User logged in successfully",
        ...user.toJSON(),
        password: undefined,
      },
    });
  } catch (error: any) {
    res.status(400).json({ msg: error.message });
  }
};
