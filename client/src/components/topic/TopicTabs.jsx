function TopicTabs({ activeTab, setActiveTab }) {
  return (
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
  );
}

export default TopicTabs;