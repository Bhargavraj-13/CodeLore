function JourneyCard({ journey }) {
  return (
    <div className="border border-white/10 rounded-lg p-4 bg-slate-900">
      <p className="text-slate-300 mb-2">{journey.content}</p>
      <div className="text-xs text-slate-500">— {journey.author}</div>
    </div>
  );
}

export default JourneyCard;
