import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../lib/api.jsx';
import ReactMarkdown from 'react-markdown';

function TopicPage() {
  const { topicId } = useParams();

  const [content, setContent] = useState('');
  const [difficulty, setDifficulty] = useState('medium');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Difficulty → color mapping
  const difficultyColor = {
    beginner: 'text-teal-300',
    intermediate: 'text-yellow-300',
    advanced: 'text-red-400',
    medium: 'text-yellow-300',
  }[difficulty];

  useEffect(() => {
    async function loadTopic() {
      try {
        // fetch markdown content
        const res = await api.get(`/api/topics/${topicId}/content`);
        setContent(res.data.content);

        // OPTIONAL: fetch topic metadata if you have it
        // const meta = await api.get(`/api/topics/${topicId}`);
        // setDifficulty(meta.data.difficulty);
      } catch (err) {
        console.error('Error loading topic:', err);
        setError('Unable to load topic content.');
      } finally {
        setLoading(false);
      }
    }

    loadTopic();
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
      <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center text-red-400">
        {error}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white px-6 md:px-10 py-10">
      <div className="max-w-4xl mx-auto leading-relaxed space-y-6">

        <ReactMarkdown
          components={{
            h1: ({ children }) => (
              <>
                <h1 className={`text-3xl font-bold ${difficultyColor} mt-10`}>
                  {children}
                </h1>
                <hr className="my-6 border-white/10" />
              </>
            ),

            h2: ({ children }) => (
              <>
                <h2 className="text-2xl font-semibold text-white mt-8">
                  {children}
                </h2>
                <hr className="my-5 border-white/10" />
              </>
            ),

            h3: ({ children }) => (
              <h3 className="text-xl font-semibold text-slate-200 mt-6">
                {children}
              </h3>
            ),

            p: ({ children }) => (
              <p className="text-slate-300 leading-relaxed">
                {children}
              </p>
            ),

            ul: ({ children }) => (
              <ul className="list-disc ml-6 space-y-2 text-slate-300">
                {children}
              </ul>
            ),

            ol: ({ children }) => (
              <ol className="list-decimal ml-6 space-y-2 text-slate-300">
                {children}
              </ol>
            ),

            a: ({ ...props }) => (
              <a
                {...props}
                target="_blank"
                rel="noopener noreferrer"
                className="text-teal-300 hover:underline"
              />
            ),

            code: ({ inline, children }) =>
              inline ? (
                <code className="bg-slate-800 px-1.5 py-0.5 rounded text-teal-300 text-sm">
                  {children}
                </code>
              ) : (
                <pre className="bg-slate-900 border border-white/10 rounded-lg p-4 overflow-x-auto text-sm text-slate-200">
                  <code>{children}</code>
                </pre>
              ),
          }}
        >
          {content}
        </ReactMarkdown>

      </div>
    </div>
  );
}

export default TopicPage;
