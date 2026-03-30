import { useEffect, useState } from "react";

function ResultHero({ overall }) {
  const { percent, passed } = overall;

  const radius = 90;
  const circumference = 2 * Math.PI * radius;

  const [offset, setOffset] = useState(circumference);
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    const targetOffset =
      circumference - (percent / 100) * circumference;

    requestAnimationFrame(() => setOffset(targetOffset));

    let start = 0;
    const interval = setInterval(() => {
      start += 1;
      if (start >= percent) {
        start = percent;
        clearInterval(interval);
      }
      setDisplayValue(start);
    }, 15);

    return () => clearInterval(interval);
  }, [percent, circumference]);

  const stroke = passed ? "stroke-teal-400" : "stroke-red-500";
  const text = passed ? "text-teal-400" : "text-red-400";

  return (
    <div className="text-center space-y-6 py-12 relative">
      {/* Glow */}
      <div className="absolute inset-0 flex justify-center">
        <div
          className={`w-[300px] h-[300px] rounded-full blur-3xl ${
            passed ? "bg-teal-500/20" : "bg-red-500/20"
          }`}
        />
      </div>

      {/* Status Badge */}
      <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full border border-slate-700 bg-slate-800/40 text-sm text-slate-300">
        Assessment Complete
      </div>

      <h1 className="text-4xl font-semibold">Results</h1>

      <p className="text-slate-400">
        Here’s how you performed in this assessment.
      </p>

      {/* Circle */}
      <div className="flex justify-center relative">
        <svg width="220" height="220" className="-rotate-90">
          <circle
            cx="110"
            cy="110"
            r={radius}
            strokeWidth="14"
            fill="transparent"
            className="stroke-slate-800"
          />

          <circle
            cx="110"
            cy="110"
            r={radius}
            strokeWidth="14"
            fill="transparent"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            className={stroke}
            style={{ transition: "stroke-dashoffset 1s ease-out" }}
          />
        </svg>

        <div className={`absolute inset-0 flex items-center justify-center text-5xl font-bold ${text}`}>
          {displayValue}%
        </div>
      </div>

      <h2 className={`text-xl font-semibold ${text}`}>
        {passed ? "You Passed!" : "Keep Improving"}
      </h2>
    </div>
  );
}

export default ResultHero;