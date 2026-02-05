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

    let passed = 0;
    const testCaseResults = [];

    const runTestCase = (index) => {
      if (index >= testCases.length) {
        fs.unlinkSync(filePath);

        return resolve({
          status:
            passed === testCases.length
              ? "ACCEPTED"
              : passed > 0
              ? "WRONG_ANSWER"
              : "WRONG_ANSWER",
          passed,
          total: testCases.length,
          testCaseResults,
        });
      }

      const { input, expectedOutput } = testCases[index];

      const child = exec(
        `python "${filePath}"`,
        { timeout: 2000 },
        (error, stdout, stderr) => {
          const userOutput = stdout.trim();
          const expected = expectedOutput.trim();

          const isCorrect =
            !error && !stderr && userOutput === expected;

          if (isCorrect) passed++;

          testCaseResults.push({
            input,
            expectedOutput: expected,
            output: userOutput,
            status: isCorrect ? "correct" : "wrong",
            error: stderr || (error ? error.message : null),
          });

          runTestCase(index + 1);
        }
      );

      child.stdin.write(input);
      child.stdin.end();
    };

    runTestCase(0);
  });
};
