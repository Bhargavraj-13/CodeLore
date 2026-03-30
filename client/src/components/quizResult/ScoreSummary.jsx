// Shows the overall quiz score and correctness summary.

function ScoreSummary({ score, correctCount, totalQuestions }) {
  const isPerfect = score === 10;
  const isPass = score >= 8;

  return (
    <div className="text-center space-y-3">

      {/* Result message */}
      <p className="text-base">
        {isPerfect ? (
          <span>
            Outstanding! You scored a <span className="text-green-400 font-semibold">perfect 100%</span> 🎉
          </span>
        ) : isPass ? (
          <span>
            Congratulations, you <span className="text-green-400 font-semibold">passed</span> the quiz!
          </span>
        ) : (
          <span>
            You <span className="text-red-400 font-semibold">failed</span>. Try scoring more than 80% to pass.
          </span>
        )}
      </p>

      {/* Score */}
      <p className="text-4xl font-bold text-teal-400">
        {score*10}%
      </p>

      {/* Correctness summary */}
      <p className="text-slate-300">
        {correctCount} / {totalQuestions} correct
      </p>

    </div>
  );
}

export default ScoreSummary;
