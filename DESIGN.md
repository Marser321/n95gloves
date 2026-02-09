# Design System: N95 Gloves Redesign
**Project ID:** Local Next.js Redesign (No Stitch MCP in current session)

## 1. Visual Theme & Atmosphere
- Dirección: boutique deportiva, técnica y editorial.
- Sensación: alta precisión, contraste fuerte, ritmo visual limpio.
- Objetivo: menos neón dominante, más control de jerarquía para conversión.

## 2. Color Palette & Roles
El sistema usa temas semánticos resueltos por tokens CSS:

- **Emerald** (`#2BFF4F`) para rendimiento/flagship.
- **Crimson** (`#FF4D57`) para agresividad y reacción.
- **Azure** (`#56B7FF`) para claridad técnica y durabilidad.
- **Ivory** (`#F4F7FF`) para contraste limpio y foco en detalle.
- **Obsidian** (`#E6E8EA`) para una lectura sobria en modo editorial.

Roles funcionales por token:
- `--bg`, `--bg-alt`: fondos estructurales.
- `--surface`, `--surface-alt`: contenedores y cards.
- `--text-primary`, `--text-muted`: tipografía principal/secundaria.
- `--accent`, `--accent-rgb`, `--accent-soft`: CTA, resaltes y estados activos.
- `--ring`, `--glow`: foco accesible y halo de interacción.
- `--particle-a-rgb`, `--particle-b-rgb`: motion/partículas por tema.

## 3. Typography Rules
- Display: `var(--font-display)` con estética atlética-condensada.
- Body/UI: `var(--font-sans)` para legibilidad y consistencia técnica.
- Tracking alto en microcopy para reforzar tono de performance.

## 4. Component Stylings
- **Buttons:** base en `--accent`, texto negro, shadow contextual `--glow`.
- **Cards/Containers:** superficies oscuras translúcidas, borde fino semántico (`--border`).
- **Inputs/Forms:** foco claro con `--ring`, contraste alto en estado activo.
- **Badges/Indicators:** acento semántico, nunca color fijo global.

## 5. Layout Principles
- Grillas editoriales con bloque protagonista + soporte técnico.
- Mayor espacio respirable entre secciones densas de contenido.
- Motion intencional: guía de atención, no decoración excesiva.

## 6. Product Page Content Rules
Cada PDP debe incluir:
- Posicionamiento claro del modelo.
- Perfil ideal (arquero, estilo, superficie, clima).
- Beneficios clave en lenguaje comercial.
- Highlights técnicos accionables.
- Cuidado, incluye y FAQ por modelo.

## 7. Theme Resolution Rules
Modo híbrido implementado:
1. Si usuario selecciona manual, persiste (`n95-theme-selected`).
2. Si está en auto, se resuelve por ruta/producto (`n95-theme-mode=auto`).
3. Fallback global: `emerald`.

## 8. Accessibility & Motion Constraints
- Focus visible en todos los temas (`--ring`).
- Contraste mínimo AA para texto funcional.
- Respeto de `prefers-reduced-motion` en animaciones principales.
