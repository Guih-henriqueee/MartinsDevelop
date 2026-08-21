import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "../../motion/bootstrap";
import { useReducedMotion } from "../../motion/useReducedMotion";

// Métricas reais extraídas de CareerHighlights.tsx — faixa de prova de confiança,
// exibida logo após o Hero, agora com count-up amarrado ao progresso de scroll local.
interface Metric {
  target: number;
  prefix: string;
  suffix: string;
  label: string;
  minWidthCh: number;
}

const metrics: Metric[] = [
  { target: 3, prefix: "+", suffix: "", label: "Anos de experiência", minWidthCh: 2 },
  { target: 15, prefix: "", suffix: "+", label: "Projetos entregues", minWidthCh: 3 },
  { target: 4, prefix: "", suffix: "", label: "Certificações reconhecidas", minWidthCh: 2 },
];

export default function BootPanel() {
  const { prefersReducedMotion } = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const numberRefs = useRef<Array<HTMLParagraphElement | null>>([]);

  useGSAP(
    () => {
      const proxies = metrics.map(() => ({ value: 0 }));

      const format = (idx: number, raw: number) => {
        const m = metrics[idx];
        return `${m.prefix}${Math.round(raw)}${m.suffix}`;
      };

      // Estado inicial sempre visível (evita "0" piscando antes do JS/ScrollTrigger montar).
      numberRefs.current.forEach((el, idx) => {
        if (el) el.textContent = format(idx, prefersReducedMotion ? metrics[idx].target : 0);
      });

      if (prefersReducedMotion) {
        // Dispara 1x, sem scrub — mantemos o valor final estático (sem custo de tween).
        return;
      }

      const section = sectionRef.current;
      if (!section) return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
          end: "center center",
          scrub: true,
        },
      });

      metrics.forEach((_, idx) => {
        tl.to(
          proxies[idx],
          {
            value: metrics[idx].target,
            ease: "none",
            onUpdate: () => {
              const el = numberRefs.current[idx];
              if (el) el.textContent = format(idx, proxies[idx].value);
            },
          },
          0
        );
      });

      return () => {
        tl.scrollTrigger?.kill();
        tl.kill();
      };
    },
    { scope: sectionRef, dependencies: [prefersReducedMotion] }
  );

  return (
    <section
      ref={sectionRef}
      aria-label="Números em destaque"
      className="relative z-10 overflow-hidden border-y border-base-300 bg-base-200/60"
    >
      <div className="bg-scanline pointer-events-none absolute inset-0" aria-hidden="true" />

      <div className="relative mx-auto grid max-w-6xl grid-cols-1 gap-8 px-6 py-16 text-center sm:grid-cols-3">
        {metrics.map((metric, idx) => (
          <div key={metric.label}>
            <p
              ref={(el) => {
                numberRefs.current[idx] = el;
              }}
              className="font-variant-tabular mx-auto inline-block font-display text-4xl font-bold text-primary md:text-6xl"
              style={{ minWidth: `${metric.minWidthCh}ch` }}
              aria-hidden="true"
            >
              {metric.prefix}
              {metric.target}
              {metric.suffix}
            </p>
            <p className="mt-2 font-mono text-xs uppercase tracking-[0.2em] text-base-content/70">
              {metric.label}
            </p>
            <span className="sr-only">
              {metric.prefix}
              {metric.target}
              {metric.suffix} {metric.label}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
