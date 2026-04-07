import User from "../models/User.js";
import Topic from "../models/Topic.js";

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

    const topic = await Topic.findOne({ contentKey: topicId }).select("_id");
    if (!topic) {
      return res.status(404).json({ message: "Topic not found" });
    }

    const user = await User.findById(userId);

    // FIX: find on subdocument
    const topicEntry = user.topics.find(
      (t) => t.topicId.toString() === topic._id.toString()
    );

    if (!topicEntry) {
      return res.status(400).json({
        message: "Topic not started. Open the topic before submitting quiz score.",
      });
    }

    // Best-score-only rule
    if (topicEntry.quizScore === null || score > topicEntry.quizScore) {
      topicEntry.quizScore = score;
    }

    // Mark completed if both thresholds met
    if (topicEntry.quizScore >= 8 && topicEntry.codingSolvedCount >= 2) {
      topicEntry.completed = true;
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
