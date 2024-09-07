import { Request, Response } from "express";
import User from "../models/User";

export const register = async (req: Request, res: Response) => {
  const { userName, email, password } = req.body;

  try {
    await User.create({ username: userName, email, password });
    res.status(201).json({ message: "User created successfully" });
  } catch (error: any) {
    res.status(400).json({ msg: error.message });
  }
};
export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email, password });
    res.status(201).json({ user });
  } catch (error: any) {
    res.status(400).json({ msg: error.message });
  }
};
