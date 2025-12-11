import Logo from '../ui/Logo.jsx'; 
import { useNavigate } from "react-router-dom";

const NAV_ITEMS = [
  { label: 'Features', targetId: 'features' },
  { label: 'How it works', targetId: 'how-it-works' },
  { label: 'Community', targetId: 'community' },
];

function scrollToSection(id) {
  const section = document.getElementById(id);
  if (section) {
    section.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

function AppHeader() {
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-40 bg-slate-950/80 backdrop-blur border-b border-white/10">
      <div className="flex w-full items-center justify-between px-6 md:px-10 py-3">
        <button
          type="button"
          onClick={() => scrollToSection('hero')}
          className="flex items-center gap-2"
        >
          <Logo />
        </button>

        <nav className="hidden md:flex items-center gap-6 text-sm text-slate-200">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.targetId}
              type="button"
              onClick={() => scrollToSection(item.targetId)}
              className="hover:text-teal-300 transition-colors"
            >
              {item.label}
            </button>
          ))}
        </nav>

        <button
          type="button"
          onClick={() => navigate('/login')}
          className="hidden sm:inline-flex items-center justify-center rounded-lg bg-teal-400 px-4 py-2 text-xs font-semibold text-slate-950 shadow-sm hover:bg-teal-300 transition-colors"
        >
          Login
        </button>
      </div>
    </header>
  );
}

export default AppHeader;