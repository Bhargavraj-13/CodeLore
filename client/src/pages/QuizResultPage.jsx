// Displays the quiz result with score summary and answer breakdown.

import { useLocation, useNavigate, useParams } from 'react-router-dom';
import AppHeader from '../components/layout/AppHeader.jsx';
import {
  ResultHeader,
  ScoreSummary,
  ResultBreakdown,
  ResultActions,
} from '../components/quizResult';

function QuizResultPage() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { topicId } = useParams();

  if (!state) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center">
        No result data available.
      </div>
    );
  }

  const { score, correctCount, totalQuestions, results } = state;

  const handlePrimaryAction = () => {
  if (score >= 8) {
    navigate(`/coding/${topicId}`);
  } else {
    navigate(`/quiz/${topicId}`);
  }
};

const primaryActionLabel = score >= 8 ? "Start Coding" : "ReAttempt";

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col">
      <AppHeader />

      <main className="flex-1 px-6 md:px-10 py-10">
        <div className="max-w-5xl mx-auto
                        bg-slate-900/60
                        border border-white/10
                        rounded-xl
                        p-8
                        space-y-8">

          <ResultHeader />

          <ScoreSummary
            score={score}
            correctCount={correctCount}
            totalQuestions={totalQuestions}
          />

          <ResultBreakdown results={results} />

          <ResultActions
  onBackToTopic={() => navigate(`/topics/${topicId}`)}
  reAttempt={handlePrimaryAction}
  reAttemptLabel={primaryActionLabel}
/>



        </div>
      </main>
    </div>
  );
}

export default QuizResultPage;
