import express from "express";
import { getUsers, getConversations, changeUserStatus, getUserDetails } from "../controllers/userController.js";
import checkuser from "../middleware/check.js";
const router = express.Router();

router.get("/", getUsers);
router.post("/check", getConversations);
router.put('/status', changeUserStatus);
router.post('/details', getUserDetails);

export default router;