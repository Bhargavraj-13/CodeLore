function ResultCard({ title, score, total }) {
  const percent = Math.round((score / total) * 100);
  const passed = percent >= 60;

  return (
    <div className="bg-slate-800 rounded-lg p-6 space-y-4 shadow-md">
      <h3 className="text-lg font-semibold">{title}</h3>

      <p className="text-2xl font-bold">
        {score} / {total}
      </p>

      <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
        <div
          className={`h-full ${passed ? "bg-green-500" : "bg-red-500"}`}
          style={{
            width: `${percent}%`,
            transition: "width 800ms ease-out",
          }}
        />
      </div>

      <p className={`text-sm ${passed ? "text-green-400" : "text-red-400"}`}>
        {passed ? "Passed" : "Needs Improvement"}
      </p>
    </div>
  );
}

function ResultBreakdown({
  quizScore,
  quizTotal,
  codingScore,
  codingTotal,
}) {
  return (
    <div className="grid md:grid-cols-2 gap-6 px-6 py-8 max-w-4xl mx-auto">
      <ResultCard
        title="Quiz Score"
        score={quizScore}
        total={quizTotal}
      />
      <ResultCard
        title="Coding Score"
        score={codingScore}
        total={codingTotal}
      />
    </div>
  );
}

export default ResultBreakdown;
