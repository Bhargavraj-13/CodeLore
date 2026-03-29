import { useEffect, useState } from 'react';
import api from '../../lib/api.jsx';
import JourneyCard from './JourneyCard.jsx';
import JourneyModal from './JourneyModal.jsx';

function JourneySection({ topicId }) {
  const [journeys, setJourneys] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    async function loadJourneys() {
      try {
        setLoading(true);
        const res = await api.get(`/api/journey/topic/${topicId}`);
        setJourneys(res.data.journeys || []);
      } finally {
        setLoading(false);
      }
    }

    loadJourneys();
  }, [topicId]);

  const refreshJourneys = async () => {
    const res = await api.get(`/api/journey/topic/${topicId}`);
    setJourneys(res.data.journeys || []);
  };

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold">Journeys</h2>

        <button
          onClick={() => setShowModal(true)}
          className="px-4 py-2 text-sm bg-white text-black rounded-lg hover:bg-slate-200"
        >
          + Add Your Journey
        </button>
      </div>

      {/* Loading */}
      {loading && <p className="text-slate-400">Loading journeys…</p>}

      {/* Empty */}
      {!loading && journeys.length === 0 && (
        <div className="text-center text-slate-400 space-y-3">
          <p>No journeys yet.</p>
        </div>
      )}

      {/* List */}
      {journeys.map((j) => (
        <JourneyCard key={j.id} journey={j} />
      ))}

      {showModal && (
        <JourneyModal
          topicId={topicId}
          onClose={() => setShowModal(false)}
          onSuccess={refreshJourneys}
        />
      )}
    </div>
  );
}

export default JourneySection;