import { Router } from "express";
import { login, register } from "../controllers/authController";

const router = Router();

router.post("/signup", register);
router.post("/login", login);

export default router;
// app.post("/api/users", async (req: Request, res: Response) => );
