import express from "express";
import { getUsers } from "../controllers/userController.js";
import checkuser from "../middleware/check.js";
const router = express.Router();

router.get("/", checkuser, getUsers);

export default router;