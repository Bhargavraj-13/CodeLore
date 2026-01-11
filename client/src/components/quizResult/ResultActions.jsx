// Handles quiz navigation actions (backToTopic, reAttempt).

function ResultActions({ onBackToTopic, reAttempt, reAttemptLabel }) {
  return (
    <div className="flex justify-center gap-4 pt-4">
      <button
        onClick={onBackToTopic}
        className="px-4 py-2 rounded-md
                   border border-teal-400/60
                   hover:bg-teal-500/60"
      >
        Back to Topic
      </button>

      <button
        onClick={reAttempt}
        className="px-4 py-2 rounded-md
                   bg-teal-500
                   hover:bg-teal-500
                   text-slate-900"
      >
        {reAttemptLabel || "ReAttempt"}
      </button>
    </div>
  );
}

export default ResultActions;
