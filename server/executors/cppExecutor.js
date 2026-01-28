import { exec } from "child_process";
import fs from "fs";
import path from "path";
import { v4 as uuidv4 } from "uuid";

const TMP_DIR = path.join(process.cwd(), "tmp");

// 🔥 ABSOLUTE PATH TO G++
const GPP_PATH = `"C:\\msys64\\mingw64\\bin\\g++.exe"`;

if (!fs.existsSync(TMP_DIR)) {
  fs.mkdirSync(TMP_DIR);
}

export const runCpp = ({ code, testCases }) => {
  return new Promise((resolve) => {
    const fileId = uuidv4();
    const cppPath = path.join(TMP_DIR, `${fileId}.cpp`);
    const outPath = path.join(TMP_DIR, `${fileId}.exe`);

    fs.writeFileSync(cppPath, code);

    // ✅ USE ABSOLUTE G++ PATH
    exec(
      `${GPP_PATH} "${cppPath}" -o "${outPath}"`,
      (compileErr, _stdout, compileStderr) => {
        if (compileErr) {
          console.log("❌ G++ COMPILATION FAILED");
          console.log("STDERR:", compileStderr);
          console.log("ERROR:", compileErr.message);

          fs.unlinkSync(cppPath);

          return resolve({
            status: "COMPILE_ERROR",
            passedCount: 0,
            totalCount: testCases.length,
            results: [
              {
                error: compileStderr || compileErr.message,
              },
            ],
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

          const process = exec(
            `"${outPath}"`,
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
      }
    );
  });
};
