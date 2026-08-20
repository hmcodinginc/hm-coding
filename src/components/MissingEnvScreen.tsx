const MissingEnvScreen = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-brand-black px-6 text-center text-white">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-lavender">
        Setup required
      </p>

      <h1 className="mt-4 text-3xl font-display font-bold">
        Supabase environment variables are missing
      </h1>

      <p className="mt-4 max-w-xl text-sm text-gray-400">
        Create a <code className="text-brand-cyan">.env</code> file in the
        project root with{" "}
        <code className="text-brand-cyan">VITE_SUPABASE_URL</code> and{" "}
        <code className="text-brand-cyan">VITE_SUPABASE_ANON_KEY</code>, then
        restart <code className="text-brand-cyan">npm run dev</code>.
      </p>

      <p className="mt-3 max-w-xl text-xs text-gray-500">
        See <code>.env.example</code> for the expected format. Legacy
        MongoDB/Express keys in <code>.env</code> are not used by this
        frontend.
      </p>
    </div>
  );
};

export default MissingEnvScreen;    