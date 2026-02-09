export type ThemeName = "emerald" | "crimson" | "azure" | "ivory" | "obsidian";
export type ThemeMode = "auto" | "manual";

export type ThemePalette = {
  name: ThemeName;
  label: string;
  description: string;
  cssVars: {
    "--bg": string;
    "--bg-alt": string;
    "--surface": string;
    "--surface-alt": string;
    "--border": string;
    "--text-primary": string;
    "--text-muted": string;
    "--accent": string;
    "--accent-rgb": string;
    "--accent-soft": string;
    "--ring": string;
    "--glow": string;
    "--particle-a-rgb": string;
    "--particle-b-rgb": string;
  };
};

export const fallbackTheme: ThemeName = "emerald";

export const themes: Record<ThemeName, ThemePalette> = {
  emerald: {
    name: "emerald",
    label: "Emerald",
    description: "Energía técnica y agarre élite.",
    cssVars: {
      "--bg": "#040804",
      "--bg-alt": "#071008",
      "--surface": "rgba(11, 18, 12, 0.84)",
      "--surface-alt": "rgba(19, 31, 21, 0.74)",
      "--border": "rgba(163, 231, 173, 0.22)",
      "--text-primary": "#f4f8f2",
      "--text-muted": "rgba(229, 241, 232, 0.72)",
      "--accent": "#2BFF4F",
      "--accent-rgb": "43 255 79",
      "--accent-soft": "rgba(43, 255, 79, 0.16)",
      "--ring": "rgba(43, 255, 79, 0.55)",
      "--glow": "0 0 0 1px rgba(43,255,79,0.4), 0 0 35px rgba(43,255,79,0.3)",
      "--particle-a-rgb": "43 255 79",
      "--particle-b-rgb": "216 255 226",
    },
  },
  crimson: {
    name: "crimson",
    label: "Crimson",
    description: "Ritmo alto, reflejo agresivo y presencia.",
    cssVars: {
      "--bg": "#090304",
      "--bg-alt": "#130508",
      "--surface": "rgba(27, 9, 11, 0.86)",
      "--surface-alt": "rgba(39, 13, 16, 0.76)",
      "--border": "rgba(255, 132, 137, 0.24)",
      "--text-primary": "#fff5f5",
      "--text-muted": "rgba(255, 226, 226, 0.72)",
      "--accent": "#FF4D57",
      "--accent-rgb": "255 77 87",
      "--accent-soft": "rgba(255, 77, 87, 0.18)",
      "--ring": "rgba(255, 77, 87, 0.6)",
      "--glow": "0 0 0 1px rgba(255,77,87,0.45), 0 0 35px rgba(255,77,87,0.32)",
      "--particle-a-rgb": "255 77 87",
      "--particle-b-rgb": "255 214 214",
    },
  },
  azure: {
    name: "azure",
    label: "Azure",
    description: "Claridad táctica y control estable.",
    cssVars: {
      "--bg": "#04070c",
      "--bg-alt": "#070f17",
      "--surface": "rgba(10, 18, 28, 0.84)",
      "--surface-alt": "rgba(15, 28, 42, 0.76)",
      "--border": "rgba(128, 205, 255, 0.24)",
      "--text-primary": "#f3f8ff",
      "--text-muted": "rgba(220, 236, 255, 0.74)",
      "--accent": "#56B7FF",
      "--accent-rgb": "86 183 255",
      "--accent-soft": "rgba(86, 183, 255, 0.18)",
      "--ring": "rgba(86, 183, 255, 0.58)",
      "--glow": "0 0 0 1px rgba(86,183,255,0.44), 0 0 35px rgba(86,183,255,0.3)",
      "--particle-a-rgb": "86 183 255",
      "--particle-b-rgb": "222 243 255",
    },
  },
  ivory: {
    name: "ivory",
    label: "Ivory",
    description: "Luz limpia con contraste sobrio.",
    cssVars: {
      "--bg": "#08090a",
      "--bg-alt": "#0f1114",
      "--surface": "rgba(20, 23, 28, 0.84)",
      "--surface-alt": "rgba(27, 31, 36, 0.74)",
      "--border": "rgba(237, 241, 247, 0.28)",
      "--text-primary": "#f8fbff",
      "--text-muted": "rgba(227, 236, 247, 0.72)",
      "--accent": "#F4F7FF",
      "--accent-rgb": "244 247 255",
      "--accent-soft": "rgba(244, 247, 255, 0.16)",
      "--ring": "rgba(244, 247, 255, 0.6)",
      "--glow": "0 0 0 1px rgba(244,247,255,0.42), 0 0 32px rgba(244,247,255,0.22)",
      "--particle-a-rgb": "244 247 255",
      "--particle-b-rgb": "195 233 214",
    },
  },
  obsidian: {
    name: "obsidian",
    label: "Obsidian",
    description: "Negro editorial, foco absoluto en producto.",
    cssVars: {
      "--bg": "#020202",
      "--bg-alt": "#090909",
      "--surface": "rgba(18, 18, 18, 0.86)",
      "--surface-alt": "rgba(26, 26, 26, 0.76)",
      "--border": "rgba(214, 220, 226, 0.2)",
      "--text-primary": "#f2f4f6",
      "--text-muted": "rgba(214, 220, 226, 0.7)",
      "--accent": "#E6E8EA",
      "--accent-rgb": "230 232 234",
      "--accent-soft": "rgba(230, 232, 234, 0.16)",
      "--ring": "rgba(230, 232, 234, 0.58)",
      "--glow": "0 0 0 1px rgba(230,232,234,0.38), 0 0 30px rgba(230,232,234,0.22)",
      "--particle-a-rgb": "230 232 234",
      "--particle-b-rgb": "172 186 198",
    },
  },
};

export const themeList = Object.values(themes);

export const productThemeBySlug: Record<string, ThemeName> = {
  "n95-pro-defender": "emerald",
  "n95-stealth": "obsidian",
  "n95-crimson": "crimson",
  "n95-wall": "azure",
  "n95-ignite": "crimson",
  "n95-aurora": "ivory",
};

const routeThemeMap: Array<[prefix: string, theme: ThemeName]> = [
  ["/product/n95-pro-defender", "emerald"],
  ["/product/n95-stealth", "obsidian"],
  ["/product/n95-crimson", "crimson"],
  ["/product/n95-wall", "azure"],
  ["/product/n95-ignite", "crimson"],
  ["/product/n95-aurora", "ivory"],
  ["/checkout", "obsidian"],
  ["/lab", "azure"],
  ["/lookbook", "obsidian"],
  ["/technology", "azure"],
];

export const resolveAutoTheme = (pathname: string): ThemeName => {
  const routeMatch = routeThemeMap.find(([prefix]) => pathname.startsWith(prefix));
  if (routeMatch) return routeMatch[1];

  const pdpMatch = pathname.match(/^\/product\/([^/?#]+)/);
  if (pdpMatch?.[1]) return productThemeBySlug[pdpMatch[1]] ?? fallbackTheme;

  return fallbackTheme;
};
