import User from "../models/User.js";
import Topic from "../models/Topic.js";

export const markTopicAccessed = async (req, res) => {
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

    // FIX: ObjectId-safe comparison
    const existingTopic = user.topics.find(
      (t) => t.topicId.equals(topic._id) 
    );

    if (existingTopic) {
      existingTopic.lastAccessedAt = new Date();
    } else {
      user.topics.push({topicId: topic._id});
    }

    await user.save();

    res.status(200).json({
      success: true,
      message: "Topic marked as accessed",
    });
  } catch (err) {
    console.error("Mark Topic Access Error:", err);
    res.status(500).json({ message: "Failed to mark topic as accessed" });
  }
};
