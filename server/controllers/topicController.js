import Topic from "../models/Topic.js";

// Create a new topic (Admin Only)
export const createTopic = async (req, res) => {
  try {
    const { title, description, difficulty, contentKey } = req.body;

    // Basic validation
    if (!title || !description || !difficulty || !contentKey) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const existingTopic = await Topic.findOne({$or: [{ title }, { contentKey }]});

    if (existingTopic) {
      if (existingTopic.title === title) {
        return res.status(409).json({ message: "Topic title already exists." });
      }
      if (existingTopic.contentKey === contentKey) {
        return res.status(409).json({ message: "contentKey already exists." });
      }
}

    const topic = await Topic.create({
      title,
      description,
      difficulty,
      contentKey,
    });

    return res.status(201).json({
      message: "Topic created successfully.",
      topic
    });

  } catch (err) {
    console.error("Create Topic Error:", err);
    return res.status(500).json({ message: "Server error while creating topic." });
  }
};


// Get all topics
export const getAllTopics = async (req, res) => {
  try {
    const topics = await Topic.find().sort({ createdAt: 1 });

    return res.status(200).json(topics);

  } catch (err) {
    console.error("Get Topics Error:", err);
    return res.status(500).json({ message: "Server error while fetching topics." });
  }
};


// Get a particular topic by ID
export const getTopicById = async (req, res) => {
  try {
    const topic = await Topic.findById(req.params.id);

    if (!topic) {
      return res.status(404).json({ message: "Topic not found." });
    }

    return res.status(200).json(topic);

  } catch (err) {
    console.error("Get Topic By ID Error:", err);
    return res.status(500).json({ message: "Server error while fetching topic." });
  }
};
// Update a topic by ID (Admin Only)
export const updateTopicById = async (req, res) => {
  try {
    const { title, description, difficulty, contentKey } = req.body;
    const topic = await Topic.findById(req.params.id);

    if (!topic) {
      return res.status(404).json({ message: "Topic not found." });
    }

    // Check duplicate title
    if (title && title !== topic.title) {
      const existingTitle = await Topic.findOne({ title });
      if (existingTitle) {
        return res.status(409).json({ message: "Topic title already exists." });
      }
    }

    // Check duplicate contentKey
    if (contentKey && contentKey !== topic.contentKey) {
      const existingContentKey = await Topic.findOne({ contentKey });
      if (existingContentKey) {
        return res.status(409).json({ message: "contentKey already exists." });
      }
    }

    topic.title = title || topic.title;
    topic.description = description || topic.description;
    topic.difficulty = difficulty || topic.difficulty;
    topic.contentKey = contentKey || topic.contentKey;

    await topic.save();

    return res.status(200).json({
      message: "Topic updated successfully.",
      topic,
    });
  } catch (err) {
    console.error("Update Topic Error:", err);
    return res.status(500).json({ message: "Server error while updating topic." });
  }
};

// Delete a topic by ID (Admin Only)
export const deleteTopicById = async (req, res) => {
  try {
    const topic = await Topic.findById(req.params.id);
    if (!topic) {
      return res.status(404).json({ message: "Topic not found." });
    }
    await Topic.findByIdAndDelete(req.params.id);
    return res.status(200).json({ message: "Topic deleted successfully." });
  } catch (err) {
    console.error("Delete Topic Error:", err);
    return res.status(500).json({ message: "Server error while deleting topic." });
  }
};