import { Router } from "express";
import { login, refreshToken, register } from "../controllers/authController";

const router = Router();

router.post("/signup", register);
router.post("/login", login);
router.post("/refresh-token", refreshToken);

export default router;
