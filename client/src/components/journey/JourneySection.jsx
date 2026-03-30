import { useEffect, useState } from 'react';
import api from '../../lib/api.jsx';
import JourneyCard from './JourneyCard.jsx';
import JourneyModal from './JourneyModal.jsx';
import JourneyViewModal from './JourneyViewModal.jsx';

function JourneySection({ topicId }) {
  const [journeys, setJourneys] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedJourney, setSelectedJourney] = useState(null);

  const loadJourneys = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await api.get(`/api/journey/topic/${topicId}`);
      setJourneys(res.data.journeys || []);
    } catch (err) {
      console.error('Failed to load journeys:', err);
      setError('Unable to load journeys. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    //console.log('Loading journeys for topic:', topicId);
    loadJourneys();
  }, [topicId]);

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold">Journeys</h2>
        <button
          onClick={() => setShowCreateModal(true)}
          className="px-4 py-2 text-sm bg-white text-black rounded-lg hover:bg-slate-200"
        >
          + Add Your Journey
        </button>
      </div>

      {loading && <p className="text-slate-400">Loading journeys…</p>}

      {error && (
        <div className="text-red-400 text-sm flex items-center gap-3">
          <span>{error}</span>
          <button onClick={loadJourneys} className="underline text-slate-300">Retry</button>
        </div>
      )}

      {!loading && !error && journeys.length === 0 && (
        <p className="text-center text-slate-400">No journeys yet. Be the first to share!</p>
      )}

      {/* 3-column grid */}
      {journeys.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {journeys.map((j) => (
            <JourneyCard
              key={j.id}
              journey={j}
              onClick={() => setSelectedJourney(j)}
            />
          ))}
        </div>
      )}

      {showCreateModal && (
        <JourneyModal
          topicId={topicId}
          onClose={() => setShowCreateModal(false)}
          onSuccess={loadJourneys}
        />
      )}

      {selectedJourney && (
        <JourneyViewModal
          journey={selectedJourney}
          onClose={() => setSelectedJourney(null)}
        />
      )}
    </div>
  );
}

export default JourneySection;