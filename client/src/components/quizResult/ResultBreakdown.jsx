// Displays per-question results with correct and selected answers.

function ResultBreakdown({ results }) {
  return (
    <div className="space-y-4">
      {results.map((r, idx) => {
        const isAnswered = r.selectedOptionIndex !== null;
        const isCorrect = r.isCorrect;

        const selectedText = isAnswered
          ? r.options[r.selectedOptionIndex]
          : 'Not answered';

        const correctText = r.options[r.correctOption];

        const borderColor = isCorrect
          ? 'border-green-400/60'
          : 'border-red-400/60';

        return (
          <div
            key={r.questionId}
            className={`border ${borderColor} rounded-lg p-4 bg-slate-900/40`}
          >
            <p className="text-sm text-slate-400 mb-1">
              Question {idx + 1}
            </p>

            <p className="text-slate-100 mb-3">
              {r.question}
            </p>

            <div className="text-sm space-y-1">
              <p
                className={
                  isCorrect
                    ? 'text-green-400'
                    : 'text-red-400'
                }
              >
                Your answer: {selectedText}
              </p>

              {!isCorrect && (
                <p className="text-green-400">
                  Correct answer: {correctText}
                </p>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default ResultBreakdown;
