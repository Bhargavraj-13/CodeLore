import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import AppHeader from '../components/layout/AppHeader.jsx';
import api from '../lib/api.jsx';
import ReactMarkdown from 'react-markdown';

function TopicPage() {
  const { topicId } = useParams();

  const [content, setContent] = useState('');
  const [activeTab, setActiveTab] = useState('content');

  const [journeys, setJourneys] = useState([]);
  const [journeysLoading, setJourneysLoading] = useState(false);

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

  useEffect(() => {
    if (activeTab !== 'journeys') return;

    async function loadJourneys() {
      try {
        setJourneysLoading(true);
        const res = await api.get(`/api/journeys/topic/${topicId}`);
        setJourneys(res.data.journeys || []);
      } finally {
        setJourneysLoading(false);
      }
    }

    loadJourneys();
  }, [activeTab, topicId]);

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

          {/* ===== Chrome-style Tabs ===== */}
          <div className="flex justify-center">
            <div className="flex gap-2 w-fit relative z-10">

              <button
                onClick={() => setActiveTab('content')}
                className={`px-5 py-2 text-sm font-medium rounded-t-xl
                  ${
                    activeTab === 'content'
                      ? 'bg-slate-950 text-white border border-white/10 border-b-0'
                      : 'text-slate-400 border border-white/10 hover:text-slate-200'
                  }`}
              >
                Content
              </button>

              <button
                onClick={() => setActiveTab('journeys')}
                className={`px-5 py-2 text-sm font-medium rounded-t-xl
                  ${
                    activeTab === 'journeys'
                      ? 'bg-slate-950 text-white border border-white/10 border-b-0'
                      : 'text-slate-400 border border-white/10 hover:text-slate-200'
                  }`}
              >
                Journeys
              </button>
            </div>
          </div>

          {/* ===== Content Box ===== */}
          <div className="border border-white/10 rounded-xl rounded-t-none p-6 bg-slate-950">

            {activeTab === 'content' && (
              <ReactMarkdown
                components={{
                  h1: ({ children }) => (
                    <div className="mt-10 mb-8">
                      <h1 className="text-3xl font-semibold mb-4">{children}</h1>
                      <hr className="border-white/10" />
                    </div>
                  ),
                  h2: ({ children }) => (
                    <div className="mt-8 mb-6">
                      <h2 className="text-2xl font-semibold mb-3">{children}</h2>
                      <hr className="border-white/10" />
                    </div>
                  ),
                  p: ({ children }) => (
                    <p className="text-slate-300 leading-relaxed mb-4">{children}</p>
                  ),
                  ul: ({ children }) => (
                    <ul className="list-disc ml-6 space-y-2 text-slate-300">{children}</ul>
                  ),
                  li: ({ children }) => <li className="ml-2">{children}</li>,
                }}
              >
                {content}
              </ReactMarkdown>
            )}

            {activeTab === 'journeys' && (
              <div className="space-y-6">
                {journeysLoading && <p className="text-slate-400">Loading journeys…</p>}
                {!journeysLoading && journeys.length === 0 && (
                  <p className="text-slate-400">No journeys yet for this topic.</p>
                )}
                {journeys.map((j) => (
                  <div
                    key={j.id}
                    className="border border-white/10 rounded-lg p-4 bg-slate-900"
                  >
                    <p className="text-slate-300 mb-2">{j.content}</p>
                    <div className="text-xs text-slate-500">— {j.author}</div>
                  </div>
                ))}
              </div>
            )}

          </div>
        </div>
      </main>
    </div>
  );
}

export default TopicPage;
