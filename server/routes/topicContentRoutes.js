import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { getTopicContent } from "../controllers/topicContentController.js";

const router = express.Router();

router.get("/:topicId/content", protect, getTopicContent);

export default router;