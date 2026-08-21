import { useRef } from "react";
import { FileText, Laptop, Rocket, type LucideIcon } from "lucide-react";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "../../motion/bootstrap";
import { useReducedMotion } from "../../motion/useReducedMotion";

// Conteúdo real migrado de src/components/CareerHighlights.tsx.
interface Highlight {
  title: string;
  description: string;
  icon: LucideIcon;
}

const highlights: Highlight[] = [
  {
    title: "+3 anos de experiência",
    description:
      "Atuando como Líder em projetos de integração, automação e produtos escaláveis, na área de Ecommerce com SAP Business One.",
    icon: Laptop,
  },
  {
    title: "Projetos entregues",
    description:
      "Mais de 15 projetos em produção, incluindo soluções para e-commerce, APIs e dashboards corporativos, robôs de consolidação e tratamento de dados, scripts para automação de tarefas.",
    icon: Rocket,
  },
  {
    title: "Certificações reconhecidas",
    description:
      "Conquistas em plataformas como Databricks, CS50 Harvard, e treinamentos em SAP, APIs e arquitetura. Sempre evoluindo e atualizando conhecimento para estar atualizado para o mercado.",
    icon: FileText,
  },
];

export default function CareerSignal() {
  const { prefersReducedMotion, isMobile } = useReducedMotion();

  const sectionRef = useRef<HTMLElement>(null);
  const linePathRef = useRef<SVGPathElement>(null);
  const dotRefs = useRef<Array<HTMLDivElement | null>>([]);
  const textRefs = useRef<Array<HTMLDivElement | null>>([]);

  const usePin = !isMobile && !prefersReducedMotion;

  useGSAP(
    () => {
      const linePath = linePathRef.current;
      const length = linePath?.getTotalLength() ?? 0;

      if (linePath) {
        gsap.set(linePath, {
          strokeDasharray: length,
          strokeDashoffset: prefersReducedMotion ? 0 : length,
        });
      }

      if (prefersReducedMotion) {
        // Fallback de acessibilidade: fade+slide 12px único, disparado uma vez, sem scrub.
        highlights.forEach((_, idx) => {
          const dot = dotRefs.current[idx];
          const text = textRefs.current[idx];
          gsap.set([dot, text], { clearProps: "all" });
          gsap.from([dot, text].filter(Boolean), {
            opacity: 0,
            y: 12,
            duration: 0.5,
            ease: "power2.out",
            scrollTrigger: {
              trigger: text ?? dot ?? sectionRef.current,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          });
        });
        return;
      }

      if (usePin) {
        const section = sectionRef.current;
        if (!section) return;

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: () => `+=${window.innerHeight * 2}`,
            pin: true,
            scrub: 1,
            invalidateOnRefresh: true,
          },
        });

        if (linePath) {
          tl.to(linePath, { strokeDashoffset: 0, duration: 1, ease: "none" }, 0);
        }

        highlights.forEach((_, idx) => {
          const start = idx / highlights.length;
          const dot = dotRefs.current[idx];
          const text = textRefs.current[idx];
          const fromX = idx % 2 === 0 ? -40 : 40;

          if (dot) {
            tl.to(dot, { opacity: 1, scale: 1.2, duration: 0.12, ease: "power2.out" }, start).to(
              dot,
              { scale: 1, duration: 0.12, ease: "power2.out" },
              start + 0.12
            );
          }
          if (text) {
            tl.fromTo(
              text,
              { x: fromX, opacity: 0 },
              { x: 0, opacity: 1, duration: 0.28, ease: "power2.out" },
              start
            );
          }
        });

        return () => {
          tl.scrollTrigger?.kill();
          tl.kill();
        };
      }

      // Mobile (motion habilitado, pin desligado): entra via ScrollTrigger por nó,
      // sem pin/scrub — a linha desenha em segmentos conforme cada nó acende.
      highlights.forEach((_, idx) => {
        const dot = dotRefs.current[idx];
        const text = textRefs.current[idx];
        const fromX = idx % 2 === 0 ? -24 : 24;
        const targetOffset = length * (1 - (idx + 1) / highlights.length);

        const st = ScrollTrigger.create({
          trigger: text ?? dot ?? sectionRef.current,
          start: "top 80%",
          onEnter: () => {
            if (linePath) {
              gsap.to(linePath, { strokeDashoffset: targetOffset, duration: 0.6, ease: "power2.out" });
            }
            if (dot) gsap.to(dot, { opacity: 1, scale: 1, duration: 0.4, ease: "power2.out" });
            if (text) {
              gsap.fromTo(
                text,
                { x: fromX, opacity: 0 },
                { x: 0, opacity: 1, duration: 0.4, ease: "power2.out" }
              );
            }
          },
        });

        return () => st.kill();
      });
    },
    { scope: sectionRef, dependencies: [prefersReducedMotion, usePin] }
  );

  return (
    <section
      id="destaques"
      ref={sectionRef}
      aria-label="Destaques da carreira"
      className={`relative z-10 overflow-hidden py-20 ${usePin ? "min-h-dvh" : ""}`}
    >
      <div className="mx-auto max-w-6xl px-6">
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-secondary">
          Log // Trajetória
        </p>
        <h2 className="mt-2 font-display text-3xl font-semibold tracking-tight text-primary md:text-5xl">
          Sinal de Carreira
        </h2>
      </div>

      <div className="relative mx-auto mt-16 max-w-3xl px-6">
        <svg
          className="absolute left-1/2 top-0 h-full w-1 -translate-x-1/2"
          viewBox="0 0 4 600"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path
            ref={linePathRef}
            d="M2,0 V600"
            stroke="var(--primary)"
            strokeWidth="2"
            fill="none"
            vectorEffect="non-scaling-stroke"
          />
        </svg>

        <ul className="relative space-y-20 md:space-y-28">
          {highlights.map((item, idx) => {
            const Icon = item.icon;
            const isRight = idx % 2 === 1;
            return (
              <li
                key={item.title}
                className={`relative flex flex-col items-center gap-4 md:flex-row ${
                  isRight ? "md:flex-row-reverse" : ""
                }`}
              >
                <div
                  ref={(el) => {
                    dotRefs.current[idx] = el;
                  }}
                  className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-2 border-primary bg-base-200 text-primary shadow-[0_0_18px_-2px_var(--primary)]"
                  style={prefersReducedMotion ? undefined : { opacity: 0, transform: "scale(0.6)" }}
                >
                  <Icon size={22} aria-hidden="true" />
                </div>

                <div
                  ref={(el) => {
                    textRefs.current[idx] = el;
                  }}
                  className={`w-full rounded-box border border-base-300 bg-base-200/80 p-6 shadow-md md:w-[calc(50%-2rem)] ${
                    prefersReducedMotion ? "" : "opacity-0"
                  }`}
                >
                  <h3 className="font-display text-xl font-semibold text-base-content">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm text-base-content/80">{item.description}</p>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
