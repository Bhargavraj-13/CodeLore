import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { allowJourneyIfCompleted } from "../middleware/journeyGuard.js";
import { createJourney, getJourneysByTopic, getMyJourneys, editJourney } from "../controllers/journeyController.js";

const router = express.Router();

// Create a new journey (protected, with journey guard)
router.post(
  "/",
  protect,
  allowJourneyIfCompleted,
  createJourney
);

// Get journeys by topic
router.get(
  "/topic/:topicId",
  getJourneysByTopic
);

// Get my journeys (protected)
router.get(
  "/my",
  protect,
  getMyJourneys
);

// Edit a journey (protected)
router.patch(
  "/:journeyId",
  protect,
  editJourney
);

export default router;