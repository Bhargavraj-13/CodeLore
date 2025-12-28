import express from "express";
import { updateCodingProgress } from "../controllers/codingProgressController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.patch("/progress", protect, updateCodingProgress);

export default router;
