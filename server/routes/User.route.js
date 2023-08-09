import { Router } from "express";
import { createUser, requestVerifyToken, verifyAccount, resetPassword } from "../controllers/User.controller.js";

const router = Router()

router.post('/', createUser)
router.get("/verify/:id/:token", verifyAccount);
router.post('/password/reset/:id/:token', resetPassword)
router.post('/requestToken', requestVerifyToken)
export default router   