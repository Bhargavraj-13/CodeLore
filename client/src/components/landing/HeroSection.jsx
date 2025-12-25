// Displays the main introductory section of the landing page with branding and call-to-action buttons.

import { useNavigate } from 'react-router-dom'; 
import backgroundVideo from '../../assets/videos/bg_video.mp4';

function HeroSection() {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/login'); 
  };

  const handleSeeHowItWorks = () => {
    const section = document.getElementById('how-it-works');
    if (section) {
      section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section
      id="hero"
      className="relative w-full min-h-screen flex items-center px-6 md:px-10 py-20"
    >
      {/* Background video */}
      <div className="absolute inset-0 overflow-hidden">
        <video
          className="w-full h-full object-cover"
          src={backgroundVideo}
          autoPlay
          muted
          loop
          playsInline
        />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/70 via-slate-950/40 to-slate-950/90" />
      </div>

      {/* Foreground content */}
      <div className="relative z-10 max-w-3xl mx-auto text-center space-y-6">
        <div className="inline-flex items-center justify-center rounded-full bg-slate-950/40 border border-white/20 px-4 py-1 text-[11px] uppercase tracking-[0.22em] text-slate-200">
          Learn • Understand • Teach
        </div>

        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-[0.35em] uppercase text-white">
          C O D E L O R E
        </h1>

        <p className="text-sm sm:text-base text-slate-100/90 max-w-xl mx-auto">
          A learning space where students move beyond memorising, and explain concepts in a way others can truly understand.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <button
            type="button"
            onClick={handleGetStarted}
            className="inline-flex items-center justify-center rounded-lg bg-teal-400 px-6 py-2.5 text-sm font-semibold text-slate-950 shadow-sm hover:bg-teal-300 transition-colors min-w-[150px]"
          >
            Get Started
          </button>

          <button
            type="button"
            className="inline-flex items-center justify-center rounded-lg border border-white/40 bg-slate-950/40 px-5 py-2.5 text-sm font-medium text-slate-50 hover:bg-slate-900/70 transition-colors"
            onClick={handleSeeHowItWorks}
          >
            See how it works
          </button>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;