import type { Config } from "tailwindcss";
import tailwindAnimate from "tailwindcss-animate";

const accent = "rgb(var(--accent-rgb) / <alpha-value>)";

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
        background: "var(--bg)",
        foreground: "var(--text-primary)",
        accent,
        muted: "var(--bg-alt)",
        card: "var(--surface)",
        border: "var(--border)",
        cyber: {
          black: "var(--bg)",
          dark: "var(--bg-alt)",
          gray: "var(--text-primary)",
          lime: accent,
          danger: "#FF2E00",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)"],
        mono: ["var(--font-sans)", "monospace"],
        display: ["var(--font-display)"],
      },
      borderRadius: {
        lg: "4px",
        md: "4px",
        sm: "2px",
        DEFAULT: "0px",
      },
      boxShadow: {
        glow: "var(--glow)",
      },
      backgroundImage: {
        spotlight:
          "radial-gradient(circle at center, color-mix(in srgb, var(--accent) 10%, transparent), var(--bg) 100%)",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-6px)" },
        },
        pulseBorder: {
          "0%": { boxShadow: "0 0 0 0 rgb(var(--accent-rgb) / 0.45)" },
          "70%": { boxShadow: "0 0 0 12px rgb(var(--accent-rgb) / 0)" },
          "100%": { boxShadow: "0 0 0 0 rgb(var(--accent-rgb) / 0)" },
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
