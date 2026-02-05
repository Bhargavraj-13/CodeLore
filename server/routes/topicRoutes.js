import express from "express";
import { createTopic, getAllTopics, getTopicById, updateTopicById, deleteTopicById } from "../controllers/topicController.js";
import { protect } from "../middleware/authMiddleware.js";
import { adminOnly } from "../middleware/adminMiddleware.js";

const router = express.Router();

// Admin-only routes
router.post("/", protect, adminOnly, createTopic);
router.put("/:id", protect, adminOnly, updateTopicById);
router.delete("/:id", protect, adminOnly, deleteTopicById);

// Public routes
router.get("/", getAllTopics);
router.get("/:id", getTopicById);

export default router;
