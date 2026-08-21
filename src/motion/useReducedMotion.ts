import {
  createContext,
  createElement,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export interface MotionCapabilities {
  /** `prefers-reduced-motion: reduce` — sinal de acessibilidade, deve ser sempre respeitado. */
  prefersReducedMotion: boolean;
  /** Heurística de dispositivo/conexão fraca: saveData, effectiveType 2g/slow-2g ou hardwareConcurrency < 4. */
  isLowPower: boolean;
  /** Viewport < 768px (mesmo breakpoint usado nos fallbacks mobile do plano). */
  isMobile: boolean;
  /** true quando a Cena 0 (Boot) deve ser pulada inteiramente. */
  skipBoot: boolean;
}

const defaultCapabilities: MotionCapabilities = {
  prefersReducedMotion: false,
  isLowPower: false,
  isMobile: false,
  skipBoot: false,
};

const MotionCapabilitiesContext = createContext<MotionCapabilities>(defaultCapabilities);

interface NavigatorConnection {
  saveData?: boolean;
  effectiveType?: "slow-2g" | "2g" | "3g" | "4g";
}

function computeIsLowPower(): boolean {
  if (typeof navigator === "undefined") return false;

  const connection = (navigator as Navigator & { connection?: NavigatorConnection })
    .connection;
  const saveData = connection?.saveData === true;
  const slowConnection = connection?.effectiveType
    ? ["slow-2g", "2g"].includes(connection.effectiveType)
    : false;
  const lowCores =
    typeof navigator.hardwareConcurrency === "number" && navigator.hardwareConcurrency < 4;

  return saveData || slowConnection || lowCores;
}

export function MotionCapabilitiesProvider({ children }: { children: ReactNode }) {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(() =>
    typeof window !== "undefined"
      ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
      : false
  );
  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== "undefined" ? window.matchMedia("(max-width: 767px)").matches : false
  );
  const [isLowPower] = useState(computeIsLowPower);

  useEffect(() => {
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const mobileQuery = window.matchMedia("(max-width: 767px)");

    const onMotionChange = (event: MediaQueryListEvent) => setPrefersReducedMotion(event.matches);
    const onMobileChange = (event: MediaQueryListEvent) => setIsMobile(event.matches);

    motionQuery.addEventListener("change", onMotionChange);
    mobileQuery.addEventListener("change", onMobileChange);

    return () => {
      motionQuery.removeEventListener("change", onMotionChange);
      mobileQuery.removeEventListener("change", onMobileChange);
    };
  }, []);

  const value = useMemo<MotionCapabilities>(
    () => ({
      prefersReducedMotion,
      isLowPower,
      isMobile,
      skipBoot: prefersReducedMotion || isLowPower,
    }),
    [prefersReducedMotion, isLowPower, isMobile]
  );

  return createElement(MotionCapabilitiesContext.Provider, { value }, children);
}

export function useReducedMotion(): MotionCapabilities {
  return useContext(MotionCapabilitiesContext);
}
