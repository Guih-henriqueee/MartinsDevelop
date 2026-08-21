import { useRef } from "react";
import { Code2, Database, GitBranch, MonitorSmartphone, Server, type LucideIcon } from "lucide-react";
import { useGSAP } from "@gsap/react";
import { gsap } from "../../motion/bootstrap";
import { useReducedMotion } from "../../motion/useReducedMotion";

// Conteúdo real migrado de src/components/Skills.tsx.
interface SkillCategory {
  category: string;
  icon: LucideIcon;
  items: string[];
}

const skillCategories: SkillCategory[] = [
  {
    category: "Linguagens & Fundamentos",
    icon: Code2,
    items: ["TypeScript", "JavaScript", "Python", "Java (POO)"],
  },
  {
    category: "Front-end",
    icon: MonitorSmartphone,
    items: ["React", "Next.js", "Tailwind CSS + DaisyUI", "UI/UX aplicado", "Landing pages responsivas"],
  },
  {
    category: "Back-end & Integrações",
    icon: Server,
    items: ["Node.js", "APIs REST", "SAP Business One / HANA", "Integrações de E-commerce", "Multithreading"],
  },
  {
    category: "Dados",
    icon: Database,
    items: [
      "SQL (HANA, PostgreSQL, MySQL)",
      "MongoDB",
      "Redis",
      "Databricks",
      "Apache Spark",
      "Pandas",
      "Business Intelligence / Dashboards",
    ],
  },
  {
    category: "Infra & Qualidade",
    icon: GitBranch,
    items: ["CI/CD (GitHub Actions)", "Cloud AWS", "Git & GitHub"],
  },
];

const TILT_RANGE_DEG = 6;

export default function SkillsMatrix() {
  const { prefersReducedMotion } = useReducedMotion();
  const gridRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const container = gridRef.current;
      if (!container) return;
      const cards = gsap.utils.toArray<HTMLElement>(".skill-card", container);
      if (!cards.length) return;

      if (prefersReducedMotion) {
        gsap.from(cards, {
          opacity: 0,
          y: 12,
          duration: 0.5,
          stagger: 0.06,
          scrollTrigger: {
            trigger: container,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        });
        return;
      }

      gsap.from(cards, {
        opacity: 0,
        y: 28,
        rotateX: 8,
        transformPerspective: 800,
        transformOrigin: "top center",
        duration: 0.6,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: container,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      });

      const supportsFineHover =
        typeof window.matchMedia === "function" &&
        window.matchMedia("(hover: hover) and (pointer: fine)").matches;
      if (!supportsFineHover) return;

      const cleanupFns: Array<() => void> = [];

      cards.forEach((card) => {
        const glow = card.querySelector<HTMLElement>(".skill-glow");
        const quickRotateX = gsap.quickTo(card, "rotateX", { duration: 0.4, ease: "power3.out" });
        const quickRotateY = gsap.quickTo(card, "rotateY", { duration: 0.4, ease: "power3.out" });
        const quickGlow = glow
          ? gsap.quickTo(glow, "opacity", { duration: 0.3, ease: "power2.out" })
          : null;

        const handleMove = (event: MouseEvent) => {
          const rect = card.getBoundingClientRect();
          const px = (event.clientX - rect.left) / rect.width - 0.5;
          const py = (event.clientY - rect.top) / rect.height - 0.5;
          quickRotateX(py * -TILT_RANGE_DEG * 2);
          quickRotateY(px * TILT_RANGE_DEG * 2);
          quickGlow?.(Math.min(1, Math.abs(px) + Math.abs(py)));
        };
        const handleLeave = () => {
          quickRotateX(0);
          quickRotateY(0);
          quickGlow?.(0);
        };

        card.addEventListener("mousemove", handleMove);
        card.addEventListener("mouseleave", handleLeave);
        cleanupFns.push(() => {
          card.removeEventListener("mousemove", handleMove);
          card.removeEventListener("mouseleave", handleLeave);
        });
      });

      return () => cleanupFns.forEach((fn) => fn());
    },
    { scope: gridRef, dependencies: [prefersReducedMotion] }
  );

  return (
    <section id="skills" aria-label="Competência técnica" className="relative z-10 py-20">
      <div className="mx-auto max-w-6xl px-6">
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-secondary">
          Matriz // Competência
        </p>
        <h2 className="mt-2 font-display text-3xl font-semibold tracking-tight text-primary md:text-5xl">
          Matriz de Competência
        </h2>

        <div ref={gridRef} className="mt-10 grid grid-cols-1 gap-6 [perspective:1000px] md:grid-cols-2">
          {skillCategories.map((group) => {
            const Icon = group.icon;
            return (
              <div
                key={group.category}
                className="skill-card relative overflow-hidden rounded-box border border-base-300 bg-base-200 p-6 shadow-md [transform-style:preserve-3d] will-change-transform"
              >
                <div
                  className="skill-glow pointer-events-none absolute inset-0 opacity-0"
                  style={{
                    background:
                      "radial-gradient(circle at center, color-mix(in oklch, var(--accent) 35%, transparent) 0%, transparent 70%)",
                  }}
                  aria-hidden="true"
                />
                <div className="relative flex items-center gap-3">
                  <Icon size={22} className="text-accent" aria-hidden="true" />
                  <h3 className="font-display text-xl font-medium text-base-content md:text-2xl">
                    {group.category}
                  </h3>
                </div>
                <div className="relative mt-4 flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <span
                      key={item}
                      className="rounded-box border border-base-content/25 px-2.5 py-1 font-mono text-xs text-base-content/80"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
