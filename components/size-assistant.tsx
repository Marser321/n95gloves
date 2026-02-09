"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";

type FitPreference = "ajustado" | "holgado";

type SizeRecommendation = {
  size: string;
  fit: FitPreference;
  lengthCm: number;
  timestamp: number;
};

const STORAGE_KEY = "n95-size-reco";

function getSize(lengthCm: number, fit: FitPreference) {
  if (lengthCm < 17) return "7";
  if (lengthCm < 18.2) return fit === "holgado" ? "8" : "7.5";
  if (lengthCm < 19.3) return fit === "holgado" ? "9" : "8.5";
  if (lengthCm < 20.5) return fit === "holgado" ? "10" : "9.5";
  if (lengthCm < 21.7) return fit === "holgado" ? "11" : "10.5";
  return fit === "holgado" ? "12" : "11.5";
}

export default function SizeAssistant() {
  const [step, setStep] = useState(0);
  const [lengthCm, setLengthCm] = useState("");
  const [fit, setFit] = useState<FitPreference>("ajustado");
  const [saved, setSaved] = useState<SizeRecommendation | null>(() => {
    if (typeof window === "undefined") return null;
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return null;
    try {
      return JSON.parse(stored) as SizeRecommendation;
    } catch {
      return null;
    }
  });

  const lengthValue = Number.parseFloat(lengthCm);
  const isLengthValid = Number.isFinite(lengthValue) && lengthValue > 14 && lengthValue < 25;
  const recommendation = useMemo(() => {
    if (!isLengthValid) return null;
    return getSize(lengthValue, fit);
  }, [isLengthValid, lengthValue, fit]);

  const progress = ((step + 1) / 3) * 100;

  const handleSave = () => {
    if (!recommendation || !isLengthValid) return;
    const payload: SizeRecommendation = {
      size: recommendation,
      fit,
      lengthCm: lengthValue,
      timestamp: Date.now(),
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
    setSaved(payload);
  };

  return (
    <div className="space-y-5">
      <div className="space-y-2">
        <p className="text-xs uppercase tracking-[0.28em] text-white/60">Encuentra tu talla perfecta</p>
        <h3 className="section-title text-2xl font-semibold">Wizard interactivo</h3>
        <p className="text-sm text-white/65">
          Sin tablas. Solo tu medida real y el fit que preferís.
        </p>
      </div>

      <div className="rounded-[12px] border border-white/10 bg-white/5 p-4">
        <div className="flex items-center justify-between text-xs uppercase tracking-[0.24em] text-white/50">
          <span>Paso {step + 1} de 3</span>
          <span>{step === 0 ? "Medida" : step === 1 ? "Fit" : "Resultado"}</span>
        </div>
        <div className="mt-3">
          <Progress value={progress} />
        </div>
      </div>

      {step === 0 && (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="space-y-4"
        >
          <p className="text-sm text-white/70">
            ¿Cuánto mide tu mano desde la muñequera hasta el dedo medio? (cm)
          </p>
          <Input
            type="number"
            aria-label="Medida de la mano en centímetros"
            value={lengthCm}
            placeholder="Ej: 19.5"
            onChange={(event) => setLengthCm(event.target.value)}
          />
          <p className="text-xs text-white/50">Rango recomendado: 15 - 24 cm.</p>
        </motion.div>
      )}

      {step === 1 && (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="space-y-4"
        >
          <p className="text-sm text-white/70">¿Preferís un ajuste ceñido o más holgado?</p>
          <div className="flex flex-wrap gap-3">
            {(["ajustado", "holgado"] as FitPreference[]).map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => setFit(option)}
                className={`rounded-[10px] border px-4 py-2 text-sm transition ${
                  fit === option
                    ? "border-cyber-lime bg-cyber-lime/10 text-cyber-lime"
                    : "border-white/10 bg-white/5 text-white/70 hover:border-cyber-lime/40"
                }`}
              >
                {option === "ajustado" ? "Ceñido" : "Holgado"}
              </button>
            ))}
          </div>
        </motion.div>
      )}

      {step === 2 && (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="space-y-4"
        >
          <div className="rounded-[12px] border border-white/10 bg-black/40 p-4 text-sm text-white/70">
            {recommendation ? (
              <div className="space-y-3" role="status" aria-live="polite">
                <p className="text-xs uppercase tracking-[0.24em] text-white/50">
                  Recomendación
                </p>
                <div className="flex items-end justify-between">
                  <span className="text-3xl font-semibold text-cyber-lime">Talla {recommendation}</span>
                  <span className="text-xs text-white/50">{fit === "ajustado" ? "Cenido" : "Holgado"}</span>
                </div>
                <div className="space-y-2">
                  <div className="text-xs uppercase tracking-[0.24em] text-white/50">Medidor</div>
                  <Progress value={Math.min(100, Math.max(12, (lengthValue / 24) * 100))} />
                </div>
              </div>
            ) : (
              <p>Ingresa una medida válida para ver la recomendación.</p>
            )}
          </div>
          <Button type="button" onClick={handleSave} disabled={!recommendation}>
            Guardar talla recomendada
          </Button>
          {saved && (
            <p className="text-xs text-white/50">
              Última talla guardada: {saved.size} ({saved.fit}) · {saved.lengthCm} cm
            </p>
          )}
        </motion.div>
      )}

      <div className="flex items-center justify-between">
        <Button type="button" variant="ghost" onClick={() => setStep((prev) => Math.max(0, prev - 1))} disabled={step === 0}>
          Volver
        </Button>
        <Button type="button" onClick={() => setStep((prev) => Math.min(2, prev + 1))} disabled={step === 2}>
          Continuar
        </Button>
      </div>
    </div>
  );
}
