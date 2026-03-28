function ResultCard({ title, score, total, percent, passed }) {
  return (
    <div className="bg-slate-800/40 backdrop-blur border border-slate-700 rounded-2xl p-6 space-y-5">
      <div className="flex justify-between items-center">
        <h3 className="text-slate-300 text-lg">{title}</h3>
        <span className={`text-sm ${passed ? "text-teal-400" : "text-red-400"}`}>
          {passed ? "Passed" : "Failed"}
        </span>
      </div>

      <div className="text-3xl font-semibold">
        {score} <span className="text-slate-500 text-lg">/ {total}</span>
      </div>

      <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
        <div
          className={`h-full ${
            passed ? "bg-teal-400" : "bg-red-500"
          }`}
          style={{ width: `${percent}%` }}
        />
      </div>

      <div className="text-right text-sm text-slate-400">
        {percent}%
      </div>
    </div>
  );
}

function ResultBreakdown({ quiz, coding }) {
  return (
    <div className="grid md:grid-cols-2 gap-6 px-6 py-10 max-w-5xl mx-auto">
      <ResultCard
        title="Quiz Score"
        {...quiz}
        passed={quiz.percent >= 60}
      />
      <ResultCard
        title="Coding Score"
        {...coding}
        passed={coding.percent >= 60}
      />
    </div>
  );
}

export default ResultBreakdown;