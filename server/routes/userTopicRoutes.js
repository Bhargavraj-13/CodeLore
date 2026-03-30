import express from "express";
import { markTopicAccessed } from "../controllers/userTopicController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/access", protect, markTopicAccessed);

export default router;
