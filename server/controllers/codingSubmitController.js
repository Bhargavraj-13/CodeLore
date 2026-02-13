// server/controllers/codingSubmitController.js

import User from "../models/User.js";
import { loadProblemById } from "../utils/codingProblemLoader.js";
import { runCode } from "../utils/codeRunner.js";

export const submitCodingSolution = async (req, res) => {
  try {
    const { problemId } = req.params;
    const { code, language } = req.body;
    const userId = req.user._id;

    if (!code || !language) {
      return res.status(400).json({
        message: "Code and language are required",
      });
    }

    // Basic language support check
    if (!["cpp", "python"].includes(language)) {
        return res.status(400).json({
            message: "Unsupported language",
        });
    }

    // Basic code length check
    if (code.length > 10000) {
        return res.status(400).json({
            message: "Code too long",
        });
    }


    // 1. Load problem
    const problem = loadProblemById(problemId);

    // 2. Execute against HIDDEN test cases
    const executionResult = await runCode({
      language,
      code,
      testCases: problem.testCases,
    });

    // 3. If ACCEPTED, update user's coding progress
    if (executionResult.status === "ACCEPTED") {
  const user = await User.findById(userId);

  const topicProgress = user.topics.find((t) =>
    t.topicId.equals(problem.topicId)
  );

  if (topicProgress) {
    if (!topicProgress.solvedProblems.includes(problem.id)) {
      topicProgress.solvedProblems.push(problem.id);
      topicProgress.codingSolvedCount += 1;
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
    res.status(500).json({
      message: "Failed to submit coding solution",
    });
  }
};
