import User from "../models/User.js";
import Topic from "../models/Topic.js";
import { loadProblemsByTopic } from "../utils/codingProblemLoader.js";
import { loadQuizByTopic } from "../utils/quizLoader.js";

const QUIZ_PASS_THRESHOLD = 8;    // out of 10
const CODING_PASS_THRESHOLD = 2;  // out of 3

export const getExamResults = async (req, res) => {
  try {
    const { topicId } = req.params;
    const userId = req.user._id;

    // 1. Resolve the topic -> need contentKey for frontend routing
    // With this:
    const topic = await Topic.findOne({ contentKey: topicId }).select("title contentKey _id");
    if (!topic) {
        return res.status(404).json({ message: "Topic not found" });
    }

    // 2. Load totals from source files
    let quizTotal = 10; // default
    let codingTotal = 3; // default

    try {
      const quiz = loadQuizByTopic(topic.contentKey);
      quizTotal = quiz.questions.length;
    } catch {
      // quiz file missing -> use default
    }

    try {
      const problems = loadProblemsByTopic(topic.contentKey);
      codingTotal = problems.length;
    } catch {
      // coding folder missing -> use default
    }

    // 3. Load user's saved progress for this topic
    const user = await User.findById(userId).select("topics");

    const topicEntry = user.topics.find((t) => t.topicId.equals(topic._id));

    // If they haven't started the topic yet, return zeroed result
    const quizScore = topicEntry?.quizScore ?? 0;
    const codingSolvedCount = topicEntry?.codingSolvedCount ?? 0;

    // 4. Calculate percentages
    const quizPercent = Math.round((quizScore / quizTotal) * 100);
    const codingPercent = Math.round((codingSolvedCount / codingTotal) * 100);

    // Weighted overall: quiz 50%, coding 50%
    const overallPercent = Math.round((quizPercent + codingPercent) / 2);

    // 5. Pass/fail: both components must individually pass
    const passed =
      quizScore >= QUIZ_PASS_THRESHOLD &&
      codingSolvedCount >= CODING_PASS_THRESHOLD;

    // 6. Respond
    res.status(200).json({
      success: true,
      topicId: topic._id,
      contentKey: topic.contentKey,
      topicTitle: topic.title,
      quiz: {
        score: quizScore,
        total: quizTotal,
        percent: quizPercent,
        passed: quizScore >= QUIZ_PASS_THRESHOLD,
      },
      coding: {
        score: codingSolvedCount,
        total: codingTotal,
        percent: codingPercent,
        passed: codingSolvedCount >= CODING_PASS_THRESHOLD,
      },
      overall: {
        percent: overallPercent,
        passed,
      },
    });
  } catch (err) {
    console.error("Exam Results Error:", err);
    res.status(500).json({ message: "Failed to fetch exam results" });
  }
};
