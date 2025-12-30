import Journey from "../models/Journey.js";

export const createJourney = async (req, res) => {
  try {
    const { topicId, content } = req.body;
    const userId = req.user._id;

    if (!topicId || !content) {
      return res.status(400).json({
        message: "topicId and content are required",
      });
    }

    // Optional: basic length guard
    if (content.length > 2000) {
      return res.status(400).json({
        message: "Journey content is too long",
      });
    }

    const journey = await Journey.create({
      user: userId,
      topic: topicId,
      content,
    });

    res.status(201).json({
      success: true,
      message: "Journey created successfully",
      journeyId: journey._id,
    });
  } catch (err) {
    console.error("Create Journey Error:", err);
    res.status(500).json({ message: "Failed to create journey" });
  }
};