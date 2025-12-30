// Component for the header section of the application

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from './Logo.jsx';
import logoutIcon from '../../assets/images/Logout.png';
import menuIcon from '../../assets/images/Menu.png';
import homeIcon from '../../assets/images/Home.png';
import profileIcon from '../../assets/images/Profile.png';

import { useAuth } from '../../components/auth/AuthContext.jsx';

function AppHeader({ showProfile = true }) {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* HEADER */}
      <header className="sticky top-0 z-40 bg-slate-950/80 backdrop-blur border-b border-white/10">
        <div className="flex w-full items-center justify-between px-6 md:px-10 h-16">

          {/* Left section */}
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              className="flex items-center justify-center"
            >
              <img src={menuIcon} alt="Menu" className="w-6 h-6" />
            </button>

            <button
              type="button"
              onClick={() => navigate('/home')}
              className="flex items-center gap-2"
            >
              <Logo />
            </button>
          </div>

          {/* Profile icon */}
          {showProfile && (
            <button
              type="button"
              onClick={() => navigate('/profile')}
              className="flex items-center justify-center"
            >
              <img
                src={profileIcon}
                alt="Profile"
                className="w-8 h-8 rounded-full object-cover hover:opacity-80 transition"
              />
            </button>
          )}
        </div>
      </header>

      {/* FULL-HEIGHT MENU */}
      {open && (
        <aside
          className="
            fixed left-0 top-16
            h-[calc(100vh-64px)]
            w-52
            bg-slate-950
            border-r border-white/10
            z-30
            flex flex-col
          "
        >
          {/* Menu items */}
          <nav className="flex flex-col px-4 py-6 text-sm text-slate-200 space-y-2">
            <button
              onClick={() => {
                navigate('/home');
                setOpen(false);
              }}
              className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-slate-800 transition"
            >
              <img src={homeIcon} alt="" className="w-5 h-5 opacity-80" />
              <span>Home</span>
            </button>

            <button
              onClick={() => {
                navigate('/profile');
                setOpen(false);
              }}
              className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-slate-800 transition"
            >
              <img src={profileIcon} alt="" className="w-5 h-5 opacity-80" />
              <span>Profile</span>
            </button>
          </nav>

          {/* Push logout to bottom */}
          <div className="flex-1" />

          {/* Logout */}
          <div className="px-4 pb-6">
            <button
              onClick={() => {
                logout();
                navigate('/login');
            }}
              className="w-full flex items-center gap-3 px-3 py-2 border border-white/10 rounded-md text-sm text-slate-200 hover:bg-red-900/30 hover:border-red-500/40 hover:text-red-400 transition">
    <img
      src={logoutIcon}
      alt="Logout"
      className="w-5 h-5 opacity-80"
    />
    <span>Logout</span>
  </button>
</div>

        </aside>
      )}
    </>
  );
}

export default AppHeader;