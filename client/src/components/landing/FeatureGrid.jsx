// Component to display a grid of feature cards on the landing page

import FeatureCard from './FeatureCard.jsx';

function FeatureGrid({ items }) {
  return (
    <section
      id="features"
      className="w-full max-w-6xl mx-auto min-h-screen flex items-center px-6 md:px-10 py-20 bg-slate-950 border-t-4 border-white/10"

    >
      <div className="max-w-6xl mx-auto space-y-6">
        <h2 className="text-lg sm:text-xl font-semibold text-white">
          Features designed around real learning
        </h2>
        <p className="text-sm text-slate-100/90 max-w-2xl leading-relaxed">
          Every part of CodeLore is built to make you slow down, think, and then explain.
          You don't just complete a topic, you leave behind your version of it.
        </p>

        <div className="grid gap-4 md:grid-cols-3">
          {items.map((item) => (
            <FeatureCard
              key={item.id}
              subtitle={item.subtitle}
              title={item.title}
              description={item.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default FeatureGrid;