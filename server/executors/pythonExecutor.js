import { exec } from "child_process";
import fs from "fs";
import path from "path";
import { v4 as uuidv4 } from "uuid";

const TMP_DIR = path.join(process.cwd(), "tmp");

if (!fs.existsSync(TMP_DIR)) {
  fs.mkdirSync(TMP_DIR);
}

export const runPython = ({ code, testCases }) => {
  return new Promise((resolve) => {
    const fileId = uuidv4();
    const filePath = path.join(TMP_DIR, `${fileId}.py`);

    fs.writeFileSync(filePath, code);

    const results = [];
    let passedCount = 0;

    const runTestCase = (index) => {
      if (index >= testCases.length) {
        fs.unlinkSync(filePath);
        return resolve({
          status:
            passedCount === testCases.length
              ? "ACCEPTED"
              : passedCount > 0
              ? "PARTIAL"
              : "FAILED",
          passedCount,
          totalCount: testCases.length,
          results,
        });
      }

      const { input, expectedOutput } = testCases[index];

      const process = exec(
        `python "${filePath}"`,
        { timeout: 2000 },
        (error, stdout, stderr) => {
          const userOutput = stdout.trim();
          const expected = expectedOutput.trim();

          let passed = false;

          if (!error && !stderr && userOutput === expected) {
            passed = true;
            passedCount++;
          }

          results.push({
            testCaseIndex: index,
            passed,
            input,
            expectedOutput: expected,
            userOutput,
            error: stderr || (error ? error.message : null),
          });

          runTestCase(index + 1);
        }
      );

      process.stdin.write(input);
      process.stdin.end();
    };

    runTestCase(0);
  });
};
