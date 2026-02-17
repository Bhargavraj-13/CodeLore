function ResultCTA({ passed, onJourney }) {
  if (!passed) return null;

  return (
    <div className="text-center space-y-4 py-10">
      <h3 className="text-2xl font-semibold">
        Capture Your Learning
      </h3>

      <p className="text-slate-400 max-w-xl mx-auto">
        Writing your journey helps reinforce concepts and
        builds a visible track record of growth.
      </p>

      <button
        onClick={onJourney}
        className="
          px-6 py-3 rounded-md
          bg-green-500 text-slate-900
          font-medium
          transition-all duration-200
          hover:bg-green-600
        "
      >
        Write Your Journey
      </button>
    </div>
  );
}

export default ResultCTA;
