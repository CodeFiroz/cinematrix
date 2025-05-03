import express from "express";
import { loginUser, registerUser, ResetPassword, sendResetLink } from "../controller/authController.js";

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/forgot-password', sendResetLink);
router.post('/reset-password/:token', ResetPassword);

export default router;