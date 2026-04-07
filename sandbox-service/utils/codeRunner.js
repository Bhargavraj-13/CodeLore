import { runPython } from "../executors/pythonExecutor.js";
import { runCpp } from "../executors/cppExecutor.js";

export const runCode = async ({ language, code, testCases }) => {
  if (!Array.isArray(testCases)) {
    return {
      status: "RUNTIME_ERROR",
      passed: 0,
      total: 0,
      testCaseResults: [],
      error: "No test cases provided",
    };
  }

  if (!code || typeof code !== "string") {
    return {
      status: "RUNTIME_ERROR",
      passed: 0,
      total: testCases.length,
      testCaseResults: [],
      error: "Code is required",
    };
  }

  let rawResult;

  if (language === "python") {
    rawResult = await runPython({ code, testCases });
  } else if (language === "cpp") {
    rawResult = await runCpp({ code, testCases });
  } else {
    return {
      status: "RUNTIME_ERROR",
      passed: 0,
      total: testCases.length,
      testCaseResults: [],
      error: "UNSUPPORTED_LANGUAGE",
    };
  }

  return {
    status: rawResult.status,
    passed: rawResult.passed ?? rawResult.passedCount ?? 0,
    total: rawResult.total ?? rawResult.totalCount ?? testCases.length,
    testCaseResults: rawResult.testCaseResults ?? rawResult.results ?? [],
    error: rawResult.error ?? rawResult.output ?? null,
  };
};