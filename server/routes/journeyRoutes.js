import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { allowJourneyIfCompleted } from "../middleware/journeyGuard.js";
import { createJourney } from "../controllers/journeyController.js";

const router = express.Router();

router.post(
  "/",
  protect,
  allowJourneyIfCompleted,
  createJourney
);

export default router;
