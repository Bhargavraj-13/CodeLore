import Journey from "../models/Journey.js";
import Topic from "../models/Topic.js";

export const createJourney = async (req, res) => {
  try {
    const { topicId, title, content } = req.body;
    const userId = req.user._id; 

    if (!topicId || !title || !content) {
      return res.status(400).json({ message: "topicId, title, and content are required" });
    }
    if (title.length > 100) {
      return res.status(400).json({ message: "Title cannot exceed 100 characters" });
    }
    if (content.length < 50) {
      return res.status(400).json({ message: "Journey content is too short" });
    }
    if (content.length > 2000) {
      return res.status(400).json({ message: "Journey content is too long" });
    }

     const topic = await Topic.findOne({ contentKey: topicId }).select("_id");
    if (!topic) {
      return res.status(404).json({ message: "Topic not found" });
    }

    const journey = await Journey.create({
      user: userId,
      topic: topic._id,
      title,
      content,
    });

    res.status(201).json({ // ✅ was missing entirely
      success: true,
      message: "Journey created successfully",
      journeyId: journey._id,
    });
  } catch (err) {
    console.error("Create Journey Error:", err);
    res.status(500).json({ message: "Failed to create journey" });
  }
};

export const getJourneysByTopic = async (req, res) => {
  try {
    const { topicId } = req.params;
    console.log("getJourneysByTopic called with:", topicId);

     const topic = await Topic.findOne({ contentKey: topicId }).select("_id");

    if (!topic) {
      return res.status(404).json({ message: "Topic not found" });
    }

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const journeys = await Journey.find({ topic: topic._id })
      .populate("user", "username")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    res.status(200).json({
      success: true,
      page,
      count: journeys.length,
      journeys: journeys.map((j) => ({
        id: j._id,
        title: j.title,
        content: j.content,
        author: j.user.username,
        createdAt: j.createdAt,
      })),
    });
  } catch (err) {
    console.error("Get Journeys By Topic Error:", err);
    res.status(500).json({ message: "Failed to fetch journeys" });
  }
};

export const getMyJourneys = async (req, res) => {
  try {
    const userId = req.user._id;

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const journeys = await Journey.find({ user: userId })
      .populate("topic", "title")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    res.status(200).json({
      success: true,
      page,
      count: journeys.length,
      journeys: journeys.map((j) => ({
        id: j._id,
        title: j.title,
        content: j.content,
        topic: j.topic.title,
        createdAt: j.createdAt,
      })),
    });
  } catch (err) {
    console.error("Get My Journeys Error:", err);
    res.status(500).json({ message: "Failed to fetch your journeys" });
  }
};

export const editJourney = async (req, res) => {
  try {
    const { journeyId } = req.params;
    const { title, content } = req.body;
    const userId = req.user._id;

    if (!title && !content) {
      return res.status(400).json({ message: "Nothing to update" });
    }
    if (title && title.length > 100) {
      return res.status(400).json({ message: "Title cannot exceed 100 characters" });
    }
    if (content && content.length < 50) {
      return res.status(400).json({ message: "Journey content is too short" });
    }
    if (content && content.length > 2000) {
      return res.status(400).json({ message: "Journey content is too long" });
    }

    const journey = await Journey.findById(journeyId); // ✅ find first

    if (!journey) {
      return res.status(404).json({ message: "Journey not found" });
    }

    if (journey.user.toString() !== userId.toString()) {
      return res.status(403).json({ message: "You are not allowed to edit this journey" });
    }

    if (title) journey.title = title;   // ✅ then assign
    if (content) journey.content = content;
    journey.isEdited = true;

    await journey.save();

    res.status(200).json({
      success: true,
      message: "Journey updated successfully",
    });
  } catch (err) {
    console.error("Edit Journey Error:", err);
    res.status(500).json({ message: "Failed to edit journey" });
  }
};