const { Config } = require("tailwindcss");

/**
 * Tema DaisyUI "Circuito Noturno" — cobre (condutor) + verde-terminal (sinal ativo)
 * sobre obsidiana azulada. Dark é o tema padrão (a página "nasce" no escuro);
 * light é a variante "papel de blueprint". Valores espelham src/styles/globals.css §1.2.
 */
const config = {
  content: ["./index.html", "./src/**/*.{ts,tsx,js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Clash Display"', "ui-sans-serif", "system-ui"],
        mono: ['"JetBrains Mono"', "ui-monospace", "SFMono-Regular"],
        sans: ['"Inter"', "ui-sans-serif", "system-ui"],
      },
      height: {
        dvh: "100dvh",
        svh: "100svh",
      },
      minHeight: {
        dvh: "100dvh",
        svh: "100svh",
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        dark: {
          "base-100": "oklch(15% 0.02 260)",
          "base-200": "oklch(19% 0.025 260)",
          "base-300": "oklch(26% 0.03 260)",
          "base-content": "oklch(94% 0.01 260)",

          "primary": "oklch(68% 0.16 45)",
          "primary-content": "oklch(14% 0.03 45)",

          "secondary": "oklch(62% 0.16 255)",
          "secondary-content": "oklch(14% 0.03 255)",

          "accent": "oklch(84% 0.22 130)",
          "accent-content": "oklch(16% 0.05 130)",

          "neutral": "oklch(26% 0.03 260)",
          "neutral-content": "oklch(94% 0.01 260)",

          "info": "oklch(62% 0.16 255)",
          "info-content": "oklch(14% 0.03 255)",
          "success": "oklch(84% 0.22 130)",
          "success-content": "oklch(16% 0.05 130)",
          "warning": "oklch(78% 0.17 75)",
          "warning-content": "oklch(16% 0.04 75)",
          "error": "oklch(62% 0.21 25)",
          "error-content": "oklch(96% 0.01 25)",

          "radius-selector": "0.5rem",
          "radius-field": "0.5rem",
          "radius-box": "1rem",
          "size-selector": "0.25rem",
          "size-field": "0.25rem",
          "border": "1px",
          "depth": "0",
          "noise": "0",
        },
        light: {
          "base-100": "oklch(97% 0.01 90)",
          "base-200": "oklch(93% 0.015 90)",
          "base-300": "oklch(85% 0.02 90)",
          "base-content": "oklch(20% 0.02 260)",

          "primary": "oklch(52% 0.15 40)",
          "primary-content": "oklch(97% 0.01 40)",

          "secondary": "oklch(48% 0.16 258)",
          "secondary-content": "oklch(97% 0.01 258)",

          "accent": "oklch(55% 0.17 135)",
          "accent-content": "oklch(97% 0.01 135)",

          "neutral": "oklch(85% 0.02 90)",
          "neutral-content": "oklch(20% 0.02 260)",

          "info": "oklch(48% 0.16 258)",
          "info-content": "oklch(97% 0.01 258)",
          "success": "oklch(55% 0.17 135)",
          "success-content": "oklch(97% 0.01 135)",
          "warning": "oklch(60% 0.16 75)",
          "warning-content": "oklch(16% 0.03 75)",
          "error": "oklch(62% 0.21 25)",
          "error-content": "oklch(97% 0.01 25)",

          "radius-selector": "0.5rem",
          "radius-field": "0.5rem",
          "radius-box": "1rem",
          "size-selector": "0.25rem",
          "size-field": "0.25rem",
          "border": "1px",
          "depth": "0",
          "noise": "0",
        },
      },
    ],
  },
};

export default config;
