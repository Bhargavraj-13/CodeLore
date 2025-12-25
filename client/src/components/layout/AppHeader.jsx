// Component for the header section of the application

import Logo from './Logo.jsx';
import profileIcon from '../../assets/images/Profile.png';
import { useNavigate } from 'react-router-dom';

function AppHeader() {
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-40 bg-slate-950/80 backdrop-blur border-b border-white/10">
      <div className="flex w-full items-center justify-between px-6 md:px-10 py-3">
        {/* Logo */}
        <button type="button" onClick={() => navigate('/home')} className="flex items-center gap-2">
          <Logo />
        </button>

        {/* Profile Icon */}
        <div className="flex items-center gap-4 text-sm text-slate-200">
          <button
            type="button"
            onClick={() => navigate('/profile')}
            className="flex items-center justify-center"
          >
            <img
              src={profileIcon}
              alt="Profile"
              className="w-8 h-8 rounded-full object-cover cursor-pointer hover:opacity-80 transition"
            />
          </button>
        </div>
      </div>
    </header>
  );
}

export default AppHeader;
