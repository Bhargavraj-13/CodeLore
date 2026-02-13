// client/src/components/coding/CodingHeader.jsx

import LanguageSelect from "./LanguageSelect.jsx";

function CodingHeader({
  problem,
  index,
  total,
  language,
  setLanguage,
  onRun,
  onPrev,
  onNext,
  onSubmit,
  isFirst,
  isLast,
  isRunning,
  isDisabled, // NEW: freeze UI when modal open
  onEndExam,
}) {
  return (
    <div className="relative flex items-center px-6 py-4 border-b border-white/10">

      {/* LEFT: Problem info */}
      <div className="flex-1">
        <h1 className="text-2xl font-semibold text-teal-400">
          {problem?.title}
        </h1>
        <p className="text-white text-sm">
          Problem {index + 1} of {total}
        </p>
      </div>

      {/* CENTER: Run + Submit */}
      <div className="absolute left-1/2 -translate-x-1/2 flex gap-4">
        <button
          type="button"
          onClick={onRun}
          disabled={isRunning || isDisabled}
          className="
            px-4 py-2 rounded-md
            bg-teal-500 text-slate-900
            shadow-md
            transition-all duration-150
            hover:bg-teal-400 hover:shadow-lg
            active:bg-teal-600 active:shadow-sm active:translate-y-[1px]
            disabled:opacity-40 disabled:cursor-not-allowed
            disabled:shadow-none disabled:translate-y-0
          "
        >
          Run
        </button>

        <button
          type="button"
          onClick={onSubmit}
          disabled={isDisabled}
          className="
            px-4 py-2 rounded-md font-medium
            bg-orange-500 text-slate-900
            shadow-md
            transition-all duration-150
            hover:bg-orange-400 hover:shadow-lg
            active:bg-orange-600 active:shadow-sm active:translate-y-[1px]
            disabled:opacity-40 disabled:cursor-not-allowed
            disabled:shadow-none disabled:translate-y-0
          "
        >
          Submit
        </button>
      </div>

      {/* RIGHT: Language + Navigation */}
      <div className="flex-1 flex justify-end items-center gap-4">
        <LanguageSelect
          language={language}
          setLanguage={setLanguage}
          disabled={isDisabled}
        />

        <button
          type="button"
          onClick={onPrev}
          disabled={isFirst || isDisabled}
          className="
            px-4 py-2 rounded-md
            bg-slate-700 text-slate-100
            shadow-md
            transition-all duration-150
            hover:bg-slate-600 hover:shadow-lg
            active:bg-slate-800 active:shadow-sm active:translate-y-[1px]
            disabled:opacity-40 disabled:cursor-not-allowed
            disabled:shadow-none disabled:translate-y-0
          "
        >
          Prev
        </button>

        {isLast ? (
  <button
    type="button"
    onClick={onEndExam}
    className="
      px-4 py-2 rounded-md
      bg-red-500 text-slate-900
      transition-all duration-150
      hover:bg-red-600
    "
  >
    Finish
  </button>
) : (
  <button
    type="button"
    onClick={onNext}
    className="
      px-4 py-2 rounded-md
      bg-teal-500 text-slate-900
      transition-all duration-150
      hover:bg-teal-400
    "
  >
    Next
  </button>
)}

      </div>
    </div>
  );
}

export default CodingHeader;
