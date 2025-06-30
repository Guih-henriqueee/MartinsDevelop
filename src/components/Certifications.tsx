import React, { useState } from "react";
import { ImageOff, ArrowLeftRight } from "lucide-react"; // ou qualquer outro ícone que use
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

const certifications = [
  {
    title: "Certificação em Python",
    institution: "FIAP",
    year: "2023",
    link: "https://www.fiap.com.br/",
    image: "/assets/Certificado2.png",
    skills: ["Python", "Banco de Dados", "Lógica de Programação", "Análise de Sistemas"],
  },
  {
    title: "Certificações Profissionais - Potência Tech",
    institution: "DIO (Digital Innovation One)",
    year: "2024/2025",
    link: "https://www.dio.me/",
    image: "/assets/Certificado1.png",
    skills: [
      "Git & GitHub",
      "Python",
      "Banco de Dados (SQL, MongoDB, Redis)",
      "Machine Learning",
      "Business Intelligence",
      "Cloud AWS",
      "Gestão de Projetos",
    ],
  },
  {
    title: "Certificação em Java Orientado a Objetos",
    institution: "Fundação Bradesco",
    year: "Março de 2024",
    link: "https://www.ev.org.br/",
    image: "/assets/Certificado3.png",
    skills: [
      "Java",
      "Programação Orientada a Objetos",
      "Encapsulamento",
      "Herança",
      "Polimorfismo",
      "Abstração",
    ],

  },
  {
    title: "Introduction to Python for Data Science and Data Engineering",
    institution: "DataBricks",
    year: "Junho de 2025",
    link: "https://www.ev.org.br/",
    image: "/assets/Certificado4.png",
    skills: [
      "DataBricks",
      "Computação em Nuvem",
      "Apache Spark",
      "Pandas",
    ],

  },
];
const CertificationCard = ({
  cert,
  idx,
  isOpen,
  toggleOpen,
}: {
  cert: typeof certifications[0];
  idx: number;
  isOpen: boolean;
  toggleOpen: (idx: number) => void;
}) => {
  const [imgError, setImgError] = useState(false);

  return (
    <div
      key={idx}
      className={`bg-base-200 rounded-box shadow-md hover:shadow-xl transition-shadow overflow-hidden border border-base-300 flex flex-col
        ${isOpen ? "h-[500px]" : "h-[346px]"}
      `}
    >
      {cert.image && !imgError ? (
        <div className="relative h-48 w-full overflow-hidden">
          <img
            src={cert.image}
            alt={cert.title}
            className="w-full h-full object-cover grayscale"
            onError={() => setImgError(true)}
          />
          <div className="absolute inset-0 bg-primary opacity-30 pointer-events-none"></div>
        </div>
      ) : (
        <div className="w-full h-48 flex items-center justify-center bg-base-100 text-base-content">
          <ImageOff size={48} />
        </div>
      )}

      <div className="p-5 flex flex-col flex-grow">
        <div>
          <button
            onClick={() => toggleOpen(idx)}
            className="text-left w-full font-semibold text-base-content hover:text-primary text-xl mb-2"
          >
            {cert.title}
          </button>
          <p className="text-primary-content text-sm mb-1">
            {cert.institution} • {cert.year}
          </p>
          <a
            href={cert.link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-primary underline"
          >
            Ver Instituição
          </a>
        </div>

        {isOpen && (
          <div className="mt-4 overflow-y-auto max-h-[160px]">
            <ul className="list-disc list-inside text-sm text-primary-content space-y-1">
              {cert.skills.map((skill, i) => (
                <li key={i}>{skill}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

const Certifications = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleOpen = (idx: number) => {
    setOpenIndex((prev) => (prev === idx ? null : idx));
  };

  return (
    <section id="certificacoes" className="space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold text-primary">Certificações</h2>
        {certifications.length > 3 && (
          <ArrowLeftRight className="text-primary w-6 h-6" />
        )}
      </div>

      {certifications.length > 3 ? (
        <Swiper
          spaceBetween={20}
          slidesPerView={1}
          breakpoints={{
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
        >
          {certifications.map((cert, idx) => (
            <SwiperSlide key={idx}>
              <CertificationCard
                cert={cert}
                idx={idx}
                isOpen={openIndex === idx}
                toggleOpen={toggleOpen}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {certifications.map((cert, idx) => (
            <CertificationCard
              key={idx}
              cert={cert}
              idx={idx}
              isOpen={openIndex === idx}
              toggleOpen={toggleOpen}
            />
          ))}
        </div>
      )}
    </section>
  );
};
export default Certifications;
