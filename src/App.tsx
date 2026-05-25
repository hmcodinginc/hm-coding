import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Services from "./pages/Services";
import ContactCard from "./components/ContactCard";
import { useState } from "react";
import About from "./pages/About";
import ScrollToTop from "./components/ScrollToTop";
import Careers from "./pages/Career";
import Projects from "./pages/Projects";
import ProjectDemoEntry from "./pages/ProjectDemoEntry";
import { ContactModalProvider } from "./context/ContactModalProvider";

export default function App() {
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [contactType, setContactType] = useState<
    "general" | "career" | "startup"
  >("general");

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
    <ContactModalProvider openContact={openContact}>
      <div className="flex flex-col min-h-screen overflow-hidden">
        <Header openContact={openContact} />

        <ScrollToTop />

        <main className="flex-grow overflow-y-auto bg-gray-50 dark:bg-gray-900 pt-12 pb-12">
          <Routes>
            <Route path="/" element={<Home openContact={openContact} />} />
            <Route path="/about" element={<About openContact={openContact} />} />
            <Route
              path="/services"
              element={<Services openContact={openContact} />}
            />
            <Route path="/projects" element={<Projects />} />
            <Route path="/projects/:slug" element={<ProjectDemoEntry />} />
            <Route
              path="/careers"
              element={
                <Careers
                  openContact={openCareerContact}
                  openStartupContact={openStartupContact}
                />
              }
            />
          </Routes>
        </main>

        <Footer openContact={openContact} />

        <ContactCard
          isOpen={isContactOpen}
          onClose={closeContact}
          type={contactType}
        />
      </div>
    </ContactModalProvider>
  );
}