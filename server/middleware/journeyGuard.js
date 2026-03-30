import User from "../models/User.js";
import Topic from "../models/Topic.js";

const isTopicCompleted = (topic) =>
  topic.quizScore !== null &&
  topic.quizScore >= 8 &&
  topic.codingSolvedCount >= 2;

export const allowJourneyIfCompleted = async (req, res, next) => {
  try {
    const { topicId } = req.body;
    const userId = req.user._id;

    if (!topicId) {
      return res.status(400).json({ message: "topicId is required" });
    }

    const topic = await Topic.findOne({ contentKey: topicId }).select("_id");
    if (!topic) {
      return res.status(404).json({ message: "Topic not found" });
    }

    const user = await User.findById(userId);

    const topicEntry = user.topics.find(
      (t) => t.topicId.equals(topic._id)
    );

    if (!topicEntry) {
      return res.status(403).json({
        message: "Topic not started. Complete the topic to write a journey.",
      });
    }

    if (!isTopicCompleted(topicEntry)) {
      return res.status(403).json({
        message:
          "Topic not completed. Score at least 8/10 on the quiz and solve 2 coding problems first.",
      });
    }

    next();
  } catch (err) {
    console.error("Journey guard error:", err);
    res.status(500).json({ message: "Failed to validate journey permission" });
  }
};
