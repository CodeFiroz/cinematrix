import express from "express";
import { loginUser, registerUser, sendResetLink } from "../controller/authController.js";

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/forgot-password', sendResetLink);

export default router;