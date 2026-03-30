import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import Topic from "../models/Topic.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const CONTENT_ROOT = path.resolve(__dirname, "../../content");

// Map contentKey -> actual filename (handles historical mismatches)
const CONTENT_FILE_MAP = {
  "linked-lists":   "linked-list",
  "stacks-queues":  "stack-and-queue",
};

const resolveContentFile = (contentKey) => {
  const name = CONTENT_FILE_MAP[contentKey] ?? contentKey;
  return path.join(CONTENT_ROOT, `${name}.md`);
};

export const getTopicContent = async (req, res) => {
  try {
    const { topicId } = req.params;

    let contentKey = topicId;

    // If it looks like a MongoDB ObjectId, resolve it to contentKey
    if (/^[a-f\d]{24}$/i.test(topicId)) {
      const topic = await Topic.findById(topicId).select("contentKey");
      if (!topic) {
        return res.status(404).json({ message: "Topic not found" });
      }
      contentKey = topic.contentKey;
    }

    // Guard against path traversal
    const safeName = path.basename(contentKey);
    const contentPath = resolveContentFile(safeName);

    if (!fs.existsSync(contentPath)) {
      return res.status(404).json({ message: "Content file not found" });
    }

    const markdown = fs.readFileSync(contentPath, "utf-8");
    res.status(200).json({ content: markdown });
  } catch (err) {
    console.error("Topic content error:", err);
    res.status(500).json({ message: "Failed to load topic content" });
  }
};