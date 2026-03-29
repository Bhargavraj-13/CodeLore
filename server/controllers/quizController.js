// server/controllers/quizController.js

import User from "../models/User.js";
import { loadQuizByTopic } from "../utils/quizLoader.js";

export const getQuizByTopic = async (req, res) => {
  try {
    const { topicId } = req.params;

    const quiz = loadQuizByTopic(topicId);

    // Strip correct answers before sending to frontend
    const safeQuestions = quiz.questions.map((q) => ({
      id: q.id,
      question: q.question,
      code: q.code ?? null,
      options: q.options,
      ...(q.code ? { code: q.code } : {}), // include code block if present
    }));

    res.status(200).json({
      success: true,
      topicId,
      totalQuestions: safeQuestions.length,
      questions: safeQuestions,
    });
  } catch (err) {
    if (err.message === "QUIZ_NOT_FOUND") {
      return res.status(404).json({ message: "Quiz not found for this topic" });
    }
    if (err.message === "QUIZ_FILE_MISSING") {
      return res.status(500).json({ message: "Quiz file missing on server" });
    }
    console.error("Get Quiz Error:", err);
    res.status(500).json({ message: "Failed to load quiz" });
  }
};

export const submitQuiz = async (req, res) => {
  try {
    const { topicId } = req.params;
    const { answers } = req.body;
    const userId = req.user._id;

    if (!answers || typeof answers !== "object") {
      return res.status(400).json({ message: "Answers are required" });
    }

    const quiz = loadQuizByTopic(topicId);

    let correctCount = 0;

    const results = quiz.questions.map((q) => {
      const selected = answers[q.id];
      const hasAnswered = Object.prototype.hasOwnProperty.call(answers, q.id);
      const isCorrect = hasAnswered && answers[q.id] === q.correctOption;

      if (isCorrect) correctCount++;

      return {
        questionId: q.id,
        question: q.question,
        options: q.options,
        selectedOptionIndex: selected ?? null,
        correctOption: q.correctOption,
        isCorrect,
      };
    });

    const totalQuestions = quiz.questions.length;

    // FIX: define score consistently as correctCount (out of totalQuestions)
    const score = correctCount;
    const percent = Math.round((correctCount / totalQuestions) * 100);

    // FIX: save to per-topic subdocument, not top-level
    const user = await User.findById(userId);

    const topicEntry = user.topics.find((t) => t.topicId.equals(topicId));

    if (topicEntry) {
      // Best-score-only rule
      if (topicEntry.quizScore === null || score > topicEntry.quizScore) {
        topicEntry.quizScore = score;
      }

      // Mark completed if both thresholds met
      if (topicEntry.quizScore >= 8 && topicEntry.codingSolvedCount >= 2) {
        topicEntry.completed = true;
      }
    }

    await user.save();

    res.status(200).json({
      success: true,
      score,
      percent,
      correctCount,
      totalQuestions,
      results,
    });
  } catch (err) {
    console.error("Submit Quiz Error:", err);
    res.status(500).json({ message: "Failed to submit quiz" });
  }
};
