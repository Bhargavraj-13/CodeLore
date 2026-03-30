function JourneyCard({ journey, onClick }) {
  return (
    <div
      onClick={onClick}
      className="border border-white/10 rounded-xl p-5 bg-slate-900 hover:border-white/30 
                 hover:bg-slate-800/60 transition cursor-pointer flex flex-col justify-between h-48"
    >
      {/* Title */}
      <div>
        {journey.title && (
          <p className="text-white font-medium mb-2 truncate">{journey.title}</p>
        )}
        <p className="text-slate-400 text-sm line-clamp-3">{journey.content}</p>
      </div>

      {/* Footer */}
      <div className="text-xs text-slate-500 flex justify-between mt-4">
        <span>— {journey.author}</span>
        <span>{new Date(journey.createdAt).toLocaleDateString()}</span>
      </div>
    </div>
  );
}

export default JourneyCard;