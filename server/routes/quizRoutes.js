import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { getQuizByTopic, submitQuiz } from "../controllers/quizController.js";

const router = express.Router();

router.get("/:topicId", protect, getQuizByTopic);
router.post("/:topicId/submit", protect, submitQuiz);
export default router;
