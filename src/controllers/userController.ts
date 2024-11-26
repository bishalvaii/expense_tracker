import { Request, Response } from "express";
import User from "../models/User";
// not implemented yet
export const deleteUser = async (req: Request, res: Response) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }
    console.log(user);
    return res.status(200).json({ msg: "User deleted successfully" });
  } catch (err: any) {
    console.error("Error during user deletion:", err);
    res.status(500).send(err?.message);
  }
};
