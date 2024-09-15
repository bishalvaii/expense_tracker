import { Router } from "express";
import authroutes from "./auth.routes";
import userRoutes from "./user.routes";

const router = Router();

router.use("/", authroutes);
router.use("/user", userRoutes);

export default router;
