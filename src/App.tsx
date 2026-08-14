import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState, lazy, Suspense } from "react";
import { AnimatePresence } from "framer-motion";

import Header from "./components/Header";
import { LandingFooter } from "./components/home/LandingFooter";
import ContactCard from "./components/ContactCard";
import ScrollToTop from "./components/ScrollToTop";

import Home from "./pages/Home";

const About = lazy(() => import("./pages/About"));
const Services = lazy(() => import("./pages/Services"));
const Careers = lazy(() => import("./pages/Career"));
const Projects = lazy(() => import("./pages/Projects"));
const ProjectDemoEntry = lazy(() => import("./pages/ProjectDemoEntry"));
const TermsAndConditions = lazy(() => import("./pages/TermsAndConditions"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));

import { ContactModalProvider } from "./context/ContactModalProvider";
import { LogoAnimationProvider } from "./context/LogoAnimationContext";
import { useGlobalLoader } from "./context/GlobalLoaderContext";
import { GlobalBackground } from "./components/shared/GlobalBackground";
import { RouteSeo } from "./components/RouteSeo";
import ProtectedRoute from "./admin/routes/ProtectedRoute";

const Login = lazy(() => import("./admin/pages/Login"));
const AdminLayout = lazy(() => import("./admin/components/AdminLayout"));
const DashboardHome = lazy(() => import("./admin/modules/DashboardHome"));
const ContactMessages = lazy(() => import("./admin/modules/ContactMessages"));
const Reviews = lazy(() => import("./admin/modules/Reviews"));
const Jobs = lazy(() => import("./admin/modules/Jobs"));
const Applications = lazy(() => import("./admin/modules/Applications"));
const NotFound = lazy(() => import("./pages/NotFound"));

export default function App() {
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [contactType, setContactType] = useState<
    "general" | "career" | "startup" | "demo"
  >("general");

  const { pathname } = useLocation();
  const navigate = useNavigate();

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

  const openDemo = () => {
    setContactType("demo");
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
      <ContactModalProvider openContact={openContact} openDemo={openDemo}>
        <div className="relative flex min-h-screen flex-col overflow-x-hidden">
          <GlobalBackground />

          <RouteSeo />
          {!isAdminRoute && <Header openContact={openContact} openDemo={openDemo} />}

          <ScrollToTop />

          <main
            className={`relative z-10 flex-grow ${
              isAdminRoute
                ? ""
                : "pt-16 pb-0"
            }`}
          >
            <AnimatePresence mode="wait">

              <Suspense fallback={<div className="min-h-screen w-full bg-transparent" />}>
                <Routes location={{ pathname }} key={pathname}>
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
                path="/terms"
                element={<TermsAndConditions />}
              />

              <Route
                path="/privacy"
                element={<PrivacyPolicy />}
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
                <Route path="*" element={<NotFound />} />
                </Routes>
              </Suspense>
            </AnimatePresence>
          </main>

          {!isAdminRoute && (
            <LandingFooter openContact={openContact} openDemo={openDemo} />
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