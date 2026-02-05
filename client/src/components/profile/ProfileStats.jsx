// Consists of completed and in-progress topic stats for the user profile

function ProfileStats({ myTopics = [] }) {
  const completed = myTopics.filter(t => t.status === 'COMPLETED').length;
  const inProgress = myTopics.filter(t => t.status === 'IN_PROGRESS').length;

  return (
    <div className="grid grid-cols-2 gap-4">
      {/* Completed */}
      <div className="rounded-xl bg-slate-900/60 border border-teal-400/40 p-5 shadow-[0_0_12px_rgba(45,212,191,0.25)]">
        <p className="text-sm text-slate-400">Completed</p>
        <p className="text-2xl font-semibold text-teal-300">{completed}</p>
      </div>

      {/* In Progress */}
      <div className="rounded-xl bg-slate-900/60 border border-orange-400/40 p-5 shadow-[0_0_12px_rgba(251,146,60,0.25)]">
        <p className="text-sm text-slate-400">In Progress</p>
        <p className="text-2xl font-semibold text-orange-300">{inProgress}</p>
      </div>
    </div>
  );
}

export default ProfileStats;