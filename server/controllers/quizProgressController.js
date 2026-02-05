import User from "../models/User.js";

export const updateQuizScore = async (req, res) => {
  try {
    const { topicId, score } = req.body;
    const userId = req.user._id;

    if (!topicId || typeof score !== "number") {
      return res.status(400).json({ message: "topicId and numeric score are required" });
    }

    if (score < 0 || score > 10) {
      return res.status(400).json({ message: "Score must be between 0 and 10" });
    }

    const user = await User.findById(userId);

    // Find topic entry
    const topicEntry = user.topics.find(
      (t) => t.topicId.toString() === topicId
    );

    // Topic must be started first (opened)
    if (!topicEntry) {
      return res.status(400).json({
        message: "Topic not started. Open the topic before submitting quiz score.",
      });
    }

    // Best-score-only rule
    if (topicEntry.quizScore === null || score > topicEntry.quizScore) {
      topicEntry.quizScore = score;
    }

    await user.save();

    res.status(200).json({
      success: true,
      message: "Quiz score processed",
      bestScore: topicEntry.quizScore,
    });
  } catch (err) {
    console.error("Update Quiz Score Error:", err);
    res.status(500).json({ message: "Failed to update quiz score" });
  }
};
