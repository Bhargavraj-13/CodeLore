import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import {getProblemById, getProblemsByTopic } from "../controllers/codingController.js";

const router = express.Router();

// List problems for a topic
router.get("/:topicId", protect, getProblemsByTopic);

// Get single problem
router.get("/problem/:problemId", protect, getProblemById);

export default router;
