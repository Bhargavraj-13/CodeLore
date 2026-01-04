// Shows the quiz title and current question progress.

function QuizHeader({ title, current, total }) {
  return (
    <div className="mb-6">
      <h1 className="text-2xl font-semibold text-white mb-1">
         Quiz
      </h1>
      <p className="text-sm text-slate-400">
        Question {current} of {total}
      </p>
    </div>
  );
}

export default QuizHeader