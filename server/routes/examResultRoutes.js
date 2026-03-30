import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { getExamResults } from "../controllers/examResultController.js";

const router = express.Router();

// GET /api/exam/:topicId/results
router.get("/:topicId/results", protect, getExamResults);

export default router;
