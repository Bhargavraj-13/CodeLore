// Consists of list of topics started by the user in their profile

function MyTopics({ topics }) {
  if (!topics.length) {
    return (
      <p className="text-sm text-slate-400">
        You haven’t started any topics yet.
      </p>
    );
  }

  return (
    <div className="space-y-4">
      {topics.map(topic => (
        <div
          key={topic.topicId}
          className="flex items-center justify-between p-5 rounded-xl bg-slate-900/60 border border-white/10"
        >
          <div>
            <h3 className="font-medium">{topic.title}</h3>
            <p className="text-xs text-slate-400">
              {topic.difficulty} · {topic.status.replace('_', ' ')}
            </p>
          </div>

          {topic.status === 'COMPLETED' ? (
            <button className="text-sm font-medium text-teal-300 hover:text-teal-200">
              Write Journey →
            </button>
          ) : (
            <button className="text-sm font-medium hover:text-teal-300">
              Continue →
            </button>
          )}
        </div>
      ))}
    </div>
  );
}

export default MyTopics;