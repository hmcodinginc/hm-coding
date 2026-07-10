import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

import Header from "./components/Header";
import { LandingFooter } from "./components/home/LandingFooter";
import ContactCard from "./components/ContactCard";
import ScrollToTop from "./components/ScrollToTop";

import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import Careers from "./pages/Career";
import Projects from "./pages/Projects";
import ProjectDemoEntry from "./pages/ProjectDemoEntry";

import { ContactModalProvider } from "./context/ContactModalProvider";
import { LogoAnimationProvider } from "./context/LogoAnimationContext";
import { useGlobalLoader } from "./context/GlobalLoaderContext";

import { GlobalBackground } from "./components/shared/GlobalBackground";

import Login from "./admin/pages/Login";
import ProtectedRoute from "./admin/routes/ProtectedRoute";
import AdminLayout from "./admin/components/AdminLayout";
import DashboardHome from "./admin/modules/DashboardHome";
import ContactMessages from "./admin/modules/ContactMessages";
import Reviews from "./admin/modules/Reviews";
import Jobs from "./admin/modules/Jobs";
import Applications from "./admin/modules/Applications";

export default function App() {
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [contactType, setContactType] = useState<
    "general" | "career" | "startup"
  >("general");

  const { pathname } = useLocation();
  const navigate = useNavigate();

  const isHome = pathname === "/";
  const isAdminRoute = pathname.startsWith("/hm-portal-admin-dashboard");

  const { showLoader, hideLoader } = useGlobalLoader();

  const prevPath = useRef<string | null>(null);
  const isInitialLoad = useRef(true);

  useEffect(() => {
    if (isInitialLoad.current) {
      isInitialLoad.current = false;
      prevPath.current = pathname;

      const timer = setTimeout(() => hideLoader(), 400);

      return () => {
        clearTimeout(timer);
        hideLoader();
      };
    }

    if (prevPath.current !== pathname) {
      showLoader();
      prevPath.current = pathname;

      const timer = setTimeout(() => hideLoader(), 400);

      return () => {
        clearTimeout(timer);
        hideLoader();
      };
    }
  }, [pathname, showLoader, hideLoader]);

  useEffect(() => {
    const handleNav = () => {
      showLoader();
      setTimeout(() => hideLoader(), 400);
    };

    window.addEventListener("popstate", handleNav);
    window.addEventListener("hashchange", handleNav);

    return () => {
      window.removeEventListener("popstate", handleNav);
      window.removeEventListener("hashchange", handleNav);
    };
  }, [showLoader, hideLoader]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === "h") {
        e.preventDefault();
        navigate("/hm-portal-admin-dashboard/login");
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [navigate]);

  const openContact = () => {
    setContactType("general");
    setIsContactOpen(true);
  };

  const openCareerContact = () => {
    setContactType("career");
    setIsContactOpen(true);
  };

  const openStartupContact = () => {
    setContactType("startup");
    setIsContactOpen(true);
  };

  const closeContact = () => setIsContactOpen(false);

  return (
    <LogoAnimationProvider>
      <ContactModalProvider openContact={openContact}>
        <div className="relative flex min-h-screen flex-col overflow-x-hidden">
          <GlobalBackground />

          {!isAdminRoute && <Header openContact={openContact} />}

          <ScrollToTop />

          <main
            className={`relative z-10 flex-grow ${
              isAdminRoute
                ? ""
                : isHome
                ? "pb-0 pt-16"
                : "pb-24 pt-24"
            }`}
          >
            <Routes>
              <Route
                path="/"
                element={<Home openContact={openContact} />}
              />

              <Route
                path="/about"
                element={<About openContact={openContact} />}
              />

              <Route
                path="/services"
                element={<Services openContact={openContact} />}
              />

              <Route
                path="/projects"
                element={<Projects />}
              />

              <Route
                path="/projects/:slug"
                element={<ProjectDemoEntry />}
              />

              <Route
                path="/careers"
                element={
                  <Careers
                    openContact={openCareerContact}
                    openStartupContact={openStartupContact}
                  />
                }
              />

              <Route
                path="/hm-portal-admin-dashboard/login"
                element={<Login />}
              />

              <Route
                path="/hm-portal-admin-dashboard"
                element={
                  <ProtectedRoute>
                    <AdminLayout />
                  </ProtectedRoute>
                }
              >
                <Route index element={<DashboardHome />} />
                <Route path="contact-messages" element={<ContactMessages />} />
                <Route path="reviews" element={<Reviews />} />
                <Route path="jobs" element={<Jobs />} />
                <Route path="applications" element={<Applications />} />
              </Route>
            </Routes>
          </main>

          {!isAdminRoute && (
            <LandingFooter openContact={openContact} />
          )}

          {!isAdminRoute && (
            <ContactCard
              isOpen={isContactOpen}
              onClose={closeContact}
              type={contactType}
            />
          )}
        </div>
      </ContactModalProvider>
    </LogoAnimationProvider>
  );
}