import { runPython } from "../executors/pythonExecutor.js";
import { runCpp } from "../executors/cppExecutor.js";

export const runCode = async ({ language, code, testCases }) => {
  if (language === "python") {
    return runPython({ code, testCases });
  }

  if (language === "cpp") {
    return runCpp({ code, testCases });
  }

  throw new Error("UNSUPPORTED_LANGUAGE");
};
