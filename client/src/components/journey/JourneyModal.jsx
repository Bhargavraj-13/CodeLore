import { useState } from 'react';
import api from '../../lib/api.jsx';

function JourneyModal({ topicId, onClose, onSuccess }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setError('');

    if (!title.trim()) return setError('Please add a title');
    if (title.length > 100) return setError('Title must be under 100 characters');
    if (content.length < 50) return setError('Minimum 50 characters required for content');

    try {
      setLoading(true);
      await api.post('/api/journey', { topicId, title, content });
      onSuccess();
      onClose();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create journey');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 px-4">
      <div className="bg-slate-900 border border-white/10 rounded-xl p-6 w-full max-w-lg space-y-4">

        <h2 className="text-lg font-semibold">Add Your Journey</h2>

        {/* Title */}
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Give your journey a title..."
          maxLength={100}
          className="w-full p-3 rounded-lg bg-slate-800 border border-white/10 text-white outline-none text-sm"
        />

        {/* Content */}
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Share your learning experience... (min 50 characters)"
          className="w-full h-36 p-3 rounded-lg bg-slate-800 border border-white/10 text-white outline-none text-sm resize-none"
        />

        <div className="flex items-center justify-between">
          <span className="text-xs text-slate-500">{content.length}/2000</span>
          {error && <p className="text-red-400 text-sm">{error}</p>}
        </div>

        <div className="flex justify-end gap-3">
          <button onClick={onClose} className="px-4 py-2 text-sm text-slate-400">
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="px-4 py-2 text-sm bg-white text-black rounded-lg disabled:opacity-50"
          >
            {loading ? 'Saving...' : 'Save'}
          </button>
        </div>

      </div>
    </div>
  );
}

export default JourneyModal;