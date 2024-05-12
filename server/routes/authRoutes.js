import express from 'express';
import { loginUser, logoutUser, signupUser, editProfile, changePassword } from '../controllers/authController.js';
const router = express.Router();

router.post("/login", loginUser);
router.post("/signup", signupUser);
router.post("/logout", logoutUser);
router.post("/edit-profile", editProfile);
router.post("/change-password", changePassword);

export default router;