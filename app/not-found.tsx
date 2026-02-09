import Link from "next/link";
import PageHero from "@/components/page-hero";

export default function NotFound() {
  return (
    <>
      <PageHero
        eyebrow="404"
        title="No encontramos esa página."
        description="Puede que el modelo aún no esté disponible o el enlace haya cambiado. Vuelve al catálogo o contáctanos."
        primaryCta={{ label: "Ir a la colección", href: "/collection" }}
        secondaryCta={{ label: "Volver al inicio", href: "/" }}
        badges={["Soporte boutique", "Navegación segura"]}
      />
      <div className="container pb-16">
        <p className="text-sm text-white/60">
          Si creés que es un error,{" "}
          <Link href="/contact" className="text-white underline-offset-4 hover:underline">
            contáctanos
          </Link>{" "}
          y lo resolvemos.
        </p>
      </div>
    </>
  );
}
