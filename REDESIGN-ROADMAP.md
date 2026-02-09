# Redesign Roadmap — N95 Gloves

## Estado actual
- Base técnica: Next.js App Router + Tailwind + Framer Motion.
- Implementado en esta iteración:
  - Sistema de temas híbrido (auto/manual) con persistencia.
  - Tokens semánticos globales y limpieza de acentos fijos.
  - Refactor principal de Home/PDP para narrativa comercial.
  - Expansión de `products.ts` con perfiles completos por modelo.
  - Estructura estable de placeholders visuales por slug.

## Fase 0 — Hardening
- [x] Agregar documentación de sistema visual (`DESIGN.md`).
- [x] Agregar roadmap operativo (`REDESIGN-ROADMAP.md`).
- [ ] Validar build en entorno CI/Vercel sin bloqueos de red.
- [ ] Agregar script explícito de `typecheck` y control por fase.

## Fase 1 — Theme System
- [x] Crear `lib/themes.ts` con 5 paletas.
- [x] Crear `providers/theme-provider.tsx`.
- [x] Conectar provider en layout.
- [x] Selector Auto/Manual en navbar desktop y mobile.
- [x] Persistencia en `localStorage`:
  - `n95-theme-mode`
  - `n95-theme-selected`

## Fase 2 — Home Conversion
- [x] Hero y glows conectados a tema activo.
- [x] Scrolly section ajustada a acento semántico.
- [x] CTA final adaptado a token `--accent`.
- [ ] Continuar refinamiento de jerarquía visual por capturas reales de Vercel.

## Fase 3 — PDP Premium
- [x] PDP modular comercial con secciones por modelo.
- [x] Navegación entre variantes con `Link` (sin `window.location.assign`).
- [x] Reemplazo de placeholders débiles por bloques de valor real.
- [x] Integración de FAQ/beneficios/highlights por producto.
- [ ] Ajuste fino de densidad visual mobile tras pruebas de usuario.

## Fase 4 — Coherencia Global
- [x] Checkout adaptado al tema activo (botón MP dinámico).
- [x] Links/accentos clave migrados a tokens.
- [ ] Revisión final página por página para eliminar cualquier acento fijo remanente.

## Fase 5 — Placeholders IA
- [x] Estructura de slots estable:
  - `public/products/generated/<slug>/hero.jpg`
  - `public/products/generated/<slug>/detail-01.jpg`
  - `public/products/generated/<slug>/detail-02.jpg`
- [x] Carga inicial con placeholders locales para 6 modelos.
- [ ] Generación IA final (18 assets) cuando esté disponible `OPENAI_API_KEY`.

## Fase 6 — QA + Deploy
- [ ] `npm run lint`
- [ ] `npm run typecheck`
- [ ] `npm run build`
- [ ] QA responsive manual (home, PDP, checkout, lab)
- [ ] Smoke test en preview Vercel

## Flujo operativo acordado
1. Usuario envía lote de capturas/notas por sección.
2. Se agrupan cambios en un único changelist por fase.
3. Se entrega resumen por archivo + checklist de validación.
4. Se repite por lotes para minimizar prompts.
