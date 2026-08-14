import { useNavigate } from "react-router-dom";
import { supabase } from "../../lib/supabase";

interface TopbarProps {
  toggleSidebar: () => void;
}

const Topbar: React.FC<TopbarProps> = ({ toggleSidebar }) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/hm-portal-admin-dashboard/login");
  };

  return (
    <header className="sticky top-0 z-10 border-b border-gray-800 bg-brand-black/95 backdrop-blur-sm">
      <div className="flex items-center justify-between px-4 lg:px-8 py-4">
        <div className="flex items-center gap-4">
          <button 
            type="button"
            onClick={toggleSidebar}
            className="lg:hidden text-gray-400 hover:text-white focus:outline-none"
            aria-label="Open sidebar"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </button>
          <h2 className="text-xl font-semibold text-white hidden sm:block">Admin Dashboard</h2>
        </div>

        <button
          onClick={handleLogout}
          className="rounded-lg border border-red-500/40 bg-red-500/10 px-4 py-2 text-sm font-medium text-red-400 transition hover:bg-red-500/20 hover:text-red-300"
        >
          Logout
        </button>
      </div>
    </header>
  );
};

export default Topbar;