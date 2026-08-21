import { useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "../../motion/bootstrap";
import { useReducedMotion } from "../../motion/useReducedMotion";

const BOOT_TEXT = "Guilherme Martins // Fullstack · SAP B1 · Ecommerce";
const SESSION_KEY = "gm-boot-seen";

type Phase = "typing" | "closing" | "hidden";

/**
 * Cena 0 — Boot. Overlay de tela cheia com efeito de terminal, só na primeira visita da
 * sessão. Pulado inteiramente (nunca montado) quando `prefers-reduced-motion: reduce` ou
 * quando a heurística de conexão/dispositivo fraco (`skipBoot`) indica que o custo não vale
 * a pena — nesses casos o Hero já aparece direto, sem nenhum layout shift (Boot nunca
 * ocupou espaço no documento).
 */
export default function Boot() {
  const { skipBoot } = useReducedMotion();

  const [phase, setPhase] = useState<Phase>(() => {
    if (skipBoot) return "hidden";
    if (typeof window === "undefined") return "hidden";
    try {
      return window.sessionStorage.getItem(SESSION_KEY) === "1" ? "hidden" : "typing";
    } catch {
      return "typing";
    }
  });

  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);

  const dismiss = () => {
    setPhase((prev) => (prev === "typing" ? "closing" : prev));
  };

  // Typewriter — gsap.to sobre um proxy numérico controla quantos caracteres exibir.
  useGSAP(
    () => {
      if (phase !== "typing") return;
      const el = textRef.current;
      if (!el) return;

      el.textContent = "";
      const proxy = { chars: 0 };

      const tween = gsap.to(proxy, {
        chars: BOOT_TEXT.length,
        duration: 1.2,
        ease: "none",
        onUpdate: () => {
          el.textContent = BOOT_TEXT.slice(0, Math.round(proxy.chars));
        },
        onComplete: () => {
          gsap.delayedCall(0.5, dismiss);
        },
      });

      return () => tween.kill();
    },
    { scope: containerRef, dependencies: [phase] }
  );

  // Fade + scale-down de saída, revelando o Hero por trás.
  useGSAP(
    () => {
      if (phase !== "closing") return;
      const container = containerRef.current;
      if (!container) return;

      gsap.to(container, {
        opacity: 0,
        scale: 0.96,
        duration: 0.5,
        ease: "power2.inOut",
        onComplete: () => {
          try {
            window.sessionStorage.setItem(SESSION_KEY, "1");
          } catch {
            /* sessionStorage indisponível (modo privado) — apenas não persiste entre abas */
          }
          setPhase("hidden");
        },
      });
    },
    { scope: containerRef, dependencies: [phase] }
  );

  // Pulável explicitamente por clique, tecla ou scroll — não depende só de reduced-motion.
  useEffect(() => {
    if (phase !== "typing") return;

    const handleSkip = () => dismiss();
    window.addEventListener("keydown", handleSkip);
    window.addEventListener("wheel", handleSkip, { passive: true });
    window.addEventListener("touchstart", handleSkip, { passive: true });

    return () => {
      window.removeEventListener("keydown", handleSkip);
      window.removeEventListener("wheel", handleSkip);
      window.removeEventListener("touchstart", handleSkip);
    };
  }, [phase]);

  if (phase === "hidden") return null;

  return (
    <div
      ref={containerRef}
      role="dialog"
      aria-label="Introdução"
      aria-live="off"
      className="fixed inset-0 z-[200] flex items-center justify-center bg-base-100 px-6"
    >
      <button
        type="button"
        onClick={dismiss}
        className="absolute right-6 top-6 font-mono text-xs uppercase tracking-widest text-base-content/50 transition hover:text-accent"
      >
        Pular intro
      </button>
      <p
        ref={textRef}
        aria-live="polite"
        className="terminal-caret text-center font-mono text-lg text-accent md:text-2xl"
      />
    </div>
  );
}
