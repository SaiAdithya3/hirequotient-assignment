import express from "express";
import { getMessages, sendMessage } from "../controllers/messageController.js";
import checkuser from "../middleware/check.js";

const router = express.Router();

router.get("/:senderId/:recieverId", getMessages);
router.post("/send/:id", sendMessage);

export default router;