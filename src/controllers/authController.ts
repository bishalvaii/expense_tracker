import bcrypt from "bcryptjs";
import { Request, Response } from "express";
import User, { IUser } from "../models/User";
import {
  generateAccessToken,
  generateRefreshToken,
  verifyAuthorizationToken,
} from "../services/tokenService";
import { generateHash } from "../utils/hash";

export const register = async (req: Request, res: Response) => {
  const { username, email, password } = req.body;

  try {
    let user = await User.findOne({ email });
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

    res.status(201).json({
      msg: "User registered successfully",
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
    const user = await User.findOne({ email }).select("+password");
    const isMatch = await bcrypt.compare(password, user?.password || "");
    if (!user) {
      return res.status(400).json({ msg: "User does not exist" });
    }
    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    const payload = {
      id: user._id as string,
      email: user.email,
    };
    const accessToken = generateAccessToken(payload);
    const refreshToken = generateRefreshToken(payload);
    res.status(200).json({
      msg: "User logged in successfully",
      accessToken,
      refreshToken,
      user: {
        ...user.toJSON(),
        password: undefined,
      },
    });
  } catch (error: any) {
    res.status(400).json({ msg: error.message });
  }
};

export const refreshToken = async (req: Request, res: Response) => {
  const refreshToken = req.body.refreshToken;
  if (!refreshToken) {
    return res.status(401).json({ msg: "Access denied, token missing!" });
  }
  try {
    const user = verifyAuthorizationToken(refreshToken);
    if (!user) {
      return res.status(401).json({ msg: "Invalid token" });
    }
    const userExists = await User.findById(user.id);
    if (!userExists) {
      return res.status(404).json({ msg: "User not found" });
    }
    const payload = {
      id: user.id,
      email: user.email,
    };
    const accessToken = generateAccessToken(payload);
    res.status(200).json({ msg: "Token refreshed", accessToken });
  } catch (error: any) {
    res.status(400).json({ msg: error.message });
  }
};