const { Config } = require("tailwindcss");


const config = {
  content: ["./index.html", "./src/**/*.{ts,tsx,js,jsx}"],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        light: {
          
          "custom-gradient-light": "linear-gradient(to bottom, rgba(255,255,255,0.85), rgba(255,255,255,0.9))",
          "base-100": "oklch(100% 0 0)",
          "base-200": "oklch(93% 0 0)",
          "base-300": "oklch(86% 0 0)",
          "base-content": "oklch(35.519% 0.032 262.988)",
          "primary": "oklch(76.662% 0.135 153.45)",
          "primary-content": "oklch(33.387% 0.04 162.24)",
          "secondary": "oklch(61.302% 0.202 261.294)",
          "secondary-content": "oklch(100% 0 0)",
          "accent": "oklch(72.772% 0.149 33.2)",
          "accent-content": "oklch(0% 0 0)",
          "neutral": "oklch(35.519% 0.032 262.988)",
          "neutral-content": "oklch(98.462% 0.001 247.838)",
          "info": "oklch(72.06% 0.191 231.6)",
          "info-content": "oklch(0% 0 0)",
          "success": "oklch(64.8% 0.15 160)",
          "success-content": "oklch(0% 0 0)",
          "warning": "oklch(84.71% 0.199 83.87)",
          "warning-content": "oklch(0% 0 0)",
          "error": "oklch(71.76% 0.221 22.18)",
          "error-content": "oklch(0% 0 0)",
          "radius-selector": "1rem",
          "radius-field": "0.5rem",
          "radius-box": "1rem",
          "size-selector": "0.25rem",
          "size-field": "0.25rem",
          "border": "1px",
          "depth": "0",
          "noise": "0",

        },

        dark: {
          "custom-gradient-dark": "linear-gradient(to bottom, rgba(0,0,0,0.85), rgba(0,0,0,0.95))",
          "base-100": "oklch(15% 0.02 260)",      // fundo escuro suave
          "base-200": "oklch(20% 0.03 260)",      // fundo um pouco mais claro
          "base-300": "oklch(25% 0.04 260)",      // mais claro ainda para bordas, cards
          "base-content": "oklch(90% 0.02 260)",  // texto claro, contraste alto

          "primary": "oklch(55% 0.18 160)",       // um roxo vibrante escuro
          "primary-content": "oklch(98% 0.01 280)", // texto claro sobre primary

          "secondary": "oklch(45% 0.20 30)",      // laranja escuro queimado
          "secondary-content": "oklch(95% 0.02 30)", // texto claro sobre secondary

          "accent": "oklch(40% 0.20 210)",        // azul escuro vibrante
          "accent-content": "oklch(98% 0.01 280)", // texto claro sobre accent

          "neutral": "oklch(30% 0.03 260)",       // neutro escuro para elementos secundários
          "neutral-content": "oklch(90% 0.02 260)", // texto claro sobre neutro

          "info": "oklch(50% 0.20 230)",          // azul suave escuro para info
          "success": "oklch(45% 0.20 140)",       // verde escuro suave
          "warning": "oklch(55% 0.22 90)",        // amarelo queimado
          "error": "oklch(50% 0.25 20)",          // vermelho escuro

          "gradient":
            "radial-gradient(circle at 70% 20%, #44002f 0%, #5a004b 40%, #6d0061 80%, #7e0076 100%), linear-gradient(135deg, #3d0032 0%, #58004a 100%)",

          // Mantém o resto igual ao light (ou ajuste conforme quiser)
          "radius-selector": "1rem",
          "radius-field": "0.5rem",
          "radius-box": "1rem",
          "size-selector": "0.25rem",
          "size-field": "0.25rem",
          "border": "1px",
          "depth": "0",
          "noise": "0",
        },
      },]
  },
};

export default config;
