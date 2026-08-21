import { useRef, useState } from "react";
import { Github, Linkedin, Menu, Moon, Smartphone, Sun, X } from "lucide-react";
import { useGSAP } from "@gsap/react";
import { gsap } from "../../motion/bootstrap";
import { useReducedMotion } from "../../motion/useReducedMotion";
import { useTheme } from "../../motion/useTheme";
import { mixHex, palette } from "../../motion/palette";

const NAV_LINKS = [
  { href: "#destaques", label: "Destaques" },
  { href: "#projetos", label: "Projetos" },
  { href: "#skills", label: "Skills" },
  { href: "#certificacoes", label: "Certificações" },
  { href: "#contato", label: "Contato" },
];

const HEADLINE_LINES = [
  "Integrações SAP Business One",
  "e produtos fullstack",
  "que sustentam operação real",
];

const TECH_CHIPS = ["SAP HANA", "React", "PostgreSQL", "Node.js"];

/**
 * Barra de navegação persistente — extraída do antigo Header.tsx. Renderizada como
 * `position: fixed` fora da árvore de conteúdo scrollável (montada em App.tsx como irmã
 * do wrapper principal), para não correr o risco de virar `position: absolute` caso
 * qualquer ancestral ganhe `transform` no futuro (ver 10_validacao §0.2).
 */
export function HeroTopNav() {
  const { theme, toggleTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="fixed top-0 left-0 right-0 z-50">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 md:px-6">
        <a
          href="#hero"
          className="font-display text-lg font-semibold tracking-tight text-primary"
        >
          GM<span className="text-accent">.</span>
        </a>

        <nav className="hidden items-center gap-6 font-mono text-xs uppercase tracking-[0.15em] md:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-base-content/70 transition hover:text-accent"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={toggleTheme}
            className="btn btn-sm btn-outline border-primary text-primary"
            aria-label={theme === "dark" ? "Ativar tema claro" : "Ativar tema escuro"}
          >
            {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
          </button>
          <button
            type="button"
            onClick={() => setIsMenuOpen((prev) => !prev)}
            className="btn btn-sm btn-ghost text-primary md:hidden"
            aria-label={isMenuOpen ? "Fechar menu" : "Abrir menu"}
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <nav className="space-y-1 border-t border-base-300 bg-base-100/95 px-4 py-4 font-mono text-sm uppercase tracking-widest shadow-xl backdrop-blur md:hidden">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setIsMenuOpen(false)}
              className="block py-2 text-base-content/80 hover:text-accent"
            >
              {link.label}
            </a>
          ))}
        </nav>
      )}
    </div>
  );
}

