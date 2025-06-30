import React, { useState, useEffect } from "react";
import { Github, Linkedin, Moon, Sun } from "lucide-react";

const Header = () => {
  const [theme, setTheme] = useState<"light" | "dark">("dark");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <header className="relative flex flex-col items-center text-left py-16 bg-gradient text-base-content ">
      {/* Navbar fixada no topo */}
      <div className="fixed top-0 left-0 w-full z-50 bg-neutral  backdrop-blur shadow-md">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          {/* Navegação */}
          <nav className="flex space-x-6 text-neutral-content">
            <a href="#destaques" className="hover:text-primary-content transition">Destaques</a>
            <a href="#projetos" className="hover:text-primary-content transition">Projetos</a>
            <a href="#skills" className="hover:text-primary-content transition">Skills</a>
            <a href="#certificacoes" className="hover:text-primary-content transition">Certificações</a>
            <a href="#contato" className="hover:text-primary-content transition">Contato</a>
          </nav>

          {/* Botão de tema */}
          <button
            onClick={toggleTheme}
            className="btn btn-sm btn-outline border-primary-content text-primary-content flex items-center gap-2"
            aria-label={theme === "dark" ? "Ativar tema claro" : "Ativar tema escuro"}
          >
            {theme === "light" ? <Sun size={18} /> : <Moon size={18} />}
            {theme === "light" ? "" : ""}
          </button>
        </div>
      </div>

      {/* Conteúdo principal */}
      <div className="flex flex-col md:flex-row items-center max-w-6xl w-full px-4 gap-12 pt-10">
        {/* Texto */}
        <div className="flex-1">
          <h1 className="text-4xl font-bold text-primary mb-2">Guilherme Martins</h1>
          <p className="text-lg font-semibold text-primary-content mb-4">
            Desenvolvedor FullStack
          </p>
          <p className="text-base text-primary-content mb-6 max-w-md leading-relaxed">
            Analista de Desenvolvimento de Sistemas | Consultor de Integrações e Ecommerce |
            Desenvolvimento de Aplicações e Consultoria de SAP Business One.
          </p>
          <div className="flex flex-wrap gap-4">
            <a href="#projetos" className="btn btn-primary">Projetos</a>
            <a
              href="/curriculo.pdf"
              download
              className="btn btn-outline btn-primary"
            >
              Download Currículo
            </a>
          </div>

          {/* Redes Sociais */}
          <div className="flex mr-10 gap-5 mt-5 text-primary">
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
          </div>
        </div>

        {/* Imagem */}
        <div className="flex-shrink-0">
          <img
            src="/src/assets/Profile.jpeg"
            alt="Foto de Guilherme Martins"
            className="w-80 h-80 rounded-box shadow-lg object-cover shadow-primary"
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
