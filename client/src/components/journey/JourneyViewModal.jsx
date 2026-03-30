import { useEffect } from 'react';

function JourneyViewModal({ journey, onClose }) {

  // Close on Escape key
  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center px-4"
      onClick={onClose}  // click backdrop to close
    >
      <div
        className="bg-slate-900 border border-white/10 rounded-2xl w-full max-w-xl h-[480px] 
                   flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}  // prevent backdrop click inside
      >

        {/* Header — fixed */}
        <div className="flex items-start justify-between px-6 pt-6 pb-4 border-b border-white/10 shrink-0">
          <div>
            {journey.title && (
              <h2 className="text-white font-semibold text-lg">{journey.title}</h2>
            )}
            <div className="text-xs text-slate-500 mt-1 flex gap-3">
              <span>{journey.author}</span>
              <span>·</span>
              <span>{new Date(journey.createdAt).toLocaleDateString()}</span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-500 hover:text-white transition text-xl leading-none ml-4"
          >
            ✕
          </button>
        </div>

        {/* Content — scrollable inside fixed box */}
        <div className="px-6 py-5 overflow-y-auto flex-1 text-slate-300 text-sm leading-relaxed whitespace-pre-wrap">
          {journey.content}
        </div>

      </div>
    </div>
  );
}

export default JourneyViewModal;