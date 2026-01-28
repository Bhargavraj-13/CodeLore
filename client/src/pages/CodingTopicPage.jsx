import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../lib/api.jsx";

import {
  CodingHeader,
  CodingEditor,
  CodingSidePanel,
} from "../components/coding";

function CodingTopicPage() {
  const { topicId } = useParams();

  const [problems, setProblems] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [language, setLanguage] = useState("cpp");
  const [code, setCode] = useState("");
  const [result, setResult] = useState(null);

  /* ==============================
     Load problems for topic
  ============================== */
  useEffect(() => {
    const fetchProblems = async () => {
      const res = await api.get(`/api/coding/${topicId}`);
      setProblems(res.data.problems);
      setCode(res.data.problems[0].starterCode.cpp);
    };

    fetchProblems();
  }, [topicId]);

  /* ==============================
     Update code when question/lang changes
  ============================== */
  useEffect(() => {
    if (problems.length) {
      setCode(problems[currentIndex].starterCode[language]);
    }
  }, [currentIndex, language, problems]);

  /* ==============================
     Clear result on question change
  ============================== */
  useEffect(() => {
    setResult(null);
  }, [currentIndex]);

  /* ==============================
     RUN CODE
  ============================== */
  const runCode = async () => {
    try {
      const problemId = problems[currentIndex].id;

      const res = await api.post(
        `/api/coding-submit/${problemId}/submit`,
        { code, language }
      );

      const exec = res.data.result;

      if (exec.status === "ACCEPTED") {
        setResult({
          type: "success",
          passed: exec.passedCount,
          total: exec.totalCount,
          testCaseResults: exec.results,
        });
      } else if (exec.status === "PARTIAL" || exec.status === "FAILED") {
        setResult({
          type: "logic",
          passed: exec.passedCount,
          total: exec.totalCount,
          testCaseResults: exec.results,
        });
      } else if (exec.status === "COMPILE_ERROR") {
        setResult({
          type: "syntax",
          message:
            exec.results?.[0]?.error ||
            "Compilation failed",
        });
      } else {
        setResult({
          type: "syntax",
          message: "Runtime error occurred",
        });
      }
    } catch (err) {
      setResult({
        type: "syntax",
        message:
          err.response?.data?.message ||
          err.message ||
          "Failed to execute code",
      });
    }
  };

  const isLast = currentIndex === problems.length - 1;

  return (
    <div className="h-screen bg-slate-950 text-white flex flex-col">
      <CodingHeader
        problem={problems[currentIndex]}
        index={currentIndex}
        total={problems.length}
        language={language}
        setLanguage={setLanguage}
        onRun={runCode}
        onPrev={() =>
          setCurrentIndex((i) => Math.max(i - 1, 0))
        }
        onNext={() =>
          isLast
            ? alert("Submitted all problems")
            : setCurrentIndex((i) => i + 1)
        }
        isFirst={currentIndex === 0}
        isLast={isLast}
      />

      {/* Main Area */}
      <div className="flex flex-1 overflow-hidden px-6 py-4 gap-6">
        <CodingEditor
          code={code}
          onChange={setCode}
        />

        <CodingSidePanel
          sampleTestCases={
            problems[currentIndex]?.sampleTestCases
          }
          result={result}
          problem={problems[currentIndex]}
        />
      </div>
    </div>
  );
}

export default CodingTopicPage;
