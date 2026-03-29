import { useState } from 'react';
import api from '../../lib/api.jsx';

function JourneyModal({ topicId, onClose, onSuccess }) {
  const [content, setContent] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    try {
      setError('');

      if (content.length < 50) {
        return setError('Minimum 50 characters required');
      }

      setLoading(true);

      await api.post('/api/journey', {
        topicId,
        content,
      });

      onSuccess();
      onClose();

    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create journey');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">

      <div className="bg-slate-900 border border-white/10 rounded-xl p-6 w-full max-w-lg">

        <h2 className="text-lg font-semibold mb-4">Add Your Journey</h2>

        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Share your learning experience..."
          className="w-full h-32 p-3 rounded-lg bg-slate-800 border border-white/10 text-white outline-none"
        />

        {error && (
          <p className="text-red-400 text-sm mt-2">{error}</p>
        )}

        <div className="flex justify-end gap-3 mt-5">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm text-slate-400"
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="px-4 py-2 text-sm bg-white text-black rounded-lg"
          >
            {loading ? 'Saving...' : 'Save'}
          </button>
        </div>

      </div>
    </div>
  );
}

export default JourneyModal;