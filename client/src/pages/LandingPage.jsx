// Landing page component assembling all landing sections

import LandingHeader from '../components/layout/LandingHeader.jsx';
import AppFooter from '../components/layout/AppFooter.jsx';
import HeroSection from '../components/landing/HeroSection.jsx';
import FeatureGrid from '../components/landing/FeatureGrid.jsx';
import FlowSection from '../components/landing/FlowSection.jsx';
import CommunitySection from '../components/landing/CommunitySection.jsx';
import { FEATURE_CARDS } from '../components/landing/FeatureCards.jsx';
import { FLOW_STEPS } from '../components/landing/FlowSteps.jsx';
import { COMMUNITY_POINTS } from '../components/landing/CommunityData.jsx';

function LandingPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col">
      {/* Header */}
      <LandingHeader />

      {/* Main Sections */}
      <main className="flex-1 flex flex-col gap-12 md:gap-16">
        <HeroSection />
        <FeatureGrid items={FEATURE_CARDS} />
        <FlowSection steps={FLOW_STEPS} />
        <CommunitySection items={COMMUNITY_POINTS} />
      </main>

      {/* Footer */}
      <AppFooter />
    </div>
  );
}

export default LandingPage;