import { useEffect } from "react";
import { initMotion } from "../motion/bootstrap";
import { useReducedMotion } from "../motion/useReducedMotion";
import { ChatBot } from "../components/bot/AI-Assistence";
import Boot from "../components/scenes/Boot";
import HeroCircuit, { HeroTopNav } from "../components/scenes/HeroCircuit";
import BootPanel from "../components/scenes/BootPanel";
import CareerSignal from "../components/scenes/CareerSignal";
import ProjectsHorizontal from "../components/scenes/ProjectsHorizontal";
import SkillsMatrix from "../components/scenes/SkillsMatrix";
import CredentialsFan from "../components/scenes/CredentialsFan";
import ContactClose from "../components/scenes/ContactClose";

/**
 * Orquestração das 8 cenas de "Sinal & Circuito". Cada cena é uma "estação" de um único
 * circuito de scroll — não uma lista de cards empilhados. A faixa de fundo full-bleed
 * (`.bg-signal-layer` + `.bg-blueprint`) e o ChatBot ficam como IRMÃOS do conteúdo
 * scrollável, fora de qualquer árvore que uma futura transformação do Lenis possa afetar.
 */
function App() {
  const { prefersReducedMotion } = useReducedMotion();

  useEffect(() => {
    // Carregado depois do primeiro paint: nenhum RAF/listener de motion roda antes disso.
    const idle =
      "requestIdleCallback" in window
        ? window.requestIdleCallback
        : (cb: () => void) => window.setTimeout(cb, 200);

    const handle = idle(() => {
      initMotion(prefersReducedMotion);
    });

    return () => {
      if ("cancelIdleCallback" in window && typeof handle === "number") {
        window.cancelIdleCallback(handle);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="relative min-h-dvh bg-base-100 text-base-content font-sans">
      <div className="bg-signal-layer" data-signal-layer aria-hidden="true" />
      <div className="bg-blueprint" aria-hidden="true" />

      <Boot />
      <HeroTopNav />

      <a
        href="#conteudo"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:bg-primary focus:text-primary-content focus:px-4 focus:py-2 focus:rounded-field"
      >
        Pular para o conteúdo
      </a>

      <main id="conteudo" className="relative z-10">
        <HeroCircuit />
        <BootPanel />
        <CareerSignal />
        <ProjectsHorizontal />
        <SkillsMatrix />
        <CredentialsFan />
        <ContactClose />
      </main>

      <div className="fixed bottom-4 right-4 z-50">
        <ChatBot />
      </div>
    </div>
  );
}

export default App;
