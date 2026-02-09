# PLANS.md — N95 Gloves (Luxury Boutique System)

## Resumen
Este documento define el estandar de calidad, direccion visual y arquitectura tecnica para transformar N95 Gloves en un e-commerce boutique de alto rendimiento. Es el manual de estilo y el roadmap para futuras iteraciones.

---

## 1) Vision de marca y tono
- Boutique oscura, minimalista, tecnica y editorial.
- Narrativa premium: precision, control, elite, confianza.
- Copy clave: "agarre de elite", "ingenieria de precision", "confort superior".

---

## 2) Tipografia
- **Titulos (sport-tech):** Teko (condensada, atletica, premium).
- **UI tecnica / especificaciones (sans):** Space Grotesk.
- **Cuerpo:** Space Grotesk (unificado).

---

## 3) Sistema visual
- Paleta: negro profundo, gris hueso, cyber-lime como acento, blancos suaves para contraste.
- Layout: grids editoriales, mucho espacio negativo, bloques boutique con jerarquia clara.
- Imagenes: lookbook editorial + producto con texturas y macrodetalles.

---

## 4) Motion system (Framer Motion)
- **Page transitions:** AnimatePresence + usePathname (transiciones suaves, sin parpadeos).
- **Parallax:** hero + lookbook via useScroll/useTransform.
- **Micro-interacciones:** botones con magnetismo o rebote suave, focus states elegantes.
- **Reduce motion:** degradacion accesible via prefers-reduced-motion.

---

## 5) Interaccion & UX
- Navbar transparente al inicio -> glassmorphism al scroll.
- CTAs con feedback fisico (glow organico + motion sutil).
- PDP con "Anatomia del N95": tooltips animados por zona (palma/dorso/munequera).

---

## 6) Arquitectura tecnica
- **Stack actual:** Next.js 16 (App Router) + Tailwind + Framer Motion + Radix UI.
- **Organizacion sugerida:**
  - `components/motion/*` (reveal, page transitions, magnetism)
  - `components/hero/*`
  - `components/pdp/*`
  - `app/lab/*` (configurador)
- **Assets:**
  - `public/lookbook/*`
  - `public/products/*`

---

## 7) Performance & accesibilidad
- Presupuesto: LCP < 2.5s en home.
- `next/image` con tamaños correctos; `priority` solo en hero.
- Contraste AA, focus states visibles, reduce motion.

---

## 8) Milestones (Roadmap)
- **M1:** Hero inmersiva + page transitions + navbar glass.
- **M2:** PDP boutique + anatomia interactiva + CTA con loading.
- **M3:** N95 Lab (configurador) + canvas overlay texto.
- **M4:** Asistente de talla (wizard + storage).
- **M5:** Carrito persistente + animaciones no bloqueantes.
- **M6:** Hardening (performance, accesibilidad, QA).

---

## Fase 2 — Hero inmersiva + Navbar glass
- Fondo Canvas 2D con particulas flotantes (campo de energia), sin lluvia.
- Titulo "N95 Gloves" con stagger letter-by-letter.
- Transicion de pagina suave (AnimatePresence).

## Fase 3 — PDP boutique
- Layout split: izquierda sticky con guante flotante; derecha scrollea.
- "Anatomia del N95" con tooltips animados.
- CTA compra con animacion de carga.

## Fase 4 — N95 Lab (/lab)
- Configurador por pasos (Rollfinger/Negativo/Hibrido).
- Imagen cambia con transicion suave.
- Canvas overlay para texto personalizado.

## Fase 5 — Asistente de talla
- Wizard interactivo (medida + preferencia).
- Recomendacion con medidor animado.
- Persistencia en localStorage.

## Fase 6 — Carrito (refactor y performance)
- Persistencia garantizada.
- Animaciones de add-to-cart no bloqueantes.
- Feedback inmediato.

---

## Cambios en APIs/tipos publicos
- Nuevo tipo `GloveConfig` (corte, texto, imagen seleccionada).
- Nuevo tipo `SizeRecommendation` (talla, ajuste, timestamp).
- Nuevo route: `/lab`.
- Nuevo estado persistente: `n95-size-reco`.

---

## Tests y validacion
- LCP < 2.5s en home con hero canvas.
- Navegacion fluida con transiciones sin jank.
- Tooltips y sticky PDP funcionan en desktop y mobile.
- Wizard de talla guarda y recupera recomendaciones.
- Carrito persiste y no bloquea navegacion.

---

## Supuestos
- Idioma principal: espanol.
- Canvas 2D para hero (no Three.js).
- N95 Lab como pagina dedicada `/lab`.
- Assets locales en `public/lookbook` y `public/products`.
