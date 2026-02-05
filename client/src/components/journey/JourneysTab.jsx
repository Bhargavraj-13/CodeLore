import { useEffect, useState } from 'react';
import api from '../../lib/api.jsx';
import JourneyList from './JourneyList';

function JourneysTab({ topicId, active }) {
  const [journeys, setJourneys] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!active) return;

    async function loadJourneys() {
      try {
        setLoading(true);
        const res = await api.get(`/api/journeys/topic/${topicId}`);
        setJourneys(res.data.journeys || []);
      } finally {
        setLoading(false);
      }
    }

    loadJourneys();
  }, [active, topicId]);

  return <JourneyList journeys={journeys} loading={loading} />;
}

export default JourneysTab;
