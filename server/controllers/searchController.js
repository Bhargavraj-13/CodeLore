import Topic from "../models/topic.js";

// Search topics (Home Page)
export const searchTopics = async (req, res) => {
  try {
    const { q } = req.query;

    if (!q || q.trim() === "") {
      return res.status(400).json({ message: "Search query is required." });
    }

    const topics = await Topic.find({
      title: { $regex: q, $options: "i" }
    }).sort({ title: 1 });

    return res.status(200).json(topics);

  } catch (err) {
    console.error("Search Topics Error:", err);
    return res.status(500).json({ message: "Server error while searching topics." });
  }
};
