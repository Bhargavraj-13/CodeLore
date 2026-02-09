function ResultMessage({ passed, total, isLast, onNext, onRetry }) {
  const isSuccess = passed === total;
  const isZero = passed === 0;
  const isPartial = passed > 0 && passed < total;

  return (
    <div className="text-center space-y-4">
      {/* Heading */}
      <h2 className="text-xl font-semibold">
        {isSuccess
          ? "Congratulations!"
          : isZero
          ? "This is a good starting point"
          : "You're getting closer"}
      </h2>

      {/* Summary */}
      <p className="text-slate-300 text-sm">
        {passed} out of {total} test cases passed
      </p>

      {/* Guidance message */}
      {!isSuccess && (
        <p className="text-slate-400 text-sm max-w-sm mx-auto">
          {isZero
            ? "Try revisiting the logic and run the sample test cases."
            : "This one needs another pass. You're getting closer."}
        </p>
      )}

      {/* CTA */}
      <div className="pt-4">
        {isSuccess ? (
          isLast ? (
            /* ✅ Last question success → OK */
            <button
              onClick={onRetry}
              className="
                px-4 py-2 rounded-md
                bg-slate-700 text-slate-100
                transition-all duration-150
                hover:bg-slate-600
              "
            >
              OK
            </button>
          ) : (
            /* ✅ Not last → Next */
            <button
              onClick={onNext}
              className="
                px-4 py-2 rounded-md
                bg-green-500 text-slate-900
                transition-all duration-150
                hover:bg-green-600
              "
            >
              Next
            </button>
          )
        ) : (
          /* ❌ Failure / Partial → Try Again */
          <button
            onClick={onRetry}
            className="
              px-4 py-2 rounded-md
              text-red-300
              bg-red-400/10
              font-medium
              transition-all duration-150
              hover:bg-red-400/15
              hover:text-red-200
              active:bg-red-400/20
            "
          >
            Try Again
          </button>
        )}
      </div>
    </div>
  );
}

export default ResultMessage;
