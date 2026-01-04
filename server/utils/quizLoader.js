import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// Map topicId -> quiz file
const quizMap = {
  loops: "loops.json",
  arrays: "arrays.json",
  strings: "strings.json",
  "binary-search": "binary-search.json",
  sorting: "sorting.json",
  recursion: "recursion.json",
  backtracking: "backtracking.json",
  "dynamic-programming": "dynamic-programming.json",
  "two-pointers": "two-pointers.json",
  "linked-lists": "linked-lists.json",
  "stacks-queues": "stacks-queues.json",
  trees: "trees.json",
};

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const loadQuizByTopic = (topicId) => {
  const fileName = quizMap[topicId];

  if (!fileName) {
    throw new Error("QUIZ_NOT_FOUND");
  }

  // Always resolve from this file's location
  const quizPath = path.resolve(
    __dirname,
    "../../quiz",
    fileName
  );

  if (!fs.existsSync(quizPath)) {
    throw new Error("QUIZ_FILE_MISSING");
  }

  try {
    const rawData = fs.readFileSync(quizPath, "utf-8");
    return JSON.parse(rawData);
  } catch (err) {
    console.error("Quiz JSON Parse Error:", err);
    throw new Error("QUIZ_FILE_MISSING");
  }
};