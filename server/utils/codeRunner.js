import { runPython } from "../executors/pythonExecutor.js";
import { runCpp } from "../executors/cppExecutor.js";

export const runCode = async ({ language, code, testCases }) => {
  let rawResult;

  if (language === "python") {
    rawResult = await runPython({ code, testCases });
  } else if (language === "cpp") {
    rawResult = await runCpp({ code, testCases });
  } else {
    throw new Error("UNSUPPORTED_LANGUAGE");
  }

  return {
    status: rawResult.status,
    passed: rawResult.passed ?? 0,
    total: rawResult.total ?? testCases.length,
    testCaseResults: rawResult.testCaseResults ?? [],
    error:
      rawResult.error ||
      rawResult.stderr ||
      rawResult.compileError ||
      "Compilation or runtime error",
  };
};
