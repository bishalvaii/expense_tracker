import { Router } from "express";
import authroutes from "./auth.routes";

const router = Router();

router.use("/", authroutes);

export default router;
