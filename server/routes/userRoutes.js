import express from "express";
import { getUsers, getConversations, changeUserStatus } from "../controllers/userController.js";
import checkuser from "../middleware/check.js";
const router = express.Router();

router.get("/", getUsers);
router.post("/check", getConversations);
router.put('/users/status', changeUserStatus);

export default router;