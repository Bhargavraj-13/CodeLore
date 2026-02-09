import { useEffect, useState } from "react";

function ResultRing({ passed, total }) {
  const percentage =
    total > 0 ? Math.round((passed / total) * 100) : 0;

  const radius = 70;
  const circumference = 2 * Math.PI * radius;

  const isZero = passed === 0;
  const isPartial = passed > 0 && passed < total;

  const [greenOffset, setGreenOffset] = useState(circumference);

  useEffect(() => {
    const targetOffset =
      circumference - (percentage / 100) * circumference;

    requestAnimationFrame(() => {
      setGreenOffset(targetOffset);
    });
  }, [percentage, circumference]);

  return (
    <div className="flex justify-center my-6 relative">
      <svg width="180" height="180" className="-rotate-90">
        {/* RED — failed portion */}
        <circle
          cx="90"
          cy="90"
          r={radius}
          strokeWidth="10"
          fill="transparent"
          strokeDasharray={circumference}
          strokeDashoffset={0}
          className={
            isZero
              ? "stroke-red-500"
              : isPartial
              ? "stroke-red-500/40"
              : "stroke-transparent"
          }
        />

        {/* GREEN — passed portion */}
        <circle
          cx="90"
          cy="90"
          r={radius}
          strokeWidth="10"
          fill="transparent"
          strokeDasharray={circumference}
          strokeDashoffset={greenOffset}
          strokeLinecap="round"
          className="stroke-green-500"
          style={{
            transition: "stroke-dashoffset 900ms ease-out",
          }}
        />
      </svg>

      {/* Center percentage */}
      <div
        className={`absolute inset-0 flex items-center justify-center text-2xl font-semibold ${
          percentage === 100
            ? "text-green-400"
            : percentage === 0
            ? "text-red-400"
            : "text-slate-200"
        }`}
      >
        {percentage}%
      </div>
    </div>
  );
}

export default ResultRing;
