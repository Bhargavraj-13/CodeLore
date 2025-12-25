// Code for the login form component

import { useState } from "react";

function LoginForm({ onSubmit, serverError }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [localError, setLocalError] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();
    setLocalError(null);

    if (!email.trim() || !password) {
      setLocalError("Please enter both email and password.");
      return;
    }

    const validEmail = /^\S+@\S+\.\S+$/;
    if (!validEmail.test(email)) {
      setLocalError("Please provide a valid email address.");
      return;
    }

    await onSubmit({ email: email.trim(), password });
  }

  const errorMessage = localError || serverError;

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="mb-5 text-center">
        <h1 className="text-2xl font-semibold">Sign in</h1>
        <p className="text-sm text-slate-300 mt-1">
          Use your account to access your workspace.
        </p>
      </div>

      <div className="space-y-4">
        <label className="block">
          <span className="text-xs text-slate-200">Email</span>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 block w-full rounded-lg bg-slate-900/60 border border-slate-700 px-3 py-2 text-white placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-teal-300"
            placeholder="you@example.com"
            autoComplete="email"
          />
        </label>

        <label className="block">
          <span className="text-xs text-slate-200">Password</span>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 block w-full rounded-lg bg-slate-900/60 border border-slate-700 px-3 py-2 text-white placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-teal-300"
            placeholder="Enter password"
            autoComplete="current-password"
          />
        </label>

        {/* For future implementation */}
        <div className="flex items-center justify-between text-xs">
          <label className="inline-flex items-center gap-2 text-slate-300">
            <input type="checkbox" className="h-4 w-4 rounded bg-slate-800" />
            Remember me
          </label>

          <a href="/forgot-password" className="text-slate-300 hover:text-teal-300">
            Forgot password?
          </a>
        </div>

        {errorMessage && (
          <div className="text-sm text-red-400">{errorMessage}</div>
        )}

        <button
          type="submit"
          className="w-full inline-flex items-center justify-center rounded-lg bg-teal-400 px-4 py-2 text-sm font-semibold text-slate-950 shadow-sm hover:bg-teal-300 transition-colors disabled:opacity-60"
        >
          Sign in
        </button>

        <div className="mt-6 text-xs text-slate-400">
          Don't have an account?{" "}
          <a href="/register" className="text-teal-300 hover:underline">
            Sign up
          </a>
        </div>
      </div>
    </form>
  );
}

export default LoginForm;