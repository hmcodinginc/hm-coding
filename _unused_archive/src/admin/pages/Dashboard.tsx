import { useNavigate } from "react-router-dom";
import { supabase } from "../../lib/supabase";

const Dashboard: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/hm-portal-admin-dashboard/login");
  };

  return (
    <div className="min-h-screen bg-brand-surface text-white">
      {/* Header */}
      <header className="border-b border-gray-800 bg-brand-black">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <h1 className="text-2xl font-bold font-display">
            HM Coding Admin
          </h1>

          <button
            onClick={handleLogout}
            className="rounded-lg bg-red-600 px-4 py-2 font-medium transition hover:bg-red-700"
          >
            Logout
          </button>
        </div>
      </header>

      {/* Main */}
      <main className="mx-auto max-w-7xl px-6 py-10">
        <h2 className="mb-8 text-3xl font-bold">
          Welcome to Admin Dashboard
        </h2>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          <div className="rounded-xl border border-gray-800 bg-gray-900 p-6">
            <h3 className="text-xl font-semibold">Jobs</h3>
            <p className="mt-2 text-gray-400">
              Create, edit and delete job openings.
            </p>
          </div>

          <div className="rounded-xl border border-gray-800 bg-gray-900 p-6">
            <h3 className="text-xl font-semibold">Reviews</h3>
            <p className="mt-2 text-gray-400">
              Approve or reject customer reviews.
            </p>
          </div>

          <div className="rounded-xl border border-gray-800 bg-gray-900 p-6">
            <h3 className="text-xl font-semibold">Contact Messages</h3>
            <p className="mt-2 text-gray-400">
              View customer inquiries and demo requests.
            </p>
          </div>

          <div className="rounded-xl border border-gray-800 bg-gray-900 p-6">
            <h3 className="text-xl font-semibold">Applications</h3>
            <p className="mt-2 text-gray-400">
              Review internship and job applications.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;