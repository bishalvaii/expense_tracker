import { Router } from "express";
import { deleteUser } from "../controllers/userController";
import { authenticateToken } from "../middlewares/authMiddleware";

const router = Router();

router.delete("/:id", authenticateToken, deleteUser);

export default router;
