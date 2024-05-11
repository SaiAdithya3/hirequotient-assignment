import express from "express";
import { getMessages, sendMessage } from "../controllers/messageController.js";
import checkuser from "../middleware/check.js";

const router = express.Router();

router.get("/:id", checkuser, getMessages);
router.post("/send/:id", checkuser, sendMessage);

export default router;