import React from "react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-base-200 text-base-content py-8 mt-16">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between px-6 gap-4">
        <div className="text-sm">
          © {currentYear} Guilherme Martins. Todos os direitos reservados.
        </div>
        <div className="flex gap-4 text-primary">
          <a
            href="https://github.com/seuusuario"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-primary-content transition"
          >
            GitHub
          </a>
          <a
            href="https://linkedin.com/in/seuusuario"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-primary-content transition"
          >
            LinkedIn
          </a>
          <a
            href="mailto:seu@email.com"
            className="hover:text-primary-content transition"
          >
            E-mail
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
