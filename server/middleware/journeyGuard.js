import User from "../models/User.js";

const isTopicCompleted = (topic) => {
  return (
    topic.quizScore !== null &&
    topic.quizScore >= 80 &&
    topic.codingSolvedCount >= 2
  );
};

export const allowJourneyIfCompleted = async (req, res, next) => {
  try {
    const { topicId } = req.body;
    const userId = req.user._id;

    if (!topicId) {
      return res.status(400).json({ message: "topicId is required" });
    }

    const user = await User.findById(userId);

    const topicEntry = user.topics.find(
      (t) => t.topicId.toString() === topicId
    );

    if (!topicEntry) {
      return res.status(403).json({
        message: "Topic not started. Complete the topic to write a journey.",
      });
    }

    if (!isTopicCompleted(topicEntry)) {
      return res.status(403).json({
        message:
          "Topic not completed. Complete quiz and coding requirements first.",
      });
    }

    next();
  } catch (err) {
    console.error("Journey guard error:", err);
    res.status(500).json({ message: "Failed to validate journey permission" });
  }
};
