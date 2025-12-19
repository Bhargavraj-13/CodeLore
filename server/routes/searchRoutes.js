import express from "express";
import { searchTopics } from "../controllers/searchController.js";

const router = express.Router();

// GET /api/search?q=arrays
// Search topics by title
router.get("/", searchTopics);

export default router;
