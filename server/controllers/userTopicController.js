import User from "../models/User.js";

export const markTopicAccessed = async (req, res) => {
  try {
    const { topicId } = req.body;
    const userId = req.user._id;

    if (!topicId) {
      return res.status(400).json({ message: "topicId is required" });
    }

    const user = await User.findById(userId);

    // Check if topic already exists in user's list
    const existingTopic = user.topics.find(
      (t) => t.topicId.toString() === topicId
    );

    if (existingTopic) {
      // Update last accessed time
      existingTopic.lastAccessedAt = new Date();
    } else {
      // Add new topic
      user.topics.push({
        topicId,
      });
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
