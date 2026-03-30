import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { runCode } from "../utils/codeRunner.js";

const router = express.Router();

router.post("/run", protect, async (req, res) => {
  try {
    const result = await runCode(req.body);
    res.json(result);
  } catch (err) {
    res.status(500).json({
      error: err.message || "Code execution failed",
    });
  }
});

export default router;
