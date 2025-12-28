import User from "../models/User.js";

export const updateCodingProgress = async (req, res) => {
  try {
    const { topicId, solvedCount } = req.body;
    const userId = req.user._id;

    if (!topicId || typeof solvedCount !== "number") {
      return res.status(400).json({
        message: "topicId and solvedCount are required",
      });
    }

    if (solvedCount < 0 || solvedCount > 3) {
      return res.status(400).json({
        message: "solvedCount must be between 0 and 3",
      });
    }

    const user = await User.findById(userId);

    const topicEntry = user.topics.find(
      (t) => t.topicId.toString() === topicId
    );

    if (!topicEntry) {
      return res.status(400).json({
        message: "Topic not started. Open the topic before updating coding progress.",
      });
    }

    // Best-progress-only rule
    if (solvedCount > topicEntry.codingSolvedCount) {
      topicEntry.codingSolvedCount = solvedCount;
    }

    await user.save();

    res.status(200).json({
      success: true,
      message: "Coding progress updated",
      codingSolvedCount: topicEntry.codingSolvedCount,
    });
  } catch (err) {
    console.error("Update Coding Progress Error:", err);
    res.status(500).json({ message: "Failed to update coding progress" });
  }
};
