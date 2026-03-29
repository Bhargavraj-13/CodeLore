import User from "../models/User.js";
import { loadProblemById } from "../utils/codingProblemLoader.js";
import { runCode } from "../utils/codeRunner.js";

export const submitCodingSolution = async (req, res) => {
  try {
    const { problemId } = req.params;
    const { code, language } = req.body;
    const userId = req.user._id;

    if (!code || !language) {
      return res.status(400).json({ message: "Code and language are required" });
    }

    if (!["cpp", "python"].includes(language)) {
      return res.status(400).json({ message: "Unsupported language" });
    }

    if (code.length > 10000) {
      return res.status(400).json({ message: "Code too long" });
    }

    // 1. Load problem
    const problem = loadProblemById(problemId);

    // 2. Execute against hidden test cases
    const executionResult = await runCode({
      language,
      code,
      testCases: problem.testCases,
    });

    // 3. FIX: update per-topic subdocument fields
    if (executionResult.status === "ACCEPTED") {
      const user = await User.findById(userId);

      const topicEntry = user.topics.find((t) =>
        t.topicId.equals(problem.topicId)
      );

      if (topicEntry) {
        // Only count each problem once
        if (!topicEntry.solvedProblems.includes(problem.id)) {
          topicEntry.solvedProblems.push(problem.id);
          topicEntry.codingSolvedCount += 1;
        }

        // Mark completed if both thresholds met
        if (topicEntry.quizScore >= 8 && topicEntry.codingSolvedCount >= 2) {
          topicEntry.completed = true;
        }
      }

      await user.save();
    }

    // 4. Send result back to frontend
    res.status(200).json({
      success: true,
      problemId,
      result: executionResult,
    });
  } catch (err) {
    console.error("Submit Coding Error:", err);
    res.status(500).json({ message: "Failed to submit coding solution" });
  }
};
