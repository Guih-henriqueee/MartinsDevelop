import { useRef, useState } from "react";
import { ImageOff } from "lucide-react";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "../../motion/bootstrap";
import { useReducedMotion } from "../../motion/useReducedMotion";

// Conteúdo real migrado de src/components/Projects.tsx (antes da reescrita).
const projects = [
  {
    title: "APIs RESTfuls",
    description:
      "Construção de APIs em diferentes linguagens, com controle transacional, administração de recursos e integração entre sistemas.",
    link: "https://github.com/Guih-henriqueee/api-agendamentos",
    image: "/assets/ApiResful.png",
    tags: ["Python", "JavaScript", "TypeScript"],
    active: false,
  },
  {
    title: "Dashboard Shadcn",
    description:
      "Dashboard gerencial com indicadores de performance, utilizando Shadcn e TanStack Table para visualização eficiente de dados.",
    link: "https://user-management-6u8t.vercel.app/",
    image: "/assets/DashboardShadcn.png",
    tags: ["React", "Shadcn", "TanStack"],
    active: true,
  },
  {
    title: "Pipelines DevOps",
    description:
      "Criação de pipelines CI/CD para validação automática e deploy seguro, evitando bugs em check-ins de novas versões.",
    link: "https://github.com/Guih-henriqueee/",
    image: "/assets/Pipelines.png",
    tags: ["CI/CD", "GitHub Actions", "Shell"],
    active: false,
  },
  {
    title: "Integrador Backend",
    description:
      "Sistema em Python para integrar e gerenciar pedidos de múltiplos painéis via API, com armazenamento em PostgreSQL, validação automática de tabelas e rotinas de atualização contínua. Usa multithreading para otimizar o processamento e inclui logs detalhados para monitoramento.",
    link: "https://github.com/Guih-henriqueee/Integrador",
    image: "/assets/Integrador.png",
    tags: ["Python", "PostgreSQL", "Multithreading"],
    active: false,
  },
  {
    title: "Landing Pages",
    description:
      "Desenvolvimento de landing pages responsivas e otimizadas, aplicando as melhores práticas de UI/UX com foco em performance e experiência do usuário.",
    link: "https://rozz-project.vercel.app/",
    image: "/assets/LandingPages.png",
    tags: ["React", "TailwindCSS", "UX/UI"],
    active: true,
  },
  {
    title: "Fullstack Projects",
    description:
      "Desenvolvimento completo de aplicações modernas, com foco em front-end e back-end, usando tecnologias atuais e melhores práticas para soluções escaláveis e eficientes.",
    link: "https://github.com/Guih-henriqueee/",
    image: "/assets/Fullstack.png",
    tags: ["Fullstack", "Node.js", "React"],
    active: false,
  },
];

function ProjectCard({
  project,
  index,
  imgError,
  onImgError,
  linkRef,
  eager,
}: {
  project: (typeof projects)[number];
  index: number;
  imgError: boolean;
  onImgError: () => void;
  linkRef?: (el: HTMLAnchorElement | null) => void;
  eager: boolean;
}) {
  return (
    <article className="project-card flex h-full flex-col overflow-hidden rounded-box border border-base-300 bg-base-200 shadow-md">
      {project.image && !imgError ? (
        <img
          src={project.image}
          alt={project.title}
          className="h-48 w-full object-cover"
          loading={eager ? "eager" : "lazy"}
          decoding="async"
          onError={onImgError}
          ref={(el) => el?.setAttribute("fetchpriority", eager ? "high" : "auto")}
        />
      ) : (
        <div className="flex h-48 w-full items-center justify-center bg-base-100 text-base-content">
          <ImageOff size={48} aria-hidden="true" />
        </div>
      )}

      <div className="flex flex-grow flex-col justify-between p-5">
        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-secondary">
            Estação {String(index + 1).padStart(2, "0")}
          </p>
          <h3 className="mt-1 font-display text-xl font-semibold text-base-content">
            {project.title}
          </h3>
          <p className="mt-2 text-sm text-base-content/80">{project.description}</p>
        </div>

        <div className="mt-6 flex items-end justify-between gap-3">
          {project.active ? (
            <a
              ref={linkRef}
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-sm btn-outline btn-primary w-fit"
            >
              Ver Projeto
            </a>
          ) : (
            <span className="font-mono text-[10px] uppercase tracking-widest text-base-content/40">
              Repositório privado
            </span>
          )}

          <div className="flex flex-wrap justify-end gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-box border border-base-content/30 px-2 py-[2px] font-mono text-[10px] uppercase text-base-content/70"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </article>
  );
}

