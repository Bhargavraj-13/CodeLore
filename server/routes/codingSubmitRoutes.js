import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { submitCodingSolution } from "../controllers/codingSubmitController.js";

const router = express.Router();

// Submit coding solution (protected)
router.post("/:problemId/submit",protect,submitCodingSolution);

export default router;
