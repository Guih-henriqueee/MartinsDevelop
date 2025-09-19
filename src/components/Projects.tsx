import React, { useEffect, useState } from "react";
import { ImageOff } from "lucide-react";
import { scrollHeader } from "../utils/ScrollReveal";
import { Button } from "../utils/Buttom";
import ProjectModal from "./modals/ProjectsModal/ProjectModal";
import {  categories, Category, Project }  from "./data/categories";

const Projects = () => {
  const [selectedCategory, setSelectedCategory] = useState<any>(null);

  useEffect(() => {
    scrollHeader();
  }, []);

  return (
    <section id="projetos" className="space-y-8 reveal-1">
      <h2 className="text-3xl font-bold text-primary">Projetos Pessoais</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {categories.map((category, idx) => {
          const firstProject = category.projects[0];
          const [imgError, setImgError] = useState(false);

          return (
            <div
              key={idx}
              className="bg-base-200 rounded-box shadow-md hover:shadow-xl transition overflow-hidden border border-base-300 reveal-3 flex flex-col"
            >
              {firstProject.image && !imgError ? (
                <img
                  src={firstProject.image}
                  alt={category.name}
                  className="w-full"
                  onError={() => setImgError(true)}
                />
              ) : (
                <div className="w-full h-48 flex items-center justify-center bg-base-100 text-base-content">
                  <ImageOff size={48} />
                </div>
              )}

              <div className="p-5 flex flex-col justify-between flex-grow">
                <div>
                  <h3 className="text-xl font-semibold text-base-content mb-2 reveal-2">
                    {category.name}
                  </h3>
                  <p className="text-primary-content text-sm reveal-3">
                    {firstProject.description}
                  </p>
                </div>

                <div className="flex justify-between items-end mt-6">
                  {category.projects.length === 1 ? (
                    <a
                      href={firstProject.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-sm btn-outline btn-primary w-fit"
                    >
                      Ver Projeto
                    </a>
                  ) : (
                    <button
                      onClick={() => setSelectedCategory(category)}
                      className="btn btn-sm btn-outline btn-primary w-fit"
                    >
                      Ver Projetos
                    </button>
                  )}

                  <div className="flex flex-wrap gap-2 justify-end self-end">
                    {firstProject.tags.map((tag: string, i: number) => (
                      <Button
                        key={i}
                        className="btn btn-xs rounded-box px-2 py-[2px] text-[10px] normal-case
                                   bg-transparent text-base-content border border-base-content/40 shadow-none hover:bg-base-300/10"
                      >
                        {tag}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Modal */}
      {selectedCategory && (
        <ProjectModal
          projects={selectedCategory.projects}
          onClose={() => setSelectedCategory(null)}
        />
      )}
    </section>
  );
};

export default Projects;
