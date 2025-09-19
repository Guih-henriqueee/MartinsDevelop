import React, { useState } from "react";

export type Project = {
  id: number;
  title: string;
  description: string;
  link: string;
  image: string;
  imagemodal: string;
  tags: string[];
  active: boolean;
};

interface ProjectModalProps {
  projects: Project[];
  onClose: () => void;
}

const ProjectModal: React.FC<ProjectModalProps> = ({ projects, onClose }) => {
  const [selected, setSelected] = useState<Project | null>(projects[0]);

  if (!projects.length) return null;

  return (
    <div className="relative z-10 inset-0 z-50 flex items-center justify-center">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/50"
        onClick={onClose}
      />

      {/* Conteúdo do modal */}
      <div className="relative z-10 bg-base-200 rounded-lg shadow-lg w-11/12 max-w-5xl max-h-[90vh] flex overflow-hidden">
        {/* Botão de fechar */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 rounded-full p-2 text-gray-600 hover:bg-gray-100"
        >
          ✕
        </button>

        {/* Coluna esquerda */}
        <div className="w-1/3 border-r overflow-y-auto">
          {projects.map((proj) => (
            <div
              key={proj.id}
              onMouseEnter={() => setSelected(proj)}
              className={`p-3 flex gap-3 cursor-pointer hover:bg-gray-100 ${
                selected?.id === proj.id ? "bg-base-100" : ""
              }`}
            >
              <img
                src={proj.image}
                alt={proj.title}
                className="w-8 h-8 object-cover rounded"
              />
              <div>
                <h3 className="font-semibold">{proj.title}</h3>
                <p className="text-sm text-gray-600">{proj.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Coluna direita */}
        <div className="flex-1 p-6 flex flex-col items-center justify-start overflow-y-auto">
          {selected && (
            <>
              <img
                src={selected.image}
                alt={selected.title}
                className="w-full max-h-64 object-cover rounded mb-4"
              />
              <div className="flex gap-2 flex-wrap mb-3">
                {selected.tags.map((tech, i) => (
                  <span
                    key={i}
                    className="px-2 py-1 text-xs bg-gray-200 rounded"
                  >
                    {tech}
                  </span>
                ))}
              </div>
              <a
                href={selected.link}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 px-4 py-2 bg-primary text-white rounded hover:bg-accent"
              >
                Ver Projeto
              </a>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectModal;
