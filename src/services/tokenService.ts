import jwt from "jsonwebtoken";
import { jwtConfig } from "../config/jwt";

interface IJwtPayload {
  id: string;
  email: string;
}

export const generateAccessToken = (payload: IJwtPayload): string => {
  const accessToken = jwt.sign(payload, jwtConfig.secret, {
    expiresIn: jwtConfig.accessTokenExpiresIn,
  });
  return accessToken;
};

export const generateRefreshToken = (payload: IJwtPayload): string => {
  const refreshToken = jwt.sign(payload, jwtConfig.secret, {
    expiresIn: jwtConfig.refreshTokenExpiresIn,
  });
  return refreshToken;
};

export const verifyAuthorizationToken = (token: string): IJwtPayload | null => {
  try {
    const payload = jwt.verify(token, jwtConfig.secret);
    return payload as IJwtPayload;
  } catch (error) {
    console.error(error);
    return null;
  }
};
