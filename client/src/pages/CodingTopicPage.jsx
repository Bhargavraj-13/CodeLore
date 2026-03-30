import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../lib/api.jsx';
import { SubmitResultModal } from '../components/submitResult';
import EndExamConfirmModal from '../components/coding/EndExamModal';

import {
  CodingHeader,
  CodingEditor,
  CodingSidePanel,
} from '../components/coding';

function CodingTopicPage() {
  const { topicId } = useParams();
  const navigate = useNavigate();

  const [problems, setProblems] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [language, setLanguage] = useState('cpp');
  const [codeMap, setCodeMap] = useState({});
  const [result, setResult] = useState(null);
  const [isRunning, setIsRunning] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);
  const [submitResult, setSubmitResult] = useState(null);
  const [submitAttempt, setSubmitAttempt] = useState(0);
  const [showEndExamConfirm, setShowEndExamConfirm] = useState(false);
  const [loadError, setLoadError] = useState(null);

  // ✅ ALL useEffects together, before any early returns
  useEffect(() => {
    const fetchProblems = async () => {
      try {
        const res = await api.get(`/api/coding/${topicId}`);
        setProblems(res.data.problems);
      } catch (err) {
        console.error('Failed to load problems:', err);
        setLoadError('Unable to load coding problems. Please try again.');
      }
    };
    fetchProblems();
  }, [topicId]);

  useEffect(() => {
    setResult(null);
  }, [currentIndex]);

  // ✅ Early returns AFTER all hooks
  if (loadError) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex flex-col items-center justify-center gap-4">
        <p className="text-red-400">{loadError}</p>
        <button
          onClick={() => navigate(`/topics/${topicId}`)}
          className="px-4 py-2 bg-slate-700 rounded-md hover:bg-slate-600"
        >
          Back to Topic
        </button>
      </div>
    );
  }

  // Derived values after hooks
  const currentProblem = problems[currentIndex];
  const currentCode =
    codeMap[currentProblem?.id]?.[language] ??
    currentProblem?.starterCode?.[language] ??
    '';
  const isLast = currentIndex === problems.length - 1;

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

  const runCode = async () => {
    if (!currentProblem || isRunning) return;
    setIsRunning(true);
    try {
      const res = await api.post('/api/coding/run', {
        code: currentCode,
        language,
        testCases: currentProblem.sampleTestCases,
      });
      const exec = res.data;
      if (exec.status === 'ACCEPTED') {
        setResult({ type: 'success', passed: exec.passed, total: exec.total, testCaseResults: exec.testCaseResults });
      } else if (['PARTIAL', 'FAILED', 'WRONG_ANSWER'].includes(exec.status)) {
        setResult({ type: 'logic', passed: exec.passed, total: exec.total, testCaseResults: exec.testCaseResults });
      } else {
        setResult({ type: 'syntax', message: exec.error || 'Compilation or runtime error' });
      }
    } catch (error) {
      setResult({ type: 'syntax', message: error.message || 'An error occurred' });
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
      console.error('Submit error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEndExam = async () => {
    setShowEndExamConfirm(false);
    navigate(`/exam/${topicId}/results`); // ✅ correct route
  };

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
        onConfirm={handleEndExam}
      />
    </div>
  );
}

export default CodingTopicPage;