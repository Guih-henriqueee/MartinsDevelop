import { useEffect, useState } from "react";
import Header from "../components/Header";
import CareerHighlights from "../components/CareerHighlights";
import Projects from "../components/Projects";
import Skills from "../components/Skills";
import Certifications from "../components/Certifications";
import Contact from "../components/Contact";
import Footer from "../components/Footer";
import ParticlesBackground from "../utils/Particles";
import { ChatBot } from "../components/bot/AI-Assistence";


function App() {
  const [theme, setTheme] = useState<"light" | "dark">("dark");

  useEffect(() => {
    const currentTheme = document.documentElement.getAttribute("data-theme") as "light" | "dark";
    if (currentTheme) setTheme(currentTheme);

    const observer = new MutationObserver(() => {
      const updatedTheme = document.documentElement.getAttribute("data-theme") as "light" | "dark";
      if (updatedTheme) setTheme(updatedTheme);
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });

    return () => observer.disconnect();
  }, []);

  const particleColor = "#9be8c2";

  return (
    <div className="relative min-h-screen text-base-content font-sans overflow-hidden">
      <ParticlesBackground color={particleColor} />

      <div className="relative">
        <Header />
        <main className="max-w-6xl mx-auto px-6 py-12 space-y-24">
          <CareerHighlights />
          <Projects />
          <Skills />
          <Certifications />
          <Contact />
        </main>
      </div>

      <Footer />

      {/* ChatBot dentro da div principal */}
      <div className="fixed bottom-4 right-4 z-50">
        <ChatBot />
      </div>
    </div>
  );
}
export default App;
