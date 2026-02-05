import fs from "fs";
import path from "path";

export const getTopicContent = async (req, res) => {
  try {
    const { topicId } = req.params;

    const contentPath = path.join(
      process.cwd(),
      "..",
      "content",
      `${topicId}.md`
    );

    if (!fs.existsSync(contentPath)) {
      return res.status(404).json({
        message: "Content file not found",
      });
    }

    const markdown = fs.readFileSync(contentPath, "utf-8");

    res.status(200).json({ content: markdown });
  } catch (err) {
    res.status(500).json({
      message: "Failed to load topic content",
    });
  }
};