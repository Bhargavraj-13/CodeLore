// Displays login and register forms within a styled card

function AuthCard({ children }) {
  return (
    <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center px-6 md:px-10">
      <div className="w-full max-w-xl">
        <div className="rounded-2xl bg-slate-900/60 border border-white/10 p-6 shadow-lg">
          {children}
        </div>
      </div>
    </div>
  );
}

export default AuthCard;