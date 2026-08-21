import { useRef, useState } from "react";
import { ImageOff } from "lucide-react";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "../../motion/bootstrap";
import { useReducedMotion } from "../../motion/useReducedMotion";

// Conteúdo real migrado de src/components/Certifications.tsx.
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
    skills: ["Java", "Programação Orientada a Objetos", "Encapsulamento", "Herança", "Polimorfismo", "Abstração"],
  },
  {
    title: "Introduction to Python for Data Science and Data Engineering",
    institution: "DataBricks",
    year: "Junho de 2025",
    link: "https://www.ev.org.br/",
    image: "/assets/Certificado4.png",
    skills: ["DataBricks", "Computação em Nuvem", "Apache Spark", "Pandas"],
  },
];

const FAN_ANGLES = [-6, -2, 2, 6];

function CertificationCard({
  cert,
  isOpen,
  onToggle,
  imgError,
  onImgError,
  cardRef,
}: {
  cert: (typeof certifications)[number];
  isOpen: boolean;
  onToggle: () => void;
  imgError: boolean;
  onImgError: () => void;
  cardRef: (el: HTMLDivElement | null) => void;
}) {
  return (
    <div
      ref={cardRef}
      className={`flex flex-col overflow-hidden rounded-box border border-base-300 bg-base-200 shadow-md transition-[height] duration-300 ${
        isOpen ? "h-[480px]" : "h-[340px]"
      }`}
    >
      {cert.image && !imgError ? (
        <div className="relative h-40 w-full shrink-0 overflow-hidden">
          <img
            src={cert.image}
            alt={cert.title}
            className="h-full w-full object-cover grayscale"
            loading="lazy"
            decoding="async"
            onError={onImgError}
          />
          <div className="absolute inset-0 bg-primary opacity-30" aria-hidden="true" />
        </div>
      ) : (
        <div className="flex h-40 w-full shrink-0 items-center justify-center bg-base-100 text-base-content">
          <ImageOff size={40} aria-hidden="true" />
        </div>
      )}

      <div className="flex flex-1 flex-col overflow-hidden p-5">
        <button
          type="button"
          onClick={onToggle}
          aria-expanded={isOpen}
          className="text-left font-display text-lg font-semibold text-base-content hover:text-primary"
        >
          {cert.title}
        </button>
        <p className="mt-1 font-mono text-xs uppercase tracking-wide text-base-content/60">
          {cert.institution} · {cert.year}
        </p>
        <a
          href={cert.link}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-1 text-sm text-primary underline"
        >
          Ver instituição
        </a>

        {isOpen && (
          <ul className="mt-3 flex-1 space-y-1 overflow-y-auto font-mono text-xs text-base-content/80">
            {cert.skills.map((skill) => (
              <li key={skill}>· {skill}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default function CredentialsFan() {
  const { prefersReducedMotion, isMobile } = useReducedMotion();
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [erroredImages, setErroredImages] = useState<Set<number>>(new Set());

  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<Array<HTMLDivElement | null>>([]);

  const usePin = !isMobile && !prefersReducedMotion;

  const toggleOpen = (idx: number) => {
    setOpenIndex((prev) => (prev === idx ? null : idx));
    // Cards mudam de altura ao expandir — mantém os cálculos de pin/posição sincronizados.
    requestAnimationFrame(() => ScrollTrigger.refresh());
  };

  useGSAP(
    () => {
      if (prefersReducedMotion) return; // cards já nas posições finais, sem animação de abertura.

      const cards = cardRefs.current.filter((el): el is HTMLDivElement => Boolean(el));
      const container = trackRef.current;
      if (!cards.length || !container) return;

      if (usePin) {
        const containerRect = container.getBoundingClientRect();
        const centerX = containerRect.left + containerRect.width / 2;

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: () => `+=${window.innerHeight}`,
            pin: true,
            scrub: 1,
            invalidateOnRefresh: true,
          },
        });

        cards.forEach((card, idx) => {
          const rect = card.getBoundingClientRect();
          const cardCenterX = rect.left + rect.width / 2;
          const dx = centerX - cardCenterX;
          const jitter = idx % 2 === 0 ? -5 : 5;

          tl.fromTo(
            card,
            { x: dx, y: -16, rotate: jitter, zIndex: cards.length - idx },
            { x: 0, y: 0, rotate: FAN_ANGLES[idx % FAN_ANGLES.length], duration: 1, ease: "none" },
            idx * 0.08
          );
        });

        return () => {
          tl.scrollTrigger?.kill();
          tl.kill();
        };
      }

      // Mobile (motion habilitado, pin desligado): deslocamento vertical + opacidade,
      // disparado uma vez por card — sem rotação 3D (mais barato em GPUs móveis).
      const triggers = cards.map((card) => {
        gsap.set(card, { y: 24, opacity: 0 });
        return ScrollTrigger.create({
          trigger: card,
          start: "top 85%",
          onEnter: () => gsap.to(card, { y: 0, opacity: 1, duration: 0.5, ease: "power2.out" }),
        });
      });

      return () => triggers.forEach((st) => st.kill());
    },
    { scope: sectionRef, dependencies: [prefersReducedMotion, usePin] }
  );

  return (
    <section
      id="certificacoes"
      ref={sectionRef}
      aria-label="Certificações"
      className={`relative z-10 overflow-hidden py-20 ${usePin ? "flex min-h-dvh flex-col justify-center" : ""}`}
    >
      <div className="mx-auto max-w-6xl px-6">
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-secondary">
          Arquivo // Credenciais
        </p>
        <h2 className="mt-2 font-display text-3xl font-semibold tracking-tight text-primary md:text-5xl">
          Parede de Credenciais
        </h2>
      </div>

      <div
        ref={trackRef}
        className="mx-auto mt-12 grid max-w-6xl grid-cols-1 gap-6 px-6 md:grid-cols-2 lg:grid-cols-4"
      >
        {certifications.map((cert, idx) => (
          <CertificationCard
            key={cert.title}
            cert={cert}
            isOpen={openIndex === idx}
            onToggle={() => toggleOpen(idx)}
            imgError={erroredImages.has(idx)}
            onImgError={() => setErroredImages((prev) => new Set(prev).add(idx))}
            cardRef={(el) => {
              cardRefs.current[idx] = el;
            }}
          />
        ))}
      </div>
    </section>
  );
}
