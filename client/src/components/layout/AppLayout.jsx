import AppHeader from './AppHeader.jsx';

function AppLayout({ children }) {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <AppHeader />

      <main className="px-6 md:px-10 py-10">
        {children}
      </main>
    </div>
  );
}

export default AppLayout;