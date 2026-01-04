// Displays a quiz question and handles option selection UI.

function QuestionCard({ question, selectedOption, onSelect }) {
  return (
    <div
      className="
        border border-white/10
        rounded-2xl
        p-8
        bg-teal-900/20
        backdrop-blur-sm
        shadow-lg
        space-y-6
        h-[400px]
    overflow-y-auto
      "
    >
      <p className="text-lg text-slate-100 leading-relaxed">
        {question.question}
      </p>

      <div className="space-y-3">
        {question.options.map((opt, idx) => {
          const isSelected = selectedOption === idx;

          return (
            <button
              key={idx}
              onClick={() => onSelect(idx)}
              className={`
                w-full text-left px-5 py-4 rounded-xl border
                transition-colors duration-150
                ${
                  isSelected
                    ? 'border-teal-400 bg-teal-400/90 text-slate-900'
  : 'border-white/10 bg-slate-900/40 text-slate-200 hover:border-teal-300 hover:bg-teal-900/20'

                }
              `}
            >
              {opt}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default QuestionCard;
