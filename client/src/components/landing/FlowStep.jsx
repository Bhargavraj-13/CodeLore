// Component for a single step in the "How it works" section

function FlowStep({ index, title, description, isLast }) {
  return (
    <div className="flex gap-4 items-start">
      <div className="flex flex-col items-center">
        <div className="w-9 h-9 rounded-full bg-teal-400 text-black flex items-center justify-center font-semibold">
          {index}
        </div>
        {!isLast && (
          <div className="w-px flex-1 bg-gradient-to-b from-teal-400/70 to-transparent mt-2" />
        )}
      </div>
      <div>
        <h3 className="font-semibold text-white mb-1">{title}</h3>
        <p className="text-sm text-slate-200 leading-relaxed max-w-md">{description}</p>
      </div>
    </div>
  );
}

export default FlowStep;