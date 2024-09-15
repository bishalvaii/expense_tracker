import bcrypt from "bcryptjs";
import { Request, Response } from "express";
import User from "../models/User";
import { verifyToken } from "../utils";

// TODO: handle user deletion properly
export const deleteUser = async (req: Request, res: Response) => {
  const password = req.body.password;
  const authHeader = req.headers?.authorization;
  const token = authHeader?.split(" ")[1];

  if (!token || token === "") return res.status(401).send("No token provided");

  try {
    const loggedinUser = verifyToken(token);
    console.log("Decoded Token:", loggedinUser);

    if (!loggedinUser) return res.status(401).send("Invalid token");
    if (loggedinUser.id !== req.params.id)
      return res.status(403).send("Forbidden");

    if (!password) return res.status(400).send("Password is required");

    const user = await User.findById(req.params.id);
    if (!user) {
      console.error("User not found for ID:", req.params.id);
      return res.status(404).send("User not found");
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) return res.status(400).send("Invalid password");

    // const deletedUser = await User.findByIdAndDelete(req.params.id);
    // console.log("Deleted User:", deletedUser);

    return res.status(200).send("User Deleted successfully");
  } catch (err) {
    console.error("Internal Error:", err);
    return res.status(500).send("Internal server error");
  }
};
