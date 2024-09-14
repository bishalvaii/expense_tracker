import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { IUser } from "../models/User";

dotenv.config();
const secret = process.env.JWT_SECRET || "secret";

const generateHash = async (password: string) => {
  const salt = await bcrypt.genSalt(10);
  const pwd = await bcrypt.hash(password, salt);
  return pwd;
};

const generateToken = (user: IUser) => {
  return jwt.sign({ id: user._id }, secret, { expiresIn: "1h" });
};

const verifyToken = (token: string) => {
  try {
    const decoded = jwt.verify(token, secret);
    return decoded;
  } catch (error: any) {
    if (error.name === "TokenExpiredError") {
      throw new Error("Token expired");
    }
    throw new Error("Invalid token");
  }
};

const decodeToken = (token: string) => {
  return jwt.decode(token);
};

export { decodeToken, generateHash, generateToken, verifyToken };
