import express from "express";
import { getMessages, sendMessage } from "../controllers/messageController.js";
import checkuser from "../middleware/check.js";
import { botMessage } from "../controllers/geminiResponse.js";

const router = express.Router();

router.get("/:senderId/:recieverId", getMessages);
router.post("/send/:id", sendMessage);
router.post("/bot-message", botMessage);

export default router;