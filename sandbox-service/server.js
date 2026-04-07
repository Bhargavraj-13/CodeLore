import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { runCode } from "./utils/codeRunner.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json({ limit: "200kb" }));

app.get("/health", (req, res) => {
  res.json({ ok: true, service: "sandbox-service" });
});

app.post("/execute", async (req, res) => {
  try {
    const authHeader = req.headers.authorization || "";
    const token = authHeader.replace("Bearer ", "");

    if (!process.env.SANDBOX_SHARED_SECRET || token !== process.env.SANDBOX_SHARED_SECRET) {
      return res.status(401).json({ message: "Unauthorized sandbox request" });
    }

    const { language, code, testCases } = req.body;

    if (!["cpp", "python"].includes(language)) {
      return res.status(400).json({ message: "Invalid language" });
    }

    if (typeof code !== "string" || !code.trim()) {
      return res.status(400).json({ message: "Code is required" });
    }

    if (!Array.isArray(testCases) || testCases.length === 0) {
      return res.status(400).json({ message: "At least one test case is required" });
    }

    if (testCases.length > 20) {
      return res.status(400).json({ message: "Too many test cases" });
    }

    const result = await runCode({ language, code, testCases });
    return res.json(result);
  } catch (err) {
    console.error("Sandbox execute error:", err);
    return res.status(500).json({
      message: "Sandbox execution failed",
      error: err.message,
    });
  }
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Sandbox service running on port ${PORT}`);
});