import { spawn } from "child_process";
import fs from "fs";
import path from "path";
import { v4 as uuidv4 } from "uuid";

function formatGccError(stderr) {
  if (!stderr) return "Compilation failed.";

  const lines = stderr.split("\n");
  const errorIndex = lines.findIndex((line) => line.includes("error:"));

  if (errorIndex === -1) {
    return "Compilation failed.";
  }

  const errorLine = lines[errorIndex];
  const lineMatch = errorLine.match(/:(\d+):\d+:/);
  const lineNumber = lineMatch ? lineMatch[1] : "unknown";
  const message = errorLine.split("error:")[1]?.trim();
  const context = lines.slice(errorIndex + 1, errorIndex + 6).join("\n");

  return `Compilation Error

Line ${lineNumber}:
${message}

${context}`.trim();
}

const TMP_DIR = path.join(process.cwd(), "tmp");

if (!fs.existsSync(TMP_DIR)) {
  fs.mkdirSync(TMP_DIR, { recursive: true });
}

function safeDelete(filePath) {
  try {
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
  } catch {}
}

export const runCpp = ({ code, testCases }) => {
  return new Promise((resolve) => {
    const fileId = uuidv4();
    const fileName = `${fileId}.cpp`;
    const cppPath = path.join(TMP_DIR, fileName);
    const binaryPath = path.join(TMP_DIR, fileId);

    fs.writeFileSync(cppPath, code);

    const compileArgs = [
      "run",
      "--rm",
      "--memory=128m",
      "--cpus=0.5",
      "--pids-limit=64",
      "--network=none",
      "--read-only",
      "--tmpfs",
      "/tmp",
      "-v",
      `${TMP_DIR}:/sandbox`,
      "codelore-sandbox",
      "g++",
      `/sandbox/${fileName}`,
      "-o",
      `/sandbox/${fileId}`,
    ];

    const compileProcess = spawn("docker", compileArgs);

    let compileStderr = "";

    compileProcess.stderr.on("data", (data) => {
      compileStderr += data.toString();
    });

    compileProcess.on("error", (err) => {
      safeDelete(cppPath);
      safeDelete(binaryPath);

      return resolve({
        status: "RUNTIME_ERROR",
        output: `Docker spawn failed: ${err.message}`,
        passedCount: 0,
        totalCount: testCases.length,
        results: [],
      });
    });

    compileProcess.on("close", (compileCode) => {
      if (compileCode !== 0) {
        safeDelete(cppPath);
        safeDelete(binaryPath);

        return resolve({
          status: "COMPILE_ERROR",
          output: formatGccError(compileStderr),
          passedCount: 0,
          totalCount: testCases.length,
          results: [],
        });
      }

      const results = [];
      let passedCount = 0;

      const runTestCase = (index) => {
        if (index >= testCases.length) {
          safeDelete(cppPath);
          safeDelete(binaryPath);

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

        const runArgs = [
          "run",
          "--rm",
          "-i",
          "--memory=128m",
          "--cpus=0.5",
          "--pids-limit=64",
          "--network=none",
          "--read-only",
          "--tmpfs",
          "/tmp",
          "-v",
          `${TMP_DIR}:/sandbox`,
          "codelore-sandbox",
          `/sandbox/${fileId}`,
        ];

        const child = spawn("docker", runArgs);

        let stdout = "";
        let stderr = "";
        let timedOut = false;

        const timeout = setTimeout(() => {
          timedOut = true;
          child.kill("SIGKILL");
        }, 2000);

        child.stdout.on("data", (data) => {
          stdout += data.toString();
        });

        child.stderr.on("data", (data) => {
          stderr += data.toString();
        });

        child.on("error", (err) => {
          clearTimeout(timeout);
          safeDelete(cppPath);
          safeDelete(binaryPath);

          return resolve({
            status: "RUNTIME_ERROR",
            passedCount,
            totalCount: testCases.length,
            results,
            output: `Docker run failed: ${err.message}`,
          });
        });

        child.on("close", () => {
          clearTimeout(timeout);

          if (timedOut) {
            safeDelete(cppPath);
            safeDelete(binaryPath);

            return resolve({
              status: "TIME_LIMIT_EXCEEDED",
              passedCount,
              totalCount: testCases.length,
              results,
            });
          }

          const userOutput = stdout.trim();
          const expected = expectedOutput.trim();
          const passed = !stderr && userOutput === expected;

          if (passed) passedCount++;

          results.push({
            testCaseIndex: index,
            passed,
            input,
            expectedOutput: expected,
            userOutput,
            error: stderr || null,
          });

          runTestCase(index + 1);
        });

        child.stdin.write(input);
        child.stdin.end();
      };

      runTestCase(0);
    });
  });
};