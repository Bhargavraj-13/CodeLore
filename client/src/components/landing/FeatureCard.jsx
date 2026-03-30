// Component for a single feature card on the landing page

function FeatureCard({ subtitle, title, description }) {
  return (
    <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/15 shadow-sm transition-transform duration-200 hover:-translate-y-1 hover:bg-white/15">
      <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-teal-300 mb-2">
        {subtitle}
      </h3>
      <h2 className="text-xl font-semibold text-white mb-3">{title}</h2>
      <p className="text-sm text-slate-200 leading-relaxed">{description}</p>
    </div>
  );
}

export default FeatureCard;