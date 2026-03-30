import User from "../models/User.js";

// Single source of truth for completion logic
const getTopicStatus = (topic) => {
  if (
    topic.quizScore !== null &&
    topic.quizScore >= 8 &&
    topic.codingSolvedCount >= 2
  ) {
    return "COMPLETED";
  }
  return "IN_PROGRESS";
};

export const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id)
      .select("username email profilePic topics")
      .populate("topics.topicId", "title difficulty contentKey");

    // FIX: sort by lastAccessedAt on the subdocument (where it actually lives)
    const myTopics = user.topics
      .sort((a, b) => new Date(b.lastAccessedAt) - new Date(a.lastAccessedAt))
      .map((t) => ({
        topicId: t.topicId._id,
        title: t.topicId.title,
        difficulty: t.topicId.difficulty,
        contentKey: t.topicId.contentKey,
        status: getTopicStatus(t),
        quizScore: t.quizScore,
        codingSolvedCount: t.codingSolvedCount,
        lastAccessedAt: t.lastAccessedAt,
      }));

    res.status(200).json({
      success: true,
      user: {
        username: user.username,
        email: user.email,
        profilePic: user.profilePic,
      },
      myTopics,
    });
  } catch (err) {
    console.error("Profile fetch error:", err);
    res.status(500).json({ message: "Failed to fetch profile" });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const { username, profilePic } = req.body;
    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (username) {
      user.username = username.trim();
    }

    if (profilePic !== undefined) {
      user.profilePic = profilePic;
    }

    await user.save();

    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      user: {
        username: user.username,
        email: user.email,
        profilePic: user.profilePic,
      },
    });
  } catch (err) {
    console.error("Update profile error:", err);
    res.status(500).json({ message: "Failed to update profile" });
  }
};
