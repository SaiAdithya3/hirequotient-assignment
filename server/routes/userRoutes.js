import express from "express";
import { getUsers, getConversations } from "../controllers/userController.js";
import checkuser from "../middleware/check.js";
const router = express.Router();

router.get("/", getUsers);
router.post("/check", getConversations);

export default router;