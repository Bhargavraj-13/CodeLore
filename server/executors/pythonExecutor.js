import { spawn } from "child_process";
import fs from "fs";
import path from "path";
import { v4 as uuidv4 } from "uuid";

function formatPythonError(stderr) {
  if (!stderr) return null;

  const lines = stderr.trim().split("\n");
  const errorLine = lines[lines.length - 1];
  const fileLine = lines.find((l) => l.includes("File"));

  let lineNumber = "unknown";
  if (fileLine) {
    const match = fileLine.match(/line (\d+)/);
    if (match) lineNumber = match[1];
  }

  return `Runtime Error\n\nLine ${lineNumber}:\n${errorLine}`.trim();
}

const TMP_DIR = path.join(process.cwd(), "tmp");

if (!fs.existsSync(TMP_DIR)) {
  fs.mkdirSync(TMP_DIR, { recursive: true });
}

export const runPython = ({ code, testCases }) => {
  return new Promise((resolve) => {
    const fileId = uuidv4();
    const fileName = `${fileId}.py`;
    const filePath = path.join(TMP_DIR, fileName);

    fs.writeFileSync(filePath, code);

    let passed = 0;
    const testCaseResults = [];

    const runTestCase = (index) => {
      if (index >= testCases.length) {
        // Clean up -> best effort
        try { fs.unlinkSync(filePath); } catch {}

        return resolve({
          status: passed === testCases.length ? "ACCEPTED" : "WRONG_ANSWER",
          passed,
          total: testCases.length,
          testCaseResults,
        });
      }

      const { input, expectedOutput } = testCases[index];

      const dockerArgs = [
        "run", "--rm", "-i",
        "--memory=128m",
        "--cpus=0.5",
        "--pids-limit=64",
        "--network=none",
        "--read-only",
        "--tmpfs", "/tmp",
        "-v", `${TMP_DIR}:/sandbox`,
        "codelore-sandbox",
        "python", `/sandbox/${fileName}`,
      ];

      const child = spawn("docker", dockerArgs);

      let stdout = "";
      let stderr = "";

      // FIX: track whether timeout fired
      let timedOut = false;

      const timeout = setTimeout(() => {
        timedOut = true;
        child.kill("SIGKILL");
      }, 2000);

      child.stdout.on("data", (data) => { stdout += data.toString(); });
      child.stderr.on("data", (data) => { stderr += data.toString(); });

      child.on("close", () => {
        // FIX: resolve TLE immediately, don't continue test cases
        if (timedOut) {
          try { fs.unlinkSync(filePath); } catch {}
          return resolve({
            status: "TIME_LIMIT_EXCEEDED",
            passed,
            total: testCases.length,
            testCaseResults,
          });
        }

        clearTimeout(timeout);

        const userOutput = stdout.trim();
        const expected = expectedOutput.trim();
        const isCorrect = !stderr && userOutput === expected;

        if (isCorrect) passed++;

        testCaseResults.push({
          input,
          expectedOutput: expected,
          output: userOutput,
          status: isCorrect ? "correct" : "wrong",
          error: formatPythonError(stderr) || null,
        });

        runTestCase(index + 1);
      });

      child.stdin.write(input);
      child.stdin.end();
    };

    runTestCase(0);
  });
};