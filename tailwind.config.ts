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
        background: "#050505",
        foreground: "#F5F5F5",
        accent: "#D4F34A",
        muted: "#111111",
        card: "#0A0A0A",
        border: "rgba(255,255,255,0.06)",
        cyber: {
          black: "#050505",
          dark: "#111111",
          gray: "#F5F5F5",
          lime: "#D4F34A",
          danger: "#FF2E00",
        },
      },
      fontFamily: {
        sans: ["var(--font-manrope)", "system-ui", "sans-serif"],
        mono: ["var(--font-space-grotesk)", "monospace"],
        serif: ["var(--font-cormorant)", "serif"],
      },
      borderRadius: {
        lg: "4px",
        md: "4px",
        sm: "2px",
        DEFAULT: "0px",
      },
      boxShadow: {
        glow: "0 0 0 1px rgba(212, 243, 74, 0.35), 0 0 25px rgba(212, 243, 74, 0.18)",
      },
      backgroundImage: {
        spotlight: "radial-gradient(circle at center, #1a1a1a 0%, #050505 100%)",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-6px)" },
        },
        pulseBorder: {
          "0%": { boxShadow: "0 0 0 0 rgba(212, 243, 74, 0.4)" },
          "70%": { boxShadow: "0 0 0 12px rgba(212, 243, 74, 0)" },
          "100%": { boxShadow: "0 0 0 0 rgba(212, 243, 74, 0)" },
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
