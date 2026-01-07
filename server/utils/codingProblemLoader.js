import fs from "fs";
import path from "path";

// Root folder where coding problems live
const CODING_ROOT = path.join(process.cwd(), "..", "coding");

// Load all problems for a given topicId
export const loadProblemsByTopic = (topicId) => {
  const topicPath = path.join(CODING_ROOT, topicId);

  if (!fs.existsSync(topicPath)) {
    throw new Error("TOPIC_NOT_FOUND");
  }

  const files = fs.readdirSync(topicPath).filter((f) =>
    f.endsWith(".json")
  );

  return files.map((file) => {
    const filePath = path.join(topicPath, file);
    const raw = fs.readFileSync(filePath, "utf-8");
    return JSON.parse(raw);
  });
};

// Load a single problem by its unique problemId
export const loadProblemById = (problemId) => {
  const topics = fs.readdirSync(CODING_ROOT);

  for (const topic of topics) {
    const topicPath = path.join(CODING_ROOT, topic);
    const files = fs.readdirSync(topicPath);

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
