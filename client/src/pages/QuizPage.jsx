// Renders the quiz flow with questions, navigation, and submission handling.

import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../lib/api.jsx';
import AppHeader from '../components/layout/AppHeader.jsx';

import {
  QuizHeader,
  QuestionCard,
  QuizNavigation,
} from '../components/quiz';

function QuizPage() {
  const { topicId } = useParams();
  const navigate = useNavigate();

  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  // Fetch quiz
  useEffect(() => {
    async function loadQuiz() {
      try {
        const res = await api.get(`/api/quiz/${topicId}`);
        setQuestions(res.data.questions || []);
      } catch (err) {
        console.error(err);
        setError('Unable to load quiz.');
      } finally {
        setLoading(false);
      }
    }

    loadQuiz();
  }, [topicId]);

  const currentQuestion = questions[currentIndex];

  // Select option
  const handleSelect = (optionIndex) => {
    setAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: optionIndex,
    }));
  };

  // Submit quiz
  const handleSubmit = async () => {
    try {
      setSubmitting(true);

      const res = await api.post(`/api/quiz/${topicId}/submit`, {
        answers,
      });

      navigate(`/quiz/${topicId}/result`, {
        state: res.data,
      });
    } catch (err) {
      console.error(err);
      setError('Failed to submit quiz.');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center">
        Loading quiz…
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-slate-950 text-red-400 flex items-center justify-center">
        {error}
      </div>
    );
  }

  if (!questions.length) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-400 flex items-center justify-center">
        No quiz available for this topic.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col">
      <AppHeader />

      <main className="flex-1 px-6 md:px-10 py-10">
        <div className="max-w-3xl mx-auto">

          <QuizHeader
            title={topicId}
            current={currentIndex + 1}
            total={questions.length}
          />

          <QuestionCard
            question={currentQuestion}
            selectedOption={answers[currentQuestion.id]}
            onSelect={handleSelect}
          />

          <QuizNavigation
            isFirst={currentIndex === 0}
            isLast={currentIndex === questions.length - 1}
            onPrev={() => setCurrentIndex((i) => i - 1)}
            onNext={() => setCurrentIndex((i) => i + 1)}
            onSubmit={handleSubmit}
          />

          {submitting && (
            <p className="mt-4 text-sm text-slate-400">
              Submitting quiz…
            </p>
          )}

        </div>
      </main>
    </div>
  );
}

export default QuizPage;