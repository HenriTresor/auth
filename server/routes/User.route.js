import { Router } from "express";
import { createUser, verifyAccount } from "../controllers/User.controller.js";

const router = Router()

router.post('/', createUser)
router.get("/verify/:id/:token", verifyAccount);
export default router   