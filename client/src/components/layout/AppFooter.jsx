// Component for the footer section of the application

function AppFooter() {
  return (
    <footer className="px-6 md:px-10 py-5 border-t border-white/10 bg-slate-950/60 backdrop-blur-md text-xs text-slate-300 flex flex-col sm:flex-row items-center justify-between gap-2">
      <span>© 2025 CodeLore. All rights reserved.</span>
      <span className="text-[11px] text-slate-400">
        Built for students who learn better when they teach.
      </span>
    </footer>
  );
}

export default AppFooter;