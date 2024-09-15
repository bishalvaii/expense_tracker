import bcrypt from "bcryptjs";
import "dotenv/config";
import jwt from "jsonwebtoken";
import { IUser } from "../models/User";

const secret = process.env.JWT_SECRET!;

const generateHash = async (password: string) => {
  const salt = await bcrypt.genSalt(10);
  const pwd = await bcrypt.hash(password, salt);
  return pwd;
};

const generateToken = (user: IUser) => {
  return jwt.sign({ id: user._id }, process.env.JWT_SECRET!, {
    expiresIn: "1h",
  });
};

const verifyToken = (token: string) => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);
    console.log(decoded);
    return decoded as { id: string };
  } catch (err) {
    return false;
  }
};

const decodeToken = (token: string) => {
  return jwt.decode(token);
};

export { decodeToken, generateHash, generateToken, verifyToken };

