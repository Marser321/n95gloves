import LabConfigurator from "@/components/lab/lab-configurator";

export default function LabPage() {
  return (
    <section className="container py-16">
      <div className="grid gap-6 md:grid-cols-[1.1fr_0.9fr] md:items-end">
        <div className="space-y-3">
          <p className="text-xs uppercase tracking-[0.28em] text-white/60">N95 Lab</p>
          <h1 className="section-title text-4xl font-semibold leading-tight">
            Personalización de élite, en tiempo real.
          </h1>
          <p className="max-w-2xl text-sm text-white/70">
            Configura el corte, personaliza la muñequera y previsualiza tu guante como si fuera un
            configurador de autos boutique.
          </p>
        </div>
        <div className="rounded-[10px] border border-white/10 bg-white/5 p-4 text-sm text-white/70">
          Producción por encargo: cada configuración se valida antes de fabricar.
        </div>
      </div>

      <LabConfigurator />
    </section>
  );
}
