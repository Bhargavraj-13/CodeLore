import AppHeader from '../components/layout/AppHeader.jsx';
import AppFooter from '../components/layout/AppFooter.jsx';
import HeroSection from '../components/landing/HeroSection.jsx';
import FeatureGrid from '../components/landing/FeatureGrid.jsx';
import FlowSection from '../components/landing/FlowSection.jsx';
import CommunitySection from '../components/landing/CommunitySection.jsx';

const FEATURE_CARDS = [
  {
    id: 1,
    subtitle: 'Feature 01',
    title: 'Concept-sized lessons',
    description:
      'Each session focuses on a single idea, like binary search, indexes, or caching so you never feel lost inside a giant chapter.',
  },
  {
    id: 2,
    subtitle: 'Feature 02',
    title: 'Understand-first quizzes',
    description:
      'Short, low-pressure checks that tell you whether the concept actually landed, instead of just testing your memory.',
  },
  {
    id: 3,
    subtitle: 'Feature 03',
    title: 'Explain-mode editor',
    description:
      'A guided editor that nudges you to turn your understanding into an explanation, story, or example another student can learn from.',
  },
];

const FLOW_STEPS = [
  {
    id: 1,
    title: 'Pick what you want to understand',
    description:
      "Search for a concept you're stuck on. You start with a focused lesson instead of a 40-page chapter.",
  },
  {
    id: 2,
    title: 'Learn, then test yourself',
    description:
      'Go through the explanation and visuals, then take a quick quiz so you and CodeLore can see what truly landed.',
  },
  {
    id: 3,
    title: 'Explain it in your own words',
    description:
      'Use the explain-mode editor to write how you would teach this to someone else. Your version becomes part of the library.',
  },
];

function LandingPage() {
  const handleJoinWaitlist = (source) => {
    // Later: call your backend API here
    console.log('Join waitlist action from:', source);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col">
      <AppHeader />

      <main className="flex-1 flex flex-col gap-12 md:gap-16">
        <HeroSection onJoinWaitlist={handleJoinWaitlist} />
        <FeatureGrid items={FEATURE_CARDS} />
        <FlowSection steps={FLOW_STEPS} />
        <CommunitySection />
      </main>

      <AppFooter />
    </div>
  );
}

export default LandingPage;