/**
 * Paleta "Circuito Noturno" em hex — espelha os tokens oklch de src/styles/globals.css.
 * Mantida como constantes JS porque o crossfade de fundo full-bleed (Hero → Cena 2, e o
 * extremo saturado da Cena 7) é feito via `gsap.to(el, { backgroundColor })`, que precisa
 * de um valor de cor concreto e previsível — em vez de depender de parsing de oklch()
 * em runtime pelo CSSPlugin.
 */
export const palette = {
  dark: {
    base100: "#0B0E16",
    base200: "#111623",
    base300: "#1C2233",
    baseContent: "#EDEFF4",
    primary: "#D97A3F",
    accent: "#B4E43A",
    secondary: "#5B79E8",
    error: "#E4553A",
  },
  light: {
    base100: "#F7F4EE",
    base200: "#EBE6DB",
    base300: "#D3CBB9",
    baseContent: "#14181F",
    primary: "#A85A2A",
    accent: "#5E8A1C",
    secondary: "#33499E",
    error: "#E4553A",
  },
} as const;

export type ThemeName = keyof typeof palette;

function hexToRgb(hex: string): [number, number, number] {
  const value = hex.replace("#", "");
  const bigint = parseInt(value, 16);
  return [(bigint >> 16) & 255, (bigint >> 8) & 255, bigint & 255];
}

function rgbToHex([r, g, b]: [number, number, number]): string {
  const toHex = (n: number) => Math.round(Math.min(255, Math.max(0, n))).toString(16).padStart(2, "0");
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

/** Interpola linearmente entre duas cores hex — usado nos crossfades de fundo full-bleed. */
export function mixHex(hexA: string, hexB: string, t: number): string {
  const [r1, g1, b1] = hexToRgb(hexA);
  const [r2, g2, b2] = hexToRgb(hexB);
  return rgbToHex([r1 + (r2 - r1) * t, g1 + (g2 - g1) * t, b1 + (b2 - b1) * t]);
}
