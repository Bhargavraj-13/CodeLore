function JourneyCard({ journey }) {
  return (
    <div className="border border-white/10 rounded-lg p-5 bg-slate-900 hover:border-white/20 transition">
      <p className="text-slate-300 mb-3 line-clamp-3">
        {journey.content}
      </p>

      <div className="text-xs text-slate-500 flex justify-between">
        <span>— {journey.author}</span>
        <span>{new Date(journey.createdAt).toLocaleDateString()}</span>
      </div>
    </div>
  );
}

export default JourneyCard;