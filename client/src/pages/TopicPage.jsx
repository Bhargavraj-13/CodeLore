import { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import AppHeader from '../components/layout/AppHeader.jsx';
import api from '../lib/api.jsx';

import TopicTabs from '../components/topic/TopicTabs.jsx';
import TopicContent from '../components/topic/TopicContent.jsx';
import JourneySection from '../components/journey';

function TopicPage() {
  const { topicId } = useParams();
  //console.log("Topic ID:", topicId);

  const [content, setContent] = useState('');
  const [activeTab, setActiveTab] = useState('content');

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadContent() {
      try {
        const res = await api.get(`/api/topics/${topicId}/content`);
        setContent(res.data.content);
      } catch {
        setError('Unable to load topic content.');
      } finally {
        setLoading(false);
      }
    }

    loadContent();
  }, [topicId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center">
        Loading content…
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-slate-950 text-red-400 flex items-center justify-center">
        {error}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col">
      <AppHeader />

      <main className="flex-1 px-6 md:px-10 py-10">
        <div className="max-w-5xl mx-auto">

          <TopicTabs activeTab={activeTab} setActiveTab={setActiveTab} />

          <div className="border border-white/10 rounded-xl rounded-t-none p-6 bg-slate-950">
            {activeTab === 'content' && <TopicContent
  content={content}
  onStartQuiz={() => navigate(`/quiz/${topicId}`)}
  onStartCoding={() => navigate(`/coding/${topicId}`)}
/>}

            {activeTab === 'journeys' && (
              <JourneySection topicId={topicId} />
            )}
          </div>

        </div>
      </main>
    </div>
  );
}

export default TopicPage;