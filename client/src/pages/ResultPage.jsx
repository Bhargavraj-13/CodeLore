import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../lib/api.jsx";
import AppHeader from '../components/layout/AppHeader.jsx';
import { ResultHero, ResultBreakdown, ResultCTA } from "../components/results";

function ResultPage() {
  const { topicId } = useParams();
  const navigate = useNavigate();

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        // FIX: call real API instead of mock
        const res = await api.get(`/api/exam/${topicId}/results`);
        setData(res.data);
      } catch (err) {
        console.error("Result fetch error:", err);
        setError("Failed to load results");
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [topicId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center text-slate-400">
        Loading results...
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center space-y-4">
        <AppHeader />
        <p className="text-red-400">{error || "No results found"}</p>
        <button
          onClick={() => navigate(`/coding/${topicId}`)}
          className="px-4 py-2 bg-slate-700 rounded-md"
        >
          Back to Lesson
        </button>
      </div>
    );
  }

  const { quiz, coding, overall } = data;

  const quizPassed = quiz.passed;
  const codingPassed = coding.passed;

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <AppHeader />
      <ResultHero overall={overall} />
      <ResultBreakdown quiz={quiz} coding={coding} />
      <ResultCTA
        overall={overall}
        quizPassed={quizPassed}
        codingPassed={codingPassed}
        topicId={topicId}
        contentKey={data.contentKey}
      />
    </div>
  );
}

export default ResultPage;