export default function HeroCircuit() {
  const { prefersReducedMotion, isMobile, isLowPower } = useReducedMotion();
  const { theme } = useTheme();

  const sectionRef = useRef<HTMLElement>(null);
  const bgLayerRef = useRef<HTMLDivElement>(null);
  const gridPathRef = useRef<SVGPathElement>(null);
  const headlineWrapRef = useRef<HTMLDivElement>(null);
  const lineRefs = useRef<Array<HTMLSpanElement | null>>([]);
  const foregroundRef = useRef<HTMLDivElement>(null);

  // Cena 1 é a mais cara em GPUs de entrada (3 camadas). hardwareConcurrency<4/saveData
  // (isLowPower) recebe o mesmo tratamento simplificado do fallback mobile, por paridade.
  const useSimplifiedLayers = isMobile || isLowPower;

  useGSAP(
    () => {
      if (prefersReducedMotion) return; // fallback: camadas estáticas empilhadas, sem pin.

      const section = sectionRef.current;
      const bgLayer = bgLayerRef.current;
      const gridPath = gridPathRef.current;
      const headlineWrap = headlineWrapRef.current;
      const foreground = foregroundRef.current;
      const signalLayer = document.querySelector<HTMLElement>("[data-signal-layer]");
      if (!section || !bgLayer || !headlineWrap || !foreground) return;

      const pathLength = gridPath?.getTotalLength() ?? 0;
      if (gridPath) {
        gsap.set(gridPath, { strokeDasharray: pathLength, strokeDashoffset: pathLength });
      }

      const pinVh = useSimplifiedLayers ? 1 : 1.5;
      const target = mixHex(palette[theme].base100, palette[theme].primary, 0.4);

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${window.innerHeight * pinVh}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });

      // Entrada da headline em fragmentos — primeiro terço do pin.
      tl.from(
        lineRefs.current.filter(Boolean),
        { yPercent: 100, opacity: 0, stagger: 0.08, duration: 0.6, ease: "power3.out" },
        0
      );

      if (gridPath) {
        tl.to(gridPath, { strokeDashoffset: 0, duration: 1, ease: "none" }, 0);
      }

      // Parallax contínuo ao longo de todo o pin — só transform/opacity.
      if (useSimplifiedLayers) {
        // Mobile / low-power: 2 camadas (fundo+headline fundidos em uma só velocidade).
        tl.to([bgLayer, headlineWrap], { yPercent: -14, duration: 1, ease: "none" }, 0);
      } else {
        tl.to(bgLayer, { yPercent: -8, duration: 1, ease: "none" }, 0);
        tl.to(headlineWrap, { yPercent: -18, duration: 1, ease: "none" }, 0);
        tl.to(foreground, { yPercent: -30, duration: 1, ease: "none" }, 0);
      }

      // Crossfade de cor no fim do pin — sinaliza a virada para a Cena 2.
      if (signalLayer) {
        tl.to(signalLayer, { backgroundColor: target, duration: 0.3, ease: "none" }, 0.7);
      }

      return () => {
        tl.scrollTrigger?.kill();
        tl.kill();
      };
    },
    { scope: sectionRef, dependencies: [prefersReducedMotion, useSimplifiedLayers, theme] }
  );

  const showChips = !isMobile && !prefersReducedMotion;

  return (
    <section
      id="hero"
      ref={sectionRef}
      aria-label="Introdução"
      className="relative isolate flex min-h-dvh flex-col overflow-hidden pt-24"
    >
      {/* Camada de fundo — grid técnico SVG, "se desenha" conforme o scroll */}
      <div ref={bgLayerRef} className="pointer-events-none absolute inset-0" aria-hidden="true">
        <svg className="h-full w-full opacity-40" viewBox="0 0 800 600" preserveAspectRatio="none">
          <path
            ref={gridPathRef}
            d="M0,80 H800 M0,200 H800 M0,320 H800 M0,440 H800 M0,560 H800 M120,0 V600 M280,0 V600 M440,0 V600 M600,0 V600 M760,0 V600"
            stroke="currentColor"
            strokeWidth="1"
            className="text-secondary"
            fill="none"
          />
        </svg>
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-1 flex-col justify-center gap-12 px-6 md:grid md:grid-cols-[3fr_2fr] md:items-center md:gap-10">
        <div ref={headlineWrapRef} className="text-center md:text-left">
          <p className="mb-3 font-mono text-xs uppercase tracking-[0.3em] text-accent">
            Guilherme Martins // Desenvolvedor FullStack
          </p>

          <h1 className="font-display text-4xl font-semibold leading-[1.05] tracking-tight text-primary md:text-6xl">
            {HEADLINE_LINES.map((line, idx) => (
              <span key={line} className="block overflow-hidden">
                <span
                  ref={(el) => {
                    lineRefs.current[idx] = el;
                  }}
                  className="block"
                >
                  {line}
                </span>
              </span>
            ))}
          </h1>

          <p className="mx-auto mt-6 max-w-lg text-base leading-relaxed text-base-content/80 md:mx-0 md:text-lg">
            Analista de Desenvolvimento de Sistemas · Consultor de Integrações e Ecommerce ·
            Desenvolvimento de Aplicações e Consultoria de SAP Business One.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4 md:justify-start">
            <a href="#projetos" className="btn btn-primary">
              Projetos
            </a>
            <a
              href="/contents/curriculo.pdf"
              download="Curriculo-Guilherme-Martins.pdf"
              className="btn btn-outline btn-primary"
            >
              Download Currículo
            </a>
          </div>

          <div className="mt-6 flex justify-center gap-5 text-primary md:justify-start">
            <a
              href="https://github.com/Guih-henriqueee"
              target="_blank"
              rel="noopener noreferrer"
              className="transition hover:text-accent"
              aria-label="GitHub"
            >
              <Github size={24} />
            </a>
            <a
              href="https://linkedin.com/in/guih-henriquee"
              target="_blank"
              rel="noopener noreferrer"
              className="transition hover:text-accent"
              aria-label="LinkedIn"
            >
              <Linkedin size={24} />
            </a>
            <a
              href="https://api.whatsapp.com/send/?phone=5511967392111&text&type=phone_number&app_absent=0"
              target="_blank"
              rel="noopener noreferrer"
              className="transition hover:text-accent"
              aria-label="WhatsApp"
            >
              <Smartphone size={24} />
            </a>
          </div>

          {!showChips && (
            <ul className="mt-8 flex flex-wrap justify-center gap-2 md:justify-start">
              {TECH_CHIPS.map((chip) => (
                <li
                  key={chip}
                  className="rounded-box border border-secondary/40 px-3 py-1 font-mono text-[11px] uppercase tracking-wider text-secondary"
                >
                  {chip}
                </li>
              ))}
            </ul>
          )}
        </div>

        <div ref={foregroundRef} className="relative flex justify-center md:justify-end">
          <div className="relative w-60 overflow-hidden rounded-2xl shadow-lg shadow-primary/30 md:w-full md:max-w-sm">
            <img
              src="/assets/Profile.jpeg"
              alt="Foto de Guilherme Martins"
              width={480}
              height={576}
              className="h-72 w-full object-cover grayscale md:h-[26rem]"
              ref={(el) => el?.setAttribute("fetchpriority", "high")}
            />
            <div className="absolute inset-0 mix-blend-color bg-primary" aria-hidden="true" />
            <div className="absolute inset-0 mix-blend-multiply bg-base-100/25" aria-hidden="true" />
          </div>

          {showChips && (
            <div aria-hidden="true" className="pointer-events-none absolute inset-0">
              {TECH_CHIPS.map((chip, idx) => {
                const positions = [
                  "left-[-8%] top-[6%]",
                  "right-[-6%] top-[20%]",
                  "left-[-4%] bottom-[18%]",
                  "right-[-2%] bottom-[4%]",
                ];
                return (
                  <span
                    key={chip}
                    className={`absolute ${positions[idx % positions.length]} rounded-box border border-secondary/50 bg-base-200/90 px-3 py-1 font-mono text-[11px] uppercase tracking-wider text-secondary shadow-md`}
                  >
                    {chip}
                  </span>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
