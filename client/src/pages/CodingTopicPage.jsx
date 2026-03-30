import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../lib/api.jsx";
import { SubmitResultModal } from "../components/submitResult";
import EndExamConfirmModal from "../components/coding/EndExamModal";
import { CodingHeader, CodingEditor, CodingSidePanel } from "../components/coding";

function CodingTopicPage() {
  const { topicId } = useParams();
  const navigate = useNavigate();

  const [problems, setProblems] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [language, setLanguage] = useState("cpp");
  const [codeMap, setCodeMap] = useState({});
  const [result, setResult] = useState(null);
  const [isRunning, setIsRunning] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);
  const [submitResult, setSubmitResult] = useState(null);
  const [submitAttempt, setSubmitAttempt] = useState(0);
  const [showEndExamConfirm, setShowEndExamConfirm] = useState(false);
  const [fetchError, setFetchError] = useState(null);

  useEffect(() => {
    const fetchProblems = async () => {
      try {
        const res = await api.get(`/api/coding/${topicId}`);
        setProblems(res.data.problems);
      } catch (err) {
        setFetchError("Failed to load problems. Please refresh.");
      }
    };
    fetchProblems();
  }, [topicId]);

  const currentProblem = problems[currentIndex];

  const currentCode =
    codeMap[currentProblem?.id]?.[language] ??
    currentProblem?.starterCode?.[language] ??
    "";

  const handleCodeChange = (newCode) => {
    if (!currentProblem) return;
    setCodeMap((prev) => ({
      ...prev,
      [currentProblem.id]: {
        ...prev[currentProblem.id],
        [language]: newCode,
      },
    }));
  };

  useEffect(() => {
    setResult(null);
  }, [currentIndex]);

  const runCode = async () => {
    if (!currentProblem || isRunning) return;
    setIsRunning(true);
    try {
      const res = await api.post("/api/coding/run", {
        code: currentCode,
        language,
        testCases: currentProblem.sampleTestCases,
      });

      const exec = res.data;

      if (exec.status === "ACCEPTED") {
        setResult({ type: "success", passed: exec.passed, total: exec.total, testCaseResults: exec.testCaseResults });
      } else if (
        exec.status === "PARTIAL" ||
        exec.status === "FAILED" ||
        exec.status === "WRONG_ANSWER"
      ) {
        setResult({ type: "logic", passed: exec.passed, total: exec.total, testCaseResults: exec.testCaseResults });
      } else {
        // FIX: COMPILE_ERROR returns output field, not error field
        setResult({
          type: "syntax",
          message: exec.output ?? exec.error ?? "Compilation or runtime error",
        });
      }
    } catch (error) {
      setResult({ type: "syntax", message: error.message || "An error occurred" });
    } finally {
      setIsRunning(false);
    }
  };

  const onSubmit = async () => {
    try {
      setIsSubmitting(true);
      const problemId = problems[currentIndex].id;
      const res = await api.post(`/api/coding-submit/${problemId}/submit`, {
        code: currentCode,
        language,
      });
      setSubmitResult(res.data.result);
      setSubmitAttempt((c) => c + 1);
      setIsSubmitModalOpen(true);
    } catch (error) {
      console.error("Submit error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // FIX: isLast was hardcoded true, now computed correctly
  const isLast = currentIndex === problems.length - 1;

  if (fetchError) {
    return (
      <div className="h-screen bg-slate-950 text-red-400 flex items-center justify-center">
        {fetchError}
      </div>
    );
  }

  return (
    <div className="h-screen bg-slate-950 text-white flex flex-col">
      <CodingHeader
        problem={currentProblem}
        index={currentIndex}
        total={problems.length}
        language={language}
        setLanguage={setLanguage}
        onRun={runCode}
        onPrev={() => setCurrentIndex((i) => Math.max(i - 1, 0))}
        onNext={() => setCurrentIndex((i) => Math.min(i + 1, problems.length - 1))}
        onSubmit={onSubmit}
        isFirst={currentIndex === 0}
        isLast={isLast}
        isRunning={isRunning}
        isSubmitting={isSubmitting}
        onEndExam={() => setShowEndExamConfirm(true)}
      />

      <div className="flex flex-1 overflow-hidden px-6 py-4 gap-6">
        {/* FIX: pass language prop so Monaco highlights correctly */}
        <CodingEditor
          key={`${currentProblem?.id}-${language}`}
          code={currentCode}
          language={language}
          onChange={handleCodeChange}
        />
        <CodingSidePanel
          sampleTestCases={currentProblem?.sampleTestCases}
          result={result}
          problem={currentProblem}
          isRunning={isRunning}
        />
      </div>

      {/* FIX: isLast={isLast} not isLast (which was always true) */}
      <SubmitResultModal
        isOpen={isSubmitModalOpen}
        result={submitResult}
        submitAttempt={submitAttempt}
        onClose={() => setIsSubmitModalOpen(false)}
        onNext={() => {
          setIsSubmitModalOpen(false);
          setSubmitResult(null);
          setCurrentIndex((i) => i + 1);
        }}
        isLast={isLast}
      />

      <EndExamConfirmModal
        isOpen={showEndExamConfirm}
        onCancel={() => setShowEndExamConfirm(false)}
        onConfirm={() => {
          setShowEndExamConfirm(false);
          navigate(`/coding/${topicId}/results`);
        }}
      />
    </div>
  );
}

export default CodingTopicPage;
