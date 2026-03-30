import { useNavigate } from 'react-router-dom';

function ResultCTA({ overall, quizPassed, codingPassed, topicId, contentKey }) {
  const navigate = useNavigate();

  if (overall.passed) {
    return (
      <div className="text-center space-y-5 py-12">
        <h3 className="text-2xl font-semibold">Capture Your Learning</h3>
        <p className="text-slate-400 max-w-xl mx-auto">
          Writing your journey reinforces what you've learned and builds a visible track of your growth.
        </p>
        {/* Navigate to topic page journeys tab — a real existing route */}
        <button
          onClick={() => navigate(`/topics/${topicId}`, { state: { tab: 'journeys' } })}
          className="px-6 py-3 rounded-lg bg-teal-400 text-slate-900 font-medium hover:bg-teal-300 transition"
        >
          Write Your Journey →
        </button>
      </div>
    );
  }

  let message = '';
  let actionText = '';
  let actionPath = '';

  if (!quizPassed && !codingPassed) {
    message = 'Go back, strengthen your fundamentals, and come back stronger.';
    actionText = 'Go to Topic';
    actionPath = `/topics/${contentKey || topicId}`;
  } else if (!quizPassed) {
    message = 'Concepts need a bit more clarity. You\'re close.';
    actionText = 'Retry Quiz';
    actionPath = `/quiz/${topicId}`;
  } else {
    message = 'Logic is there. Refine your implementation.';
    actionText = 'Retry Coding';
    actionPath = `/coding/${topicId}`;
  }

  return (
    <div className="text-center space-y-5 py-12">
      <h3 className="text-2xl font-semibold text-red-400">Keep Improving!</h3>
      <p className="text-slate-400 max-w-xl mx-auto">{message}</p>
      <button
        onClick={() => navigate(actionPath)}
        className="px-6 py-3 rounded-lg bg-red-500 text-white font-medium hover:bg-red-600 transition"
      >
        {actionText}
      </button>
    </div>
  );
}

export default ResultCTA;
