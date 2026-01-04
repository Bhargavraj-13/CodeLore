import JourneyCard from './JourneyCard';

function JourneyList({ journeys, loading }) {
  if (loading) {
    return <p className="text-slate-400">Loading journeys…</p>;
  }

  if (!journeys.length) {
    return <p className="text-slate-400">No journeys yet for this topic.</p>;
  }

  return (
    <div className="space-y-6">
      {journeys.map((journey) => (
        <JourneyCard key={journey.id} journey={journey} />
      ))}
    </div>
  );
}

export default JourneyList;
