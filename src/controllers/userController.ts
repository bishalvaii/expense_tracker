import { Request, Response } from "express";
import { verifyToken } from "../utils";
// not implemented yet
export const deleteUser = async (req: Request, res: Response) => {
  const authHeader = req.headers?.authorization;
  const token = authHeader?.split(" ")[1];
  console.log("bear:", token);

  if (!token || token === "") {
    return res.status(401).json({ msg: "No token provided" });
  }
  try {
    const decoded = verifyToken(token);
    console.log("decoto", decoded);
    // const user = await User.findById(req.params.id);
    // if (!user) {
    //   return res.status(404).json({ msg: "User not found" });
    // }

    return res.status(200).json({ msg: "User deleted successfully" });
  } catch (err: any) {
    console.error("Error during user deletion:", err);
    res.status(500).send(err?.message);
  }
};
