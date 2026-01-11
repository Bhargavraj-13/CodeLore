import { loadProblemsByTopic, loadProblemById } from "../utils/codingProblemLoader.js";

// Get coding problems by topic
export const getProblemsByTopic = async (req, res) => {
  try {
    const { topicId } = req.params;

    const problems = loadProblemsByTopic(topicId);

    const safeProblems = problems.map((p) => ({
      id: p.id,
      title: p.title,
      difficulty: p.difficulty,
      description: p.description,
      starterCode: p.starterCode,
      sampleTestCases: p.sampleTestCases,
    }));

    res.status(200).json({
      success: true,
      topicId,
      problems: safeProblems,
    });
  } catch (err) {
    if (err.message === "TOPIC_NOT_FOUND") {
      return res.status(404).json({ message: "Topic not found" });
    }

    console.error("Get Coding Problems Error:", err);
    res.status(500).json({ message: "Failed to load coding problems" });
  }
};

// Get a particular coding problem by ID
export const getProblemById = async (req, res) => {
  try {
    const { problemId } = req.params;

    const p = loadProblemById(problemId);

    const safeProblem = {
      id: p.id,
      title: p.title,
      difficulty: p.difficulty,
      description: p.description,
      starterCode: p.starterCode,
      sampleTestCases: p.sampleTestCases,
      previewTestCases: p.testCases.slice(0, 2),
    };

    res.status(200).json({
      success: true,
      problem: safeProblem,
    });
  } catch (err) {
    if (err.message === "PROBLEM_NOT_FOUND") {
      return res.status(404).json({ message: "Problem not found" });
    }

    console.error("Get Coding Problem Error:", err);
    res.status(500).json({ message: "Failed to load problem" });
  }
};