export default function ProjectsHorizontal() {
  const { isMobile, prefersReducedMotion } = useReducedMotion();
  const [erroredImages, setErroredImages] = useState<Set<number>>(new Set());

  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const linkRefs = useRef<Array<HTMLAnchorElement | null>>([]);

  const markImgError = (idx: number) =>
    setErroredImages((prev) => new Set(prev).add(idx));

  const isDesktopMotion = !isMobile && !prefersReducedMotion;

  useGSAP(
    () => {
      if (!isDesktopMotion) return;
      const section = sectionRef.current;
      const track = trackRef.current;
      if (!section || !track) return;

      const getScrollAmount = () => Math.max(0, track.scrollWidth - section.clientWidth);

      const tween = gsap.to(track, {
        x: () => -getScrollAmount(),
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${getScrollAmount()}`,
          scrub: 0.5,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            if (progressBarRef.current) {
              gsap.set(progressBarRef.current, { scaleX: Math.max(self.progress, 0.02) });
            }
            const lastIndex = projects.length - 1;
            const activeIndex = Math.min(lastIndex, Math.round(self.progress * lastIndex));
            linkRefs.current.forEach((el, i) => {
              if (!el) return;
              el.tabIndex = i === activeIndex || i === activeIndex + 1 ? 0 : -1;
            });
          },
        },
      });

      return () => {
        tween.scrollTrigger?.kill();
        tween.kill();
      };
    },
    { scope: sectionRef, dependencies: [isDesktopMotion] }
  );

  const heading = (
    <div className="mx-auto max-w-6xl px-6 pt-16">
      <p className="font-mono text-xs uppercase tracking-[0.3em] text-secondary">
        Galeria // Projetos
      </p>
      <h2 className="mt-2 font-display text-3xl font-semibold tracking-tight text-primary md:text-5xl">
        Projetos Pessoais
      </h2>
    </div>
  );

  // --- Reduced motion: grid vertical estático, zero GSAP, sem pin/scroll horizontal. ---
  if (prefersReducedMotion) {
    return (
      <section id="projetos" aria-label="Projetos" className="relative z-10 space-y-8 py-16">
        {heading}
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 px-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, idx) => (
            <ProjectCard
              key={project.title}
              project={project}
              index={idx}
              imgError={erroredImages.has(idx)}
              onImgError={() => markImgError(idx)}
              eager={idx < 2}
            />
          ))}
        </div>
      </section>
    );
  }

  // --- Mobile: carrossel scroll-snap nativo, zero GSAP (pin horizontal desligado). ---
  if (isMobile) {
    return (
      <section id="projetos" aria-label="Projetos" className="relative z-10 space-y-8 py-16">
        {heading}
        <div
          className="flex snap-x snap-mandatory gap-5 overflow-x-auto px-6 pb-4 [-webkit-overflow-scrolling:touch]"
          role="list"
        >
          {projects.map((project, idx) => (
            <div key={project.title} role="listitem" className="w-[82vw] flex-none snap-start">
              <ProjectCard
                project={project}
                index={idx}
                imgError={erroredImages.has(idx)}
                onImgError={() => markImgError(idx)}
                eager={idx < 2}
              />
            </div>
          ))}
        </div>
      </section>
    );
  }

  // --- Desktop com motion: pin + scroll horizontal via GSAP/ScrollTrigger. ---
  return (
    <section
      id="projetos"
      ref={sectionRef}
      aria-label="Projetos"
      className="relative z-10 flex min-h-dvh flex-col justify-center overflow-hidden py-16"
    >
      <div
        aria-hidden="true"
        className="absolute left-0 right-0 top-0 z-10 h-[3px] bg-base-300"
      >
        <div
          ref={progressBarRef}
          className="h-full w-full origin-left scale-x-0 bg-primary"
        />
      </div>

      {heading}

      <div ref={trackRef} className="mt-10 flex w-max gap-6 px-6 will-change-transform">
        {projects.map((project, idx) => (
          <div key={project.title} className="w-[70vw] max-w-xl flex-none md:w-[42vw]">
            <ProjectCard
              project={project}
              index={idx}
              imgError={erroredImages.has(idx)}
              onImgError={() => markImgError(idx)}
              linkRef={(el) => {
                linkRefs.current[idx] = el;
              }}
              eager={idx < 2}
            />
          </div>
        ))}
      </div>
    </section>
  );
}

export { projects as projectsData };
