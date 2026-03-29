import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// FIX: resolve relative to this file, not process.cwd()
const CONTENT_ROOT = path.resolve(__dirname, "../../content");

export const getTopicContent = async (req, res) => {
  try {
    const { topicId } = req.params;

    // Basic path traversal guard
    const safeName = path.basename(topicId);
    const contentPath = path.join(CONTENT_ROOT, `${safeName}.md`);

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
