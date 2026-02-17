import { useEffect, useState } from "react";

function ResultHero({ quizScore, quizTotal, codingScore, codingTotal }) {
  const quizPercent = (quizScore / quizTotal) * 100;
  const codingPercent = (codingScore / codingTotal) * 100;

  // Equal weight combination
  const overall = Math.round((quizPercent + codingPercent) / 2);

  const isPassed = overall >= 60;

  const radius = 90;
  const circumference = 2 * Math.PI * radius;

  const [offset, setOffset] = useState(circumference);
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    const targetOffset =
      circumference - (overall / 100) * circumference;

    requestAnimationFrame(() => {
      setOffset(targetOffset);
    });

    // count-up animation
    let start = 0;
    const interval = setInterval(() => {
      start += 1;
      if (start >= overall) {
        start = overall;
        clearInterval(interval);
      }
      setDisplayValue(start);
    }, 15);

    return () => clearInterval(interval);
  }, [overall, circumference]);

  return (
    <div className="text-center space-y-6 py-10 relative">
      {/* Subtle glow if passed */}
      {isPassed && (
        <div className="absolute inset-0 flex justify-center">
          <div className="w-[260px] h-[260px] bg-green-500/10 blur-3xl rounded-full" />
        </div>
      )}

      <h1 className="text-3xl font-semibold">
        Results
      </h1>

      <div className="flex justify-center relative">
        <svg width="220" height="220" className="-rotate-90">
          <circle
            cx="110"
            cy="110"
            r={radius}
            strokeWidth="14"
            fill="transparent"
            className="stroke-slate-700"
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
            className={
              isPassed ? "stroke-green-500" : "stroke-red-500"
            }
            style={{
              transition: "stroke-dashoffset 1s ease-out",
            }}
          />
        </svg>

        <div className="absolute inset-0 flex items-center justify-center text-4xl font-bold">
          {displayValue}%
        </div>
      </div>

      <div>
        <h2 className={`text-xl font-semibold ${isPassed ? "text-green-400" : "text-red-400"}`}>
          {isPassed ? "You Passed!" : "Almost There"}
        </h2>
        <p className="text-slate-400 text-sm mt-1">
          {isPassed
            ? "You've demonstrated strong fundamentals."
            : "Review weak areas and try again."}
        </p>
      </div>
    </div>
  );
}

export default ResultHero;
