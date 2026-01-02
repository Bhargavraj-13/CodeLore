import User from "../models/User.js";
import { loadQuizByTopic } from "../utils/quizLoader.js";

export const getQuizByTopic = async (req, res) => {
  try {
    const { topicId } = req.params;

    const quiz = loadQuizByTopic(topicId);

    // Remove correct answers before sending to frontend
    const safeQuestions = quiz.questions.map((q) => ({
      id: q.id,
      question: q.question,
      options: q.options,
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
      const isCorrect = selected === q.correctOptionIndex;

      if (isCorrect) correctCount++;

      return {
        questionId: q.id,
        question: q.question,
        options: q.options,
        selectedOptionIndex: selected ?? null,
        correctOptionIndex: q.correctOptionIndex,
        isCorrect,
      };
    });

    const totalQuestions = quiz.questions.length;
    const score = Math.round((correctCount / totalQuestions) * 100);

    // ---- Update BEST quiz score only ----
    const user = await User.findById(userId);

    const topicProgress = user.topics.find((t) =>
      t.topicId.equals(topicId)
    );

    if (topicProgress) {
      topicProgress.quizScore = Math.max(
        topicProgress.quizScore ?? 0,
        score
      );
    }

    await user.save();

    res.status(200).json({
      success: true,
      score,
      correctCount,
      totalQuestions,
      results,
    });
  } catch (err) {
    console.error("Submit Quiz Error:", err);
    res.status(500).json({ message: "Failed to submit quiz" });
  }
};
