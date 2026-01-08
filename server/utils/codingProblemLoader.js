import fs from "fs";
import path from "path";

const CODING_ROOT = path.join(process.cwd(), "..", "coding");

// Load all coding problems for a given topic
export const loadProblemsByTopic = (topicId) => {
  const topicPath = path.join(CODING_ROOT, topicId);

  if (!fs.existsSync(topicPath)) {
    throw new Error("TOPIC_NOT_FOUND");
  }

  const files = fs
    .readdirSync(topicPath)
    .filter((f) => f.endsWith(".json"));

  return files.map((file) => {
    const filePath = path.join(topicPath, file);
    const raw = fs.readFileSync(filePath, "utf-8");
    return JSON.parse(raw);
  });
};

// Load a specific coding problem by its ID
export const loadProblemById = (problemId) => {
  const topics = fs.readdirSync(CODING_ROOT);

  for (const topic of topics) {
    const topicPath = path.join(CODING_ROOT, topic);

    if (!fs.statSync(topicPath).isDirectory()) continue;

    const files = fs
      .readdirSync(topicPath)
      .filter((f) => f.endsWith(".json"));

    for (const file of files) {
      const filePath = path.join(topicPath, file);
      const raw = fs.readFileSync(filePath, "utf-8");
      const problem = JSON.parse(raw);

      if (problem.id === problemId) {
        return problem;
      }
    }
  }

  throw new Error("PROBLEM_NOT_FOUND");
};
