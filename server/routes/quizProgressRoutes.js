import express from "express";
import { updateQuizScore } from "../controllers/quizProgressController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.patch("/score", protect, updateQuizScore);

export default router;
