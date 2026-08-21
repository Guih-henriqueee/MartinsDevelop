import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import type LenisType from "lenis";

/**
 * Setup global de motion — GSAP + ScrollTrigger + Lenis.
 *
 * `gsap`/`ScrollTrigger` ficam registrados estaticamente (as cenas dependem de `useGSAP`
 * de forma síncrona). `lenis` (a única peça dispensável no primeiro paint) é importado
 * dinamicamente dentro de `initMotion`, chamada pelo App.tsx num efeito pós-mount — ou
 * seja, nenhum RAF loop, listener de scroll ou instância de smooth-scroll roda antes do
 * primeiro paint do Hero, mesmo que o bundle de gsap já tenha sido baixado.
 *
 * Quando `prefers-reduced-motion: reduce` está ativo, o Lenis NÃO é instanciado — o scroll
 * nativo do navegador assume, e cada cena usa `gsap.matchMedia()` para trocar para o
 * comportamento reduzido (fade+slide único, sem pin/scrub). ScrollTrigger funciona
 * perfeitamente sobre scroll nativo sem Lenis.
 */

gsap.registerPlugin(ScrollTrigger, SplitText);

let lenis: LenisType | null = null;
let initPromise: Promise<MotionBootstrapResult> | null = null;

export interface MotionBootstrapResult {
  lenis: LenisType | null;
  gsap: typeof gsap;
  ScrollTrigger: typeof ScrollTrigger;
}

export function initMotion(prefersReducedMotion: boolean): Promise<MotionBootstrapResult> {
  if (initPromise) return initPromise;

  initPromise = (async () => {
    ScrollTrigger.config({ ignoreMobileResize: true });

    if (!prefersReducedMotion) {
      const { default: Lenis } = await import("lenis");
      lenis = new Lenis({
        // `syncTouch: false` (o padrão desta versão) é o equivalente atual do antigo
        // `smoothTouch: false` do plano — scroll nativo em touch, Lenis só assume o
        // smoothing em desktop com mouse/trackpad (ver 08_novo_conceito_portfolio.md).
        syncTouch: false,
      });

      lenis.on("scroll", ScrollTrigger.update);

      gsap.ticker.add((time) => {
        lenis?.raf(time * 1000);
      });
      gsap.ticker.lagSmoothing(0);
    }

    if (typeof document !== "undefined" && document.fonts?.ready) {
      document.fonts.ready.then(() => ScrollTrigger.refresh());
    }

    let resizeTimeout: number | undefined;
    window.addEventListener("resize", () => {
      window.clearTimeout(resizeTimeout);
      resizeTimeout = window.setTimeout(() => ScrollTrigger.refresh(), 200);
    });

    return { lenis, gsap, ScrollTrigger };
  })();

  return initPromise;
}

export function getLenis(): LenisType | null {
  return lenis;
}

export { gsap, ScrollTrigger };
