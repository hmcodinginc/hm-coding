import { useState } from "react";
import { NavLink, Link, useLocation } from "react-router-dom";

type NavItem = {
  path?: string;
  label: string;
  icon: string;
  end?: boolean;
  subItems?: { path: string; label: string }[];
};

const navItems: NavItem[] = [
  { path: "/hm-portal-admin-dashboard", label: "Dashboard", icon: "📊", end: true },
  { path: "/hm-portal-admin-dashboard/contact-messages", label: "Contact", icon: "💬" },
  { path: "/hm-portal-admin-dashboard/reviews", label: "Review", icon: "⭐" },
  { 
    label: "Jobs", 
    icon: "💼", 
    subItems: [
      { path: "/hm-portal-admin-dashboard/jobs", label: "All Jobs" },
      { path: "/hm-portal-admin-dashboard/applications", label: "Applications" },
    ]
  },
];

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, setIsOpen }) => {
  const location = useLocation();
  const [jobsOpen, setJobsOpen] = useState(
    location.pathname.includes("/hm-portal-admin-dashboard/jobs") || 
    location.pathname.includes("/hm-portal-admin-dashboard/applications")
  );
  return (
    <>
      {isOpen && (
        <div 
          className="fixed inset-0 z-20 bg-black/50 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
      <aside className={`fixed left-0 top-0 z-30 h-screen w-64 border-r border-gray-800 bg-brand-black transition-transform duration-300 lg:translate-x-0 ${isOpen ? "translate-x-0" : "-translate-x-full"}`}>
      <div className="flex h-full flex-col">
        {/* Logo */}
        <div className="border-b border-gray-800 p-6">
          <Link to="/" className="flex items-center gap-2 transition hover:opacity-80">
            <img src="/favicon.svg" alt="HM Coding Logo" className="h-8 w-8" />
            <h1 className="text-xl font-bold font-display text-white">
              HM Coding
            </h1>
          </Link>
          <p className="mt-1 text-xs text-gray-400">Admin Dashboard</p>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto p-4">
          <ul className="space-y-2">
            {navItems.map((item) => {
              if (item.subItems) {
                return (
                  <li key={item.label}>
                    <button
                      onClick={() => setJobsOpen(!jobsOpen)}
                      className="w-full flex items-center justify-between rounded-lg px-4 py-3 text-gray-400 hover:bg-gray-900 hover:text-white transition"
                    >
                      <div className="flex items-center">
                        <span className="mr-3 text-lg">{item.icon}</span>
                        <span className="font-medium">{item.label}</span>
                      </div>
                      <span className="text-xs">{jobsOpen ? '▼' : '▶'}</span>
                    </button>
                    {jobsOpen && (
                      <ul className="mt-2 ml-10 space-y-2">
                        {item.subItems.map((sub) => (
                          <li key={sub.path}>
                            <NavLink
                              to={sub.path}
                              className={({ isActive }) =>
                                `block rounded-lg px-4 py-2 transition ${
                                  isActive
                                    ? "bg-[#2563eb] text-white shadow-neon-cyan"
                                    : "text-gray-400 hover:bg-gray-900 hover:text-white"
                                }`
                              }
                              onClick={() => setIsOpen(false)}
                            >
                              {sub.label}
                            </NavLink>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                );
              }
              
              return (
                <li key={item.path}>
                  <NavLink
                    to={item.path!}
                    end={item.end}
                    className={({ isActive }) =>
                      `flex items-center rounded-lg px-4 py-3 transition ${
                        isActive
                          ? "bg-[#2563eb] text-white shadow-neon-cyan"
                          : "text-gray-400 hover:bg-gray-900 hover:text-white"
                      }`
                    }
                    onClick={() => setIsOpen(false)}
                  >
                    <span className="mr-3 text-lg">{item.icon}</span>
                    <span className="font-medium">{item.label}</span>
                  </NavLink>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Footer */}
        <div className="border-t border-gray-800 p-4">
          <p className="text-center text-xs text-gray-500">
            © 2025- {new Date().getFullYear()} HM Coding
          </p>
        </div>
      </div>
      </aside>
    </>
  );
};

export default Sidebar;