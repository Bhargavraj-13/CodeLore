// Component to display a grid of topic cards on the home page

import TopicCard from './TopicCard.jsx';

function TopicGrid({ topics }) {
  if (!Array.isArray(topics) || topics.length === 0) {
    return (
      <div className="text-center text-slate-400 py-10">
        No topics found.
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-6 w-full">
      {topics.map((topic) => (
        <div key={topic._id} className="w-full max-w-4xl">
          <TopicCard topic={topic} />
        </div>
      ))}
    </div>
  );
}

export default TopicGrid;
