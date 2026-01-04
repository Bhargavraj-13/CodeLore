// Handles quiz navigation actions (previous, next, submit).

function QuizNavigation({
  isFirst,
  isLast,
  onPrev,
  onNext,
  onSubmit,
}) {
  return (
    <div className="flex items-center justify-between mt-6">
      <button
  disabled={isFirst}
  onClick={onPrev}
  className="px-4 py-2 text-sm rounded-md
             border border-teal-400/60
             text-slate-300
             disabled:opacity-40
             hover:bg-teal-900/20"
>
  Previous
</button>

      {isLast ? (
        <button
          onClick={onSubmit}
          className="px-6 py-2 text-sm rounded-md bg-orange-500 text-slate-200 font-semibold hover:bg-orange-600 transition"
        >
          Submit Quiz
        </button>
      ) : (
        <button
  onClick={onNext}
  className="px-6 py-2 text-sm rounded-md
             bg-teal-400/90 text-slate-900
             hover:bg-teal-500
             transition"
>
  Next
</button>

      )}
    </div>
  );
}

export default QuizNavigation;
