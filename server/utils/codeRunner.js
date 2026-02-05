import { runPython } from "../executors/pythonExecutor.js";
import { runCpp } from "../executors/cppExecutor.js";


export const runCode = async ({ language, code, testCases }) => {;

  if (!Array.isArray(testCases)) {
    return {
      status: "RUNTIME_ERROR",
      passed: 0,
      total: 0,
      testCaseResults: [],
      error: "No test cases provided",
    };
  }

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

    passed: rawResult.passedCount ?? 0,
    total: rawResult.totalCount ?? testCases.length,

    testCaseResults: rawResult.results ?? [],

    error: rawResult.output ?? null,
  };
};
