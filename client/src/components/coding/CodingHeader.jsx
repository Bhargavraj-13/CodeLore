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
  isFirst,
  isLast,
}) {
  return (
    <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
      <div>
        <h1 className="text-2xl font-semibold text-teal-400">
          {problem?.title}
        </h1>
        <p className="text-white text-sm">
          Problem {index + 1} of {total}
        </p>
      </div>

      <div className="flex gap-4 items-center mr-6">

        <LanguageSelect
            language={language}
            setLanguage={setLanguage}
        />

        <button
          onClick={onRun}
          className="px-4 py-2 bg-teal-500 text-slate-900 rounded-md"
        >
          Run
        </button>

        <button
          onClick={onPrev}
          disabled={isFirst}
          className="px-4 py-2 bg-slate-700 rounded-md disabled:opacity-40"
        >
          Prev
        </button>

        <button
            onClick={onNext}
            className={`px-4 py-2 rounded-md font-medium transition
                ${
                isLast
                    ? "bg-orange-500 hover:bg-orange-400"
                    : "bg-teal-500 hover:bg-teal-400"
                }
            `}
            >
            {isLast ? "Submit" : "Next"}
        </button>

      </div>
    </div>
  );
}

export default CodingHeader;
