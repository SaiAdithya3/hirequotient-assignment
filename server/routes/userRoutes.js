import express from "express";
import { getUsers } from "../controllers/userController.js";
import checkuser from "../middleware/check.js";
const router = express.Router();

router.get("/", getUsers);

export default router;