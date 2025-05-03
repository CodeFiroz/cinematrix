import express from "express";
import { getCurrentUser, loginUser, logoutUser, registerUser, ResetPassword, sendResetLink } from "../controller/authController.js";
import protectRoute from "../Middleware/authMiddleware.js";

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/forgot-password', sendResetLink);
router.post('/reset-password/:token', ResetPassword);
router.get('/me', protectRoute, getCurrentUser);
router.get('/logout', logoutUser);

export default router;