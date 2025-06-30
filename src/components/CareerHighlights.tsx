import React, { useEffect } from "react";
import { Laptop, Rocket, FileText } from "lucide-react";
import { scrollHeader } from "../utils/ScrollReveal";



const highlights = [
  {
    title: "+3 anos de experiência",
    description:
      "Atuando como Líder em projetos de integração, automação e produtos escaláveis, na área de Ecommerce com SAP Business One.",
    icon: <Laptop size={48} className="text-primary mb-4" />,
  },
  {
    title: "Projetos entregues",
    description:
      "Mais de 15 projetos em produção, incluindo soluções para e-commerce, APIs e dashboards corporativos, robôs de consolidação e tratamento de dados, scripts para automação de tarefas.",
    icon: <Rocket size={48} className="text-primary mb-4" />,
  },
  {
    title: "Certificações reconhecidas",
    description:
      "Conquistas em plataformas como Databricks, CS50 Harvard, e treinamentos em SAP, APIs e arquitetura. Sempre evoluindo e atualizando conhecimento para estar atualizado para o mercado.",
    icon: <FileText size={48} className="text-primary mb-4" />,
  },
];



const CareerHighlights = () => {
  useEffect(() => {
    scrollHeader();
  }, []);
 
  return (
    <section id="destaques" className="space-y-8 reveal-1">
      <h2 className="text-3xl flex justify-start font-bold text-primary text-center reveal-2">
        Destaques da Carreira
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {highlights.map((item, idx) => (
          <div
            key={idx}
            className="bg-base-200 rounded-box p-6 shadow-md hover:shadow-lg transition reveal-3"
          >
            <div>{item.icon}</div>
            <h3 className="text-xl font-semibold text-base-content mb-2 reveal-3">
              {item.title}
            </h3>
            <p className="text-primary-content reveal-3">{item.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CareerHighlights;
