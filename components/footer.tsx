import Link from "next/link";

const columns = [
  {
    title: "Explorar",
    links: [
      { label: "Colección", href: "/collection" },
      { label: "Lookbook", href: "/lookbook" },
      { label: "Tecnología", href: "/technology" },
      { label: "N95 Lab", href: "/lab" },
    ],
  },
  {
    title: "Boutique",
    links: [
      { label: "Sobre N95", href: "/about" },
      { label: "FAQ", href: "/faq" },
      { label: "Contacto", href: "/contact" },
      { label: "Checkout", href: "/checkout" },
    ],
  },
  {
    title: "Políticas",
    links: [
      { label: "Envíos", href: "/policies#shipping" },
      { label: "Devoluciones", href: "/policies#returns" },
      { label: "Garantía", href: "/policies#warranty" },
      { label: "Pagos", href: "/policies#payments" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-black/80">
      <div className="container grid gap-10 py-14 md:grid-cols-[1.2fr_1fr_1fr_1fr]">
        <div className="space-y-4">
          <p className="text-xs uppercase tracking-[0.28em] text-white/60">N95 Gloves</p>
          <h2 className="section-title text-3xl font-semibold">Lujo técnico para arqueros.</h2>
          <p className="text-sm text-white/60">
            Boutique de guantes con producción limitada, control editorial y soporte real.
          </p>
          <div className="text-xs uppercase tracking-[0.24em] text-white/50">
            Montevideo · Uruguay
          </div>
        </div>

        {columns.map((column) => (
          <div key={column.title} className="space-y-3">
            <p className="text-xs uppercase tracking-[0.24em] text-white/50">{column.title}</p>
            <ul className="space-y-2 text-sm text-white/70">
              {column.links.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="hover:text-cyber-gray">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-white/10 py-6">
        <div className="container flex flex-wrap items-center justify-between gap-3 text-xs text-white/50">
          <span>© 2026 N95 Gloves. Boutique goalkeeping lab.</span>
          <span>Diseñado para conversión premium.</span>
        </div>
      </div>
    </footer>
  );
}
