import express from 'express';
import { sendMessage } from '../controllers/messageController.js';
import checkuser from '../middleware/check.js';
const router = express.Router();

router.post("/send/:id", checkuser, sendMessage);

export default router;