"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { usePathname } from "next/navigation";
import {
  fallbackTheme,
  resolveAutoTheme,
  themeList,
  themes,
  type ThemeMode,
  type ThemeName,
} from "@/lib/themes";

const THEME_MODE_KEY = "n95-theme-mode";
const THEME_SELECTED_KEY = "n95-theme-selected";

type ThemeContextValue = {
  mode: ThemeMode;
  selectedTheme: ThemeName;
  resolvedTheme: ThemeName;
  setMode: (mode: ThemeMode) => void;
  setSelectedTheme: (theme: ThemeName) => void;
  availableThemes: typeof themeList;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

const isThemeName = (value: string): value is ThemeName => value in themes;
const isThemeMode = (value: string): value is ThemeMode => value === "auto" || value === "manual";

export function ThemeProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [mode, setMode] = useState<ThemeMode>(() => {
    if (typeof window === "undefined") return "auto";
    const storedMode = window.localStorage.getItem(THEME_MODE_KEY);
    return storedMode && isThemeMode(storedMode) ? storedMode : "auto";
  });
  const [selectedTheme, setSelectedTheme] = useState<ThemeName>(() => {
    if (typeof window === "undefined") return fallbackTheme;
    const storedTheme = window.localStorage.getItem(THEME_SELECTED_KEY);
    return storedTheme && isThemeName(storedTheme) ? storedTheme : fallbackTheme;
  });

  const autoTheme = useMemo(
    () => resolveAutoTheme(pathname || "/"),
    [pathname]
  );
  const resolvedTheme = mode === "manual" ? selectedTheme : autoTheme;

  useEffect(() => {
    if (typeof window === "undefined") return;
    window.localStorage.setItem(THEME_MODE_KEY, mode);
  }, [mode]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    window.localStorage.setItem(THEME_SELECTED_KEY, selectedTheme);
  }, [selectedTheme]);

  useEffect(() => {
    const root = document.documentElement;
    const palette = themes[resolvedTheme];
    root.dataset.theme = resolvedTheme;
    root.dataset.themeMode = mode;

    Object.entries(palette.cssVars).forEach(([key, value]) => {
      root.style.setProperty(key, value);
    });
  }, [mode, resolvedTheme]);

  const value = useMemo<ThemeContextValue>(
    () => ({
      mode,
      selectedTheme,
      resolvedTheme,
      setMode,
      setSelectedTheme,
      availableThemes: themeList,
    }),
    [mode, selectedTheme, resolvedTheme]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("useTheme must be used within ThemeProvider");
  return context;
}
