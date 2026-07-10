import { useState, useEffect } from "react";
import type { FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
// import HMLogoSVG from "../../components/shared/HMLogoSVG";
import { supabase } from "../../lib/supabase";
import HMLogo from "../../components/HMLogo";

const Login: React.FC = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [attempts, setAttempts] = useState(0);
  const [lockedUntil, setLockedUntil] = useState<number | null>(null);
  const [countdown, setCountdown] = useState(0);

  useEffect(() => {
    const lockData = localStorage.getItem("admin_login_lock");
    if (lockData) {
      const { time } = JSON.parse(lockData);
      if (time > Date.now()) {
        setLockedUntil(time);
      } else {
        localStorage.removeItem("admin_login_lock");
        localStorage.removeItem("admin_login_attempts");
      }
    }

    const attemptsData = localStorage.getItem("admin_login_attempts");
    if (attemptsData) {
      setAttempts(parseInt(attemptsData));
    }
  }, []);

  useEffect(() => {
    let timer: ReturnType<typeof setInterval>;
    if (lockedUntil) {
      timer = setInterval(() => {
        const remaining = Math.max(0, Math.ceil((lockedUntil - Date.now()) / 1000));
        setCountdown(remaining);
        if (remaining === 0) {
          setLockedUntil(null);
          setAttempts(0);
          localStorage.removeItem("admin_login_lock");
          localStorage.removeItem("admin_login_attempts");
        }
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [lockedUntil]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (lockedUntil) return;

    setLoading(true);
    setError("");

    const { error: authError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (authError) {
      const newAttempts = attempts + 1;
      setAttempts(newAttempts);
      localStorage.setItem("admin_login_attempts", newAttempts.toString());
      
      if (newAttempts >= 3) {
        const lockTime = Date.now() + 2 * 60 * 1000;
        setLockedUntil(lockTime);
        localStorage.setItem("admin_login_lock", JSON.stringify({ time: lockTime }));
        setError("Too many failed attempts. Try again in 2 minutes.");
      } else {
        setError(authError.message);
      }
      setLoading(false);
      return;
    }

    setAttempts(0);
    localStorage.removeItem("admin_login_attempts");
    navigate("/hm-portal-admin-dashboard");
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center bg-brand-surface px-4">
      <div className="absolute inset-0 bg-hero-glow pointer-events-none" />

      <div className="relative z-10 w-full max-w-md">
        <div className="mb-8 flex flex-col items-center">
          <HMLogo variant="hero" className="mb-6" />

          <h1 className="text-3xl font-bold text-white font-display">
            Admin Login
          </h1>

          <p className="mt-2 text-center text-gray-400">
            Sign in to access the HM Coding admin dashboard.
          </p>
        </div>

        <div className="rounded-2xl border border-gray-800 bg-gray-900/80 p-8 shadow-card-md backdrop-blur-sm">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-medium text-gray-300"
              >
                Email
              </label>

              <input
                id="email"
                type="email"
                required
                autoComplete="email"
                placeholder="admin@hmcoding.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-3 text-white outline-none transition focus:border-brand-cyan focus:ring-2 focus:ring-brand-cyan/50"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="mb-2 block text-sm font-medium text-gray-300"
              >
                Password
              </label>

              <input
                id="password"
                type="password"
                required
                autoComplete="current-password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-3 text-white outline-none transition focus:border-brand-cyan focus:ring-2 focus:ring-brand-cyan/50"
              />
            </div>

            {error && (
              <div className="rounded-lg border border-red-500/40 bg-red-500/10 p-3 text-sm text-red-400">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading || !!lockedUntil}
              className="w-full rounded-lg bg-brand-gradient px-6 py-3 font-semibold text-white transition hover:scale-[1.02] hover:shadow-neon-cyan disabled:cursor-not-allowed disabled:opacity-60"
            >
              {lockedUntil ? `Locked (${countdown}s)` : loading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          <div className="mt-6 text-center">
            <Link
              to="/"
              className="text-sm text-brand-cyan transition hover:text-brand-mint"
            >
              ← Back to Home
            </Link>
          </div>
        </div>

        <p className="mt-6 text-center text-xs text-gray-500">
          ©2025- {new Date().getFullYear()} HM Coding. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default Login;