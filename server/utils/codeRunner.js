import { executeInSandbox } from "../services/sandboxClient.js";

export const runCode = async ({ language, code, testCases }) => {
  return await executeInSandbox({ language, code, testCases });
};