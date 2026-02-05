// Component to display individual topic cards with dynamic styling based on difficulty level

import { Link } from "react-router-dom";

function TopicCard({ topic }) {
  let bg = "";
  let text = "text-white";
  let badgeBorder = "border-white/20";

  let cardBorder = "border-white/10";
  let shadow = "shadow-lg";

  const level = topic.difficulty?.toLowerCase();

  if (level === "beginner") {
    bg = "bg-[#9EFF7C]";
    text = "text-slate-900";
    badgeBorder = "border-[#9EFF7C]";
    cardBorder = "border-[#9EFF7C]/40";
    shadow = "shadow-[0_0_15px_#9EFF7C80]";
  } else if (level === "intermediate") {
    bg = "bg-[#FFB02E]";
    text = "text-slate-900";
    badgeBorder = "border-[#FFB02E]";
    cardBorder = "border-[#FFB02E]/40";
    shadow = "shadow-[0_0_15px_#FFB02E80]";
  } else if (level === "advanced") {
    bg = "bg-[#E53935]";
    badgeBorder = "border-[#E53935]";
    cardBorder = "border-[#E53935]/40";
    shadow = "shadow-[0_0_15px_#E5393580]";
  } else {
    bg = "bg-slate-800";
    badgeBorder = "border-slate-700";
  }

  return (
    <div
      className={`
        rounded-xl bg-slate-900/60 backdrop-blur-md p-5 transition-all
        ${cardBorder} ${shadow} hover:scale-[1.01]
      `}
    >
      <h3 className="text-lg font-semibold mb-1">{topic.title}</h3>
      <p className="text-sm text-slate-300 mb-3 leading-relaxed">
        {topic.description}
      </p>

      <div className="flex items-center justify-between mt-3">
        <span
          className={`text-xs px-3 py-1 rounded-md capitalize font-medium ${bg} ${text} ${badgeBorder}`}
        >
          {topic.difficulty}
        </span>

    <Link
        to={`/topics/${topic.contentKey}`}
        className="text-sm font-medium text-teal-300 hover:text-teal-200">
        Start Learning →
      </Link>
      </div>
    </div>
  );
}

export default TopicCard;
