import React, { useEffect, useState } from "react";
import { ImageOff } from "lucide-react";
import { scrollHeader } from "../utils/ScrollReveal";

const projects = [
  {
    title: "APIs RESTfuls",
    description:
      "Construção de APIs em diferentes linguagens, com controle transacional, administração de recursos e integração entre sistemas.",
    link: "https://github.com/Guih-henriqueee/api-agendamentos",
    image: "/assets/ApiResful.png",
  },
  {
    title: "Dashboard Shadcn",
    description:
      "Dashboard gerencial com indicadores de performance, utilizando Shadcn e TanStack Table para visualização eficiente de dados.",
    link: "https://github.com/Guih-henriqueee/",
    image: "/assets/DashboardShadcn.png",
  },
  {
    title: "Pipelines DevOps",
    description:
      "Criação de pipelines CI/CD para validação automática e deploy seguro, evitando bugs em check-ins de novas versões.",
    link: "https://github.com/Guih-henriqueee/",
    image: "/assets/Pipelines.png",
  },
  {
    title: "Integrador Backend",
    description:
      "Sistema em Python para integrar e gerenciar pedidos de múltiplos painéis via API, com armazenamento em PostgreSQL, validação automática de tabelas e rotinas de atualização contínua. Usa multithreading para otimizar o processamento e inclui logs detalhados para monitoramento.",
    link: "https://github.com/Guih-henriqueee/Integrador",
    image: "/assets/Integrador.png",
  },
  {
    title: "Landing Pages",
    description:
      "Desenvolvimento de landing pages responsivas e otimizadas, aplicando as melhores práticas de UI/UX com foco em performance e experiência do usuário. Projetos construídos principalmente com TypeScript, JavaScript e React, explorando técnicas atuais para interfaces fluidas e funcionais.",
    link: "https://github.com/Guih-henriqueee/",
    image: "/assets/LandingPages.png",
  },
  {
    title: "FulLstack Projects",
    description:
      "Desenvolvimento completo de aplicações modernas, com foco em front-end e back-end, usando tecnologias atuais e melhores práticas para soluções escaláveis e eficientes.",
    link: "https://github.com/Guih-henriqueee/",
    image: "/assets/Fullstack.png",
  },
];

const Projects = () => {
   useEffect(() => {
     scrollHeader();
   }, []);
  return (
  <section id="projetos" className="space-y-8 reveal-1">
      <h2 className="text-3xl font-bold text-primary">Projetos Pessoais</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {projects.map((project, idx) => {
          const [imgError, setImgError] = useState(false);

          return (
            <div
              key={idx}
              className="bg-base-200 rounded-box shadow-md hover:shadow-xl transition overflow-hidden border border-base-300 reveal-3"
            >
              {project.image && !imgError ? (
                <img
                  src={project.image}
                  alt={project.title}
                  className= "w-full"
                  onError={() => setImgError(true)}
                />
              ) : (
                <div className="w-full h-48 flex items-center justify-center bg-base-100 text-base-content">
                  <ImageOff size={48} />
                </div>
              )}

              <div className="p-5 flex flex-col justify-between h-full">
                <div>
                  <h3 className="text-xl font-semibold text-base-content mb-2 reveal-2">
                    {project.title}
                  </h3>
                  <p className="text-primary-content text-sm reveal-3">
                    {project.description}
                  </p>
                </div>
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-sm btn-outline btn-primary mt-4 w-fit"
                >
                  Ver Projeto
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Projects;
