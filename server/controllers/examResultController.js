import User from "../models/User.js";
import Topic from "../models/Topic.js";
import { loadProblemsByTopic } from "../utils/codingProblemLoader.js";
import { loadQuizByTopic } from "../utils/quizLoader.js";

const QUIZ_PASS_THRESHOLD = 8;
const CODING_PASS_THRESHOLD = 2;

export const getExamResults = async (req, res) => {
  try {
    const { topicId } = req.params;
    const userId = req.user._id;

    // ✅ FIX: topicId is always MongoDB _id — use findById
    const topic = await Topic.findById(topicId).select("title contentKey _id");
    if (!topic) {
      return res.status(404).json({ message: "Topic not found" });
    }

    // Load totals from source files
    let quizTotal = 10;
    let codingTotal = 3;

    try {
      const quiz = loadQuizByTopic(topic.contentKey);
      quizTotal = quiz.questions.length;
    } catch { /* use default */ }

    try {
      const problems = loadProblemsByTopic(topic.contentKey);
      codingTotal = problems.length;
    } catch { /* use default */ }

    // Load user progress
    const user = await User.findById(userId).select("topics");
    const topicEntry = user.topics.find((t) => t.topicId.equals(topic._id));

    const quizScore = topicEntry?.quizScore ?? 0;
    const codingSolvedCount = topicEntry?.codingSolvedCount ?? 0;

    // Calculate
    const quizPercent = Math.round((quizScore / quizTotal) * 100);
    const codingPercent = Math.round((codingSolvedCount / codingTotal) * 100);
    const overallPercent = Math.round((quizPercent + codingPercent) / 2);
    const passed = quizScore >= QUIZ_PASS_THRESHOLD && codingSolvedCount >= CODING_PASS_THRESHOLD;

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