import fs from "fs";
import path from "path";

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

export const loadQuizByTopic = (topicId) => {
  const fileName = quizMap[topicId];

  if (!fileName) {
    throw new Error("QUIZ_NOT_FOUND");
  }

  const quizPath = path.join(process.cwd(), "..", "quiz", fileName);

  if (!fs.existsSync(quizPath)) {
    throw new Error("QUIZ_FILE_MISSING");
  }

  const rawData = fs.readFileSync(quizPath, "utf-8");

  return JSON.parse(rawData);
};
