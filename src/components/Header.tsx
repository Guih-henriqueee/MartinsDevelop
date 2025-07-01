import React, { useState, useEffect } from "react";
import { Github, Linkedin, Smartphone, Moon, Sun, Menu } from "lucide-react";
import { scrollHeader } from "../utils/ScrollReveal";
const Header = () => {
  const [theme, setTheme] = useState<"light" | "dark">("dark");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);

  }, [theme]);

  useEffect(() => {
    scrollHeader();
  }, []);


  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="relative bg-gradient-to-b from-base-100 to-transparent text-base-content">

      <div className="fixed top-0 left-0 w-full z-50">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="btn btn-ghost btn-sm text-primary"
              aria-label="Abrir menu"
            >
              <Menu size={20} />
            </button>
          </div>

          <nav className="hidden md:flex space-x-6 text-primary hover:text-success">
            <a href="#destaques" className="hover:text-primary transition">Destaques</a>
            <a href="#projetos" className="hover:text-primary transition">Projetos</a>
            <a href="#skills" className="hover:text-primary transition">Skills</a>
            <a href="#certificacoes" className="hover:text-primary transition">Certificações</a>
            <a href="#contato" className="hover:text-primary transition">Contato</a>
          </nav>

          <button
            onClick={toggleTheme}
            className="btn btn-sm btn-outline border-primary text-primary flex items-center gap-2"
            aria-label={theme === "dark" ? "Ativar tema claro" : "Ativar tema escuro"}
          >
            {theme === "light" ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden px-4 pb-4 light:bg-white dark:bg-base-100 text-primary hover:text-success space-y-2 shadow-2xl">

            <a href="#destaques" onClick={toggleMenu} className="block hover:text-primary">Destaques</a>
            <a href="#projetos" onClick={toggleMenu} className="block hover:text-primary">Projetos</a>
            <a href="#skills" onClick={toggleMenu} className="block hover:text-primary">Skills</a>
            <a href="#certificacoes" onClick={toggleMenu} className="block hover:text-primary">Certificações</a>
            <a href="#contato" onClick={toggleMenu} className="block hover:text-primary">Contato</a>
          </div>
        )}
      </div>

      <div className="flex flex-col md:flex-row items-center max-w-6xl w-full px-4 gap-12 pt-24 pb-10 mx-auto">
        <div className="flex-1 text-center md:text-left">
          <h1 className="text-4xl font-bold text-primary mb-2 reveal-1">Guilherme Martins</h1>
          <p className="text-lg font-semibold text-primary-content mb-4 reveal-2">
            Desenvolvedor FullStack
          </p>
          <p className="text-base text-primary-content mb-6 leading-relaxed max-w-md mx-auto md:mx-0 reveal-3">
            Analista de Desenvolvimento de Sistemas | Consultor de Integrações e Ecommerce |
            Desenvolvimento de Aplicações e Consultoria de SAP Business One.
          </p>
          <div className="flex justify-center md:justify-start flex-wrap gap-4 reveal-4">
            <a href="#projetos" className="btn btn-primary">Projetos</a>
            <a href="/contents/curriculo.pdf" download="Curriculo-Guilherme-Martins.pdf"
              className="btn btn-outline btn-primary">
              Download Currículo
            </a>
          </div>

          <div className="flex justify-center md:justify-start gap-5 mt-6 text-primary reveal-5">
            <a
              href="https://github.com/Guih-henriqueee"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary-content transition"
              aria-label="GitHub"
            >
              <Github size={24} />
            </a>
            <a
              href="https://linkedin.com/in/guih-henriquee"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary-content transition"
              aria-label="LinkedIn"
            >
              <Linkedin size={24} />
            </a>
            <a
              href="https://api.whatsapp.com/send/?phone=5511967392111&text&type=phone_number&app_absent=0"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary-content transition"
              aria-label="whatsapp"
            >
              <Smartphone size={24} />
            </a>
          </div>
        </div>

        <div className="mt-10 md:mt-0 flex-shrink-0 reveal-img">
          <img
            src="/assets/Profile.jpeg"
            alt="Foto de Guilherme Martins"
            className="w-60 h-60 md:w-80 md:h-80 rounded-box shadow-lg object-cover shadow-primary"
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
