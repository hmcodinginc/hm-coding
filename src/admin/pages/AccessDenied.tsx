import { Link } from "react-router-dom";
import { supabase } from "../../lib/supabase";

export default function AccessDenied() {
  const handleSignOut = async () => {
    await supabase.auth.signOut();
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-brand-surface px-6 text-center">
      <h1 className="text-3xl font-display font-bold text-white">Access denied</h1>
      <p className="mt-4 max-w-md text-sm text-gray-400">
        This account is signed in but is not authorized to use the HM Coding admin portal.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link
          to="/"
          className="rounded-full border border-brand-cyan/30 px-6 py-3 text-sm font-semibold text-white"
        >
          Back to website
        </Link>
        <button
          type="button"
          onClick={handleSignOut}
          className="rounded-full bg-red-500/20 px-6 py-3 text-sm font-semibold text-red-300"
        >
          Sign out
        </button>
      </div>
    </div>
  );
}
