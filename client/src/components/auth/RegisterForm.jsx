// Code for the registration form component

import { useState } from "react";

function RegisterForm({ onSubmit, loading, serverError }) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [localError, setLocalError] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();
    setLocalError(null);

    if (!username.trim() || !email.trim() || !password) {
      setLocalError("Please complete all required fields.");
      return;
    }

    const validEmail = /^\S+@\S+\.\S+$/;
    if (!validEmail.test(email)) {
      setLocalError("Please provide a valid email address.");
      return;
    }

    if (password.length < 6) {
      setLocalError("Password should be at least 6 characters.");
      return;
    }

    if (password !== confirm) {
      setLocalError("Passwords do not match.");
      return;
    }

    await onSubmit({
      username: username.trim(),
      email: email.trim(),
      password,
    });
  }

  const errorMessage = localError || serverError;

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="mb-5 text-center">
        <h1 className="text-2xl font-semibold">Create account</h1>
        <p className="text-sm text-slate-300 mt-1">
          Create a new account to get started.
        </p>
      </div>

      <div className="space-y-4">
        <label className="block">
          <span className="text-xs text-slate-200">Username</span>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="mt-1 block w-full rounded-lg bg-slate-900/60 border border-slate-700 px-3 py-2 text-white placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-teal-300"
            placeholder="Enter your name"
            autoComplete="name"
          />
        </label>

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
            autoComplete="new-password"
          />
        </label>

        <label className="block">
          <span className="text-xs text-slate-200">Confirm password</span>
          <input
            type="password"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            className="mt-1 block w-full rounded-lg bg-slate-900/60 border border-slate-700 px-3 py-2 text-white placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-teal-300"
            placeholder="Repeat password"
            autoComplete="new-password"
          />
        </label>

        {errorMessage && (
          <div className="text-sm text-red-400">{errorMessage}</div>
        )}

        <button
          type="submit"
          className="w-full inline-flex items-center justify-center rounded-lg bg-teal-400 px-4 py-2 text-sm font-semibold text-slate-950 shadow-sm hover:bg-teal-300 transition-colors disabled:opacity-60"
        >
          Create account
        </button>

        <div className="mt-6 text-xs text-slate-400">
          Already have an account?{" "}
          <a href="/login" className="text-teal-300 hover:underline">
            Sign in
          </a>
        </div>
      </div>
    </form>
  );
}

export default RegisterForm;