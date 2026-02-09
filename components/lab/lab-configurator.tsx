"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { labCuts, GloveConfig, GloveCut } from "@/lib/lab";
import LabPreview from "@/components/lab/lab-preview";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

const steps = [
  { id: 0, title: "Selecciona el corte" },
  { id: 1, title: "Personaliza la muñequera" },
  { id: 2, title: "Resumen" },
];

const presets = [
  { id: "atelier", name: "Atelier Lime", cut: "hibrido", text: "N95" },
  { id: "noir", name: "Noir Stealth", cut: "negativo", text: "DEF" },
  { id: "prime", name: "Prime Grip", cut: "rollfinger", text: "ELITE" },
];

const STORAGE_KEY = "n95-lab-config";
const readStoredConfig = () => {
  if (typeof window === "undefined") return null;
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) return null;
  try {
    return JSON.parse(stored) as GloveConfig;
  } catch {
    return null;
  }
};

export default function LabConfigurator() {
  const [step, setStep] = useState(0);
  const [config, setConfig] = useState<GloveConfig>(() => readStoredConfig() ?? { cut: "hibrido", text: "" });
  const [savedAt, setSavedAt] = useState<number | null>(null);
  const saveTimeoutRef = useRef<number | null>(null);

  const active = useMemo(
    () => labCuts.find((item) => item.id === config.cut) ?? labCuts[0],
    [config.cut]
  );

  const progress = ((step + 1) / steps.length) * 100;

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
    }
  }, [config]);

  useEffect(() => {
    return () => {
      if (saveTimeoutRef.current) {
        window.clearTimeout(saveTimeoutRef.current);
      }
    };
  }, []);

  const handleSave = () => {
    setSavedAt(Date.now());
    if (saveTimeoutRef.current) window.clearTimeout(saveTimeoutRef.current);
    saveTimeoutRef.current = window.setTimeout(() => setSavedAt(null), 1600);
  };

  return (
    <div className="mt-10 grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
      <div className="space-y-6">
        <div className="space-y-2">
          <p className="text-xs uppercase tracking-[0.28em] text-white/60">N95 Lab</p>
          <h2 className="section-title text-3xl font-semibold">Configurador boutique</h2>
          <p className="text-sm text-white/65">
            Elegí el corte, ajusta la personalización y visualiza el resultado en tiempo real.
          </p>
        </div>

        <div className="rounded-[12px] border border-white/10 bg-black/40 p-4">
          <div className="text-xs uppercase tracking-[0.24em] text-white/50">Timeline</div>
          <div className="mt-4 space-y-3">
            {steps.map((item, idx) => {
              const activeStep = step === idx;
              const doneStep = step > idx;
              return (
                <div key={item.id} className="flex items-center gap-3">
                  <div
                    className={`flex h-9 w-9 items-center justify-center rounded-full border text-xs font-semibold ${
                      activeStep || doneStep
                        ? "border-[color:rgb(var(--accent-rgb)/0.7)] bg-[color:rgb(var(--accent-rgb)/0.15)] text-[var(--accent)]"
                        : "border-white/10 bg-white/5 text-white/60"
                    }`}
                  >
                    {String(idx + 1).padStart(2, "0")}
                  </div>
                  <div>
                    <p className={`text-sm ${activeStep ? "text-white" : "text-white/70"}`}>{item.title}</p>
                    <p className="text-xs text-white/50">
                      {activeStep ? "En curso" : doneStep ? "Completado" : "Siguiente"}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="space-y-3 rounded-[12px] border border-white/10 bg-white/5 p-4">
          <div className="flex items-center justify-between text-xs uppercase tracking-[0.24em] text-white/50">
            <span>Paso {step + 1} de {steps.length}</span>
            <span>{steps[step].title}</span>
          </div>
          <Progress value={progress} />
        </div>

        <div className="rounded-[12px] border border-white/10 bg-white/5 p-4">
          <div className="flex items-center justify-between text-xs uppercase tracking-[0.24em] text-white/50">
            <span>Presets rápidos</span>
            <span>Listos</span>
          </div>
          <div className="mt-3 flex flex-wrap gap-2">
            {presets.map((preset) => (
              <Button
                key={preset.id}
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setConfig({ cut: preset.cut as GloveCut, text: preset.text })}
              >
                {preset.name}
              </Button>
            ))}
          </div>
        </div>

        <div className="rounded-[14px] border border-white/10 bg-black/40 p-6">
          <AnimatePresence mode="wait">
            {step === 0 && (
              <motion.div
                key="step-cuts"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 12 }}
                transition={{ duration: 0.3 }}
                className="space-y-4"
              >
                <p className="text-sm text-white/70">
                  Selecciona el corte ideal para tu estilo.
                </p>
                <div className="grid gap-3 md:grid-cols-3">
                  {labCuts.map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setConfig((prev) => ({ ...prev, cut: item.id }))}
                      className={cn(
                        "rounded-[12px] border p-4 text-left transition",
                        config.cut === item.id
                          ? "border-[var(--accent)] bg-[color:rgb(var(--accent-rgb)/0.1)] text-[var(--accent)]"
                          : "border-white/10 bg-white/5 text-white/70 hover:border-[color:rgb(var(--accent-rgb)/0.4)]"
                      )}
                    >
                      <div className="text-sm font-semibold">{item.name}</div>
                      <div className="mt-2 text-xs text-white/60">{item.description}</div>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {step === 1 && (
              <motion.div
                key="step-text"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 12 }}
                transition={{ duration: 0.3 }}
                className="space-y-4"
              >
                <p className="text-sm text-white/70">
                  Agrega tu nombre o número. Máximo 12 caracteres.
                </p>
                <Input
                  placeholder="Tu nombre o número"
                  aria-label="Texto de personalización"
                  value={config.text}
                  maxLength={12}
                  onChange={(event) =>
                    setConfig((prev) => ({ ...prev, text: event.target.value }))
                  }
                />
                <div className="text-xs uppercase tracking-[0.24em] text-white/50">
                  Vista previa en tiempo real
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="step-summary"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 12 }}
                transition={{ duration: 0.3 }}
                className="space-y-4"
              >
                  <div className="space-y-2 text-sm text-white/70">
                    <div className="flex items-center justify-between">
                      <span>Corte</span>
                      <span className="text-[var(--accent)]">{active.name}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Personalización</span>
                      <span className="text-[var(--accent)]">
                        {config.text ? config.text.toUpperCase() : "Sin texto"}
                      </span>
                    </div>
                </div>
                <div className="flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.24em] text-white/50">
                  <span className="rounded border border-white/10 px-3 py-1">Serie limitada</span>
                  <span className="rounded border border-white/10 px-3 py-1">Látex 4mm</span>
                  <span className="rounded border border-white/10 px-3 py-1">Soporte boutique</span>
                </div>
                <div className="space-y-2">
                  <Button type="button" className="w-full" onClick={handleSave}>
                    Guardar configuración
                  </Button>
                  <AnimatePresence>
                    {savedAt && (
                      <motion.div
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 6 }}
                        transition={{ duration: 0.2 }}
                        className="text-center text-xs text-white/60"
                        role="status"
                        aria-live="polite"
                      >
                        Configuración guardada.
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="flex items-center justify-between">
          <Button
            variant="ghost"
            type="button"
            onClick={() => setStep((prev) => Math.max(0, prev - 1))}
            disabled={step === 0}
          >
            Volver
          </Button>
          <Button
            type="button"
            onClick={() => setStep((prev) => Math.min(steps.length - 1, prev + 1))}
            disabled={step === steps.length - 1}
          >
            Continuar
          </Button>
        </div>
      </div>

      <div className="space-y-4">
        <div className="text-xs uppercase tracking-[0.24em] text-white/50">Preview en vivo</div>
        <LabPreview cut={config.cut as GloveCut} text={config.text} />
        <div className="rounded-[12px] border border-white/10 bg-white/5 p-4 text-sm text-white/65">
          {active.description}
        </div>
      </div>
    </div>
  );
}
