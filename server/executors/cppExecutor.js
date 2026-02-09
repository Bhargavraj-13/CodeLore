import { exec } from "child_process";
import fs from "fs";
import path from "path";
import { v4 as uuidv4 } from "uuid";

function formatGccError(stderr) {
  if (!stderr) return "Compilation failed.";

  const lines = stderr.split("\n");

  const errorIndex = lines.findIndex((line) =>
    line.includes("error:")
  );

  if (errorIndex === -1) {
    return "Compilation failed.";
  }

  const errorLine = lines[errorIndex];

  const lineMatch = errorLine.match(/:(\d+):\d+:/);
  const lineNumber = lineMatch ? lineMatch[1] : "unknown";

  const message = errorLine.split("error:")[1]?.trim();

  const context = lines
    .slice(errorIndex + 1, errorIndex + 6)
    .join("\n");

  return ` Compilation Error

Line ${lineNumber}:
${message}

${context}`.trim();
}

const TMP_DIR = path.join(process.cwd(), "tmp");

const GPP_PATH =
  process.platform === "win32"
    ? `"C:\\msys64\\ucrt64\\bin\\g++.exe"`
    : "g++";

if (!fs.existsSync(TMP_DIR)) {
  fs.mkdirSync(TMP_DIR, { recursive: true });
}

export const runCpp = ({ code, testCases }) => {

  return new Promise((resolve) => {
    const fileId = uuidv4();

    const cppPath = path.join(TMP_DIR, `${fileId}.cpp`);

    const outPath =
      process.platform === "win32"
        ? path.join(TMP_DIR, `${fileId}.exe`)
        : path.join(TMP_DIR, fileId);

    fs.writeFileSync(cppPath, code);

    console.log("CPP PATH:", cppPath);
    console.log("CPP EXISTS:", fs.existsSync(cppPath));
    console.log("CPP CONTENT:\n", fs.readFileSync(cppPath, "utf8"));

    exec(
      `${GPP_PATH} "${cppPath}" -o "${outPath}"`,
      (compileErr, _stdout, compileStderr) => {
        if (compileErr) {
          fs.unlinkSync(cppPath);

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
            fs.unlinkSync(cppPath);
            fs.unlinkSync(outPath);

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

          const runCommand =
            process.platform === "win32"
              ? `"${outPath}"`
              : `./${fileId}`;

          const processExec = exec(
            runCommand,
            {
              cwd: TMP_DIR,
              timeout: 2000,
            },
            (error, stdout, stderr) => {
              const userOutput = stdout.trim();
              const expected = expectedOutput.trim();

              const passed =
                !error && !stderr && userOutput === expected;

              if (passed) passedCount++;

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

          processExec.stdin.write(input);
          processExec.stdin.end();
        };

        runTestCase(0);
      }
    );
  });
};
