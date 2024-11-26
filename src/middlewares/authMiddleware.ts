import { NextFunction, Request, Response } from "express";
import { verifyAuthorizationToken } from "../services/tokenService";

export const authenticateToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) {
    res.status(401).send({
      error: "Unauthorized access",
    });
    return;
  }
  const decoded = verifyAuthorizationToken(token);
  if (!decoded) {
    res.status(403).send({
      error: "Invalid or expired token",
    });
    return;
  }
  req.body.user = decoded;

  next();
};
