import { Router } from "express";
import { deleteUser } from "../controllers/userController";

const router = Router();

router.delete("/:id", deleteUser);

export default router;
