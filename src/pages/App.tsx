import React from "react";
import Header from "../components/Header";
import CareerHighlights from "../components/CareerHighlights";
import Projects from "../components/Projects";
import Skills from "../components/Skills";
import Certifications from "../components/Certifications";
import Contact from "../components/Contact";
import Footer from "../components/Footer";


function App() {
  return (
    <div className="relative min-h-screen text-base-content font-sans">
      {/* Overlay escuro */}
      <div className="absolute inset-0 bg-custom-gradient-light dark:bg-custom-gradient-dark opacity-95 pointer-events-none z-0" />

      {/* Conteúdo acima do overlay */}
      <div className="relative z-10">
        <Header />

        <main className="max-w-6xl mx-auto px-6 py-12 space-y-24">
          <CareerHighlights />
          <Projects />
          <Skills />
          <Certifications />
          <Contact />
        </main>

        <Footer />
      </div>
    </div>
  );
}

export default App;
