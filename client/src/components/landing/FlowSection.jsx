import FlowStep from '../ui/FlowStep.jsx';

function FlowSection({ steps }) {
  return (
    <section
      id="how-it-works"
      className="w-full max-w-6xl mx-auto min-h-screen flex items-center px-6 md:px-10 py-20 bg-slate-950 border-t-2 border-white/10"

    >
      <div className="max-w-6xl mx-auto grid gap-8 md:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] items-start">
        {/*How it works steps */}
        <div className="space-y-5">
          <h2 className="text-lg sm:text-xl font-semibold text-white">
            How CodeLore works
          </h2>
          <p className="text-sm text-slate-100/90 leading-relaxed max-w-xl">
            Each session is built around a single concept, a quick understanding check, and
            an explanation written in your own words. You learn better, and someone else
            learns from you too.
          </p>

          <div className="mt-3 rounded-2xl bg-slate-950/60 border border-white/10 p-4 sm:p-5 space-y-3">
            {steps.map((step, index) => (
              <FlowStep
                key={step.id}
                index={index + 1}
                title={step.title}
                description={step.description}
                isLast={index === steps.length - 1}
              />
            ))}
          </div>
        </div>

        {/*Session inside CodeLore card */}
        <div className="rounded-2xl border border-white/10 bg-slate-950/60 backdrop-blur-md p-5 md:p-6 shadow-lg flex flex-col gap-4">
          <div className="text-xs font-medium text-teal-200 uppercase tracking-[0.2em]">
            A SESSION INSIDE CODELORE
          </div>

          <div className="space-y-3 text-sm text-slate-100">
            <p>
              <span className="font-semibold text-teal-300">You:</span> Learn “Binary Search”
              using a structured lesson and visual explanation.
            </p>
            <p>
              <span className="font-semibold text-teal-300">CodeLore:</span> Gives you a short
              quiz to confirm you actually understood it.
            </p>
            <p>
              <span className="font-semibold text-teal-300">Then:</span> You write how you
              would explain Binary Search to a junior or a friend who's scared of DSA.
            </p>
          </div>

          <div className="mt-2 rounded-xl bg-slate-900/80 border border-slate-700/80 p-4">
            <p className="text-[11px] uppercase tracking-[0.18em] text-slate-400 mb-2">
              Why this matters
            </p>
            <p className="text-xs text-slate-100 leading-relaxed">
              When students explain in their own words, they discover gaps, remember longer,
              and simultaneously help someone who learns the way they do.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default FlowSection;