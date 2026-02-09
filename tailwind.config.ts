import type { Config } from "tailwindcss";
import tailwindAnimate from "tailwindcss-animate";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
    "./providers/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "1.25rem",
      screens: {
        "2xl": "1200px",
      },
    },
    extend: {
      colors: {
        background: "#030303",
        foreground: "#F5F5F5",
        accent: "#39FF14",
        muted: "#0C0C0C",
        card: "#0A0A0A",
        border: "rgba(255,255,255,0.06)",
        cyber: {
          black: "#030303",
          dark: "#0D0D0D",
          gray: "#F5F5F5",
          lime: "#39FF14",
          danger: "#FF2E00",
        },
      },
      fontFamily: {
        sans: ["var(--font-space-grotesk)", "system-ui", "sans-serif"],
        mono: ["var(--font-space-grotesk)", "monospace"],
        display: ["var(--font-bebas-neue)", "system-ui", "sans-serif"],
      },
      borderRadius: {
        lg: "4px",
        md: "4px",
        sm: "2px",
        DEFAULT: "0px",
      },
      boxShadow: {
        glow: "0 0 0 1px rgba(57, 255, 20, 0.35), 0 0 25px rgba(57, 255, 20, 0.18)",
      },
      backgroundImage: {
        spotlight: "radial-gradient(circle at center, #141414 0%, #030303 100%)",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-6px)" },
        },
        pulseBorder: {
          "0%": { boxShadow: "0 0 0 0 rgba(57, 255, 20, 0.4)" },
          "70%": { boxShadow: "0 0 0 12px rgba(57, 255, 20, 0)" },
          "100%": { boxShadow: "0 0 0 0 rgba(57, 255, 20, 0)" },
        },
        particles: {
          "0%": { transform: "translateY(0px)", opacity: "0.6" },
          "50%": { transform: "translateY(-12px)", opacity: "1" },
          "100%": { transform: "translateY(0px)", opacity: "0.6" },
        },
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        "pulse-border": "pulseBorder 2.4s ease-in-out infinite",
        particles: "particles 7s ease-in-out infinite",
      },
    },
  },
  plugins: [tailwindAnimate],
};

export default config;
