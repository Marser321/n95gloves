"use client";

import { cn } from "@/lib/utils";
import { useTheme } from "@/providers/theme-provider";

type ThemeSwitcherProps = {
  className?: string;
  compact?: boolean;
};

export default function ThemeSwitcher({ className, compact = false }: ThemeSwitcherProps) {
  const { mode, selectedTheme, resolvedTheme, setMode, setSelectedTheme, availableThemes } =
    useTheme();

  return (
    <div className={cn("space-y-3", className)}>
      <div className="inline-flex items-center rounded-[8px] border border-white/10 bg-white/5 p-1">
        <button
          type="button"
          onClick={() => setMode("auto")}
          className={cn(
            "rounded-[6px] px-3 py-1.5 text-[11px] uppercase tracking-[0.2em] transition",
            mode === "auto"
              ? "bg-[var(--accent-soft)] text-[var(--accent)]"
              : "text-white/60 hover:text-white/85"
          )}
        >
          Auto
        </button>
        <button
          type="button"
          onClick={() => setMode("manual")}
          className={cn(
            "rounded-[6px] px-3 py-1.5 text-[11px] uppercase tracking-[0.2em] transition",
            mode === "manual"
              ? "bg-[var(--accent-soft)] text-[var(--accent)]"
              : "text-white/60 hover:text-white/85"
          )}
        >
          Manual
        </button>
      </div>

      <div className={cn("flex flex-wrap gap-2", compact && "gap-1.5")}>
        {availableThemes.map((theme) => {
          const active = mode === "manual" ? selectedTheme === theme.name : resolvedTheme === theme.name;
          return (
            <button
              key={theme.name}
              type="button"
              onClick={() => {
                setSelectedTheme(theme.name);
                setMode("manual");
              }}
              className={cn(
                "inline-flex items-center gap-2 rounded-[8px] border px-2.5 py-1.5 text-[10px] uppercase tracking-[0.18em] transition",
                active
                  ? "border-[var(--accent)] bg-[var(--accent-soft)] text-[var(--text-primary)]"
                  : "border-white/10 bg-black/30 text-white/65 hover:border-white/30"
              )}
              aria-label={`Usar tema ${theme.label}`}
              title={theme.description}
            >
              <span
                className="h-2.5 w-2.5 rounded-full border border-white/15"
                style={{ backgroundColor: theme.cssVars["--accent"] }}
              />
              {!compact && <span>{theme.label}</span>}
            </button>
          );
        })}
      </div>
    </div>
  );
}
