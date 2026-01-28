function CodingSidePanel({ sampleTestCases = [], result, problem }) {
  return (
    <div
      className="
        w-1/3
        bg-slate-900
        border border-white/10
        rounded-lg
        p-6
        overflow-y-auto
        space-y-8
      "
    >
      {/* Description */}
      <div>
        <h3 className="text-lg font-semibold mb-2">Problem Description</h3>
        <p className="text-slate-200 leading-relaxed">
          {problem?.description}
        </p>
      </div>

      {/* Sample Testcases + Execution Preview */}
      <div>
        <h3 className="text-lg font-semibold mb-3">
          Sample Test Cases
        </h3>

        {sampleTestCases.slice(0, 2).map((tc, index) => {
          const exec = Array.isArray(result?.testCaseResults)
  ? result.testCaseResults[index]
  : null;

          return (
            <div
              key={index}
              className="bg-slate-800 p-3 rounded-md mb-4 text-sm"
            >
              <p className="text-slate-400">Input</p>
              <pre className="text-slate-200 whitespace-pre-wrap">
                {tc.input}
              </pre>

              <p className="text-slate-400 mt-2">Expected Output</p>
              <pre className="text-slate-200 whitespace-pre-wrap">
                {tc.expectedOutput}
              </pre>

              <p className="text-slate-400 mt-2">Your Output</p>

              <pre
                className={`whitespace-pre-wrap ${
                  exec
                    ? exec.status === "correct"
                      ? "text-green-400"
                      : "text-red-400"
                    : "text-slate-400"
                }`}
              >
                {exec
                  ? exec.output || result?.message
                  : "—"}
              </pre>
            </div>
          );
        })}
      </div>

      {/* Summary */}
      {result && (
        <div
          className={`p-4 rounded-md text-sm ${
            result.type === "success"
              ? "bg-green-500/15 text-green-400"
              : "bg-red-500/15 text-red-400"
          }`}
        >
          {result.type === "syntax" && result.message}
          {result.type === "logic" &&
            `${result.passed} / ${result.total} test cases passed`}
          {result.type === "success" &&
            `${result.passed} / ${result.total} test cases passed`}
        </div>
      )}
    </div>
  );
}

export default CodingSidePanel;
