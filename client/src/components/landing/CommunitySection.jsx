function CommunitySection() {
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
          It's about students leaving behind clear, honest explanations of how concepts
          finally made sense to them, so the next person doesn't have to struggle alone.
        </p>

        <div className="grid gap-4 sm:grid-cols-3 text-sm">
          <div className="rounded-xl border border-slate-700/80 bg-slate-950/70 p-4 space-y-2">
            <p className="text-xs font-semibold text-teal-300 uppercase tracking-[0.16em]">
              Real voices
            </p>
            <p className="text-slate-100/90">
              Read explanations written by students at different levels, not just one
              “official” version.
            </p>
          </div>

          <div className="rounded-xl border border-slate-700/80 bg-slate-950/70 p-4 space-y-2">
            <p className="text-xs font-semibold text-teal-300 uppercase tracking-[0.16em]">
              Find your style
            </p>
            <p className="text-slate-100/90">
              Some people like analogies, some like visuals, some like step-by-step logic.
              Filter and save what works for you.
            </p>
          </div>

          <div className="rounded-xl border border-slate-700/80 bg-slate-950/70 p-4 space-y-2">
            <p className="text-xs font-semibold text-teal-300 uppercase tracking-[0.16em]">
              Give back
            </p>
            <p className="text-slate-100/90">
              Your explanation might be the one that finally clicks for someone else. You're
              not just learning, you're teaching too.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CommunitySection;