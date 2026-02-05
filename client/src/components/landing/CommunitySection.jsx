// Component consisting of the community section on the landing page

function CommunitySection({ items }) {
  return (
    <section
      id="community"
      className="w-full max-w-6xl mx-auto min-h-screen flex items-center px-6 md:px-10 py-20 bg-slate-950 border-t-2 border-white/10"
    >
      <div className="max-w-5xl mx-auto space-y-6">
        <h2 className="text-lg sm:text-xl font-semibold text-white">
          A community built around explanations, not flexing
        </h2>

        <p className="text-sm text-slate-100/90 leading-relaxed">
          CodeLore is not about leaderboard screenshots or who solved the hardest problem.
          It's about students leaving behind clear, honest explanations…
        </p>

        <div className="grid gap-4 sm:grid-cols-3 text-sm">
          {items.map((point, idx) => (
            <div
              key={idx}
              className="rounded-xl border border-slate-700/80 bg-slate-950/70 p-4 space-y-2"
            >
              <p className="text-xs font-semibold text-teal-300 uppercase tracking-[0.16em]">
                {point.title}
              </p>
              <p className="text-slate-100/90">{point.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default CommunitySection;