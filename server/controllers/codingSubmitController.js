import User from "../models/User.js";
import Topic from "../models/Topic.js";
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

    const problem = loadProblemById(problemId);

    if (!problem) {
      return res.status(404).json({ message: "Problem not found" });
    }

    const executionResult = await runCode({
      language,
      code,
      testCases: problem.testCases,
    });

    if (executionResult.status === "ACCEPTED") {
      const user = await User.findById(userId);

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      const topic = await Topic.findOne({ contentKey: problem.topicId }).select("_id");

      if (topic) {
        const topicEntry = user.topics.find((t) => t.topicId.equals(topic._id));

        if (topicEntry) {
          const alreadySolved = topicEntry.solvedProblems
            .map(String)
            .includes(String(problem.id));

          if (!alreadySolved) {
            topicEntry.solvedProblems.push(problem.id);
            topicEntry.codingSolvedCount += 1;
          }

          if (topicEntry.quizScore >= 8 && topicEntry.codingSolvedCount >= 2) {
            topicEntry.completed = true;
          }
        }

        await user.save();
      }
    }

    return res.status(200).json({
      success: true,
      problemId,
      result: executionResult,
    });
  } catch (err) {
    console.error("Submit Coding Error:", err);
    return res.status(500).json({ message: "Failed to submit coding solution" });
  }
};