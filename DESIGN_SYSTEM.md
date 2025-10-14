# EyeHearU Design System: The "Kinetic Glow"

This document is the single source of truth for all UI components, styling, and motion design decisions. Update it iteratively as the project evolves.

## 1. Z-Index Scale
To prevent visual occlusion bugs, all z-index properties MUST use a value from this scale:
- `z-0`: Base UI elements (text, static content)
- `z-10`: Interactive elements (buttons, inputs)
- `z-20`: Floating Action Buttons (FABs)
- `z-30`: Bottom navigation / Tab bars
- `z-40`: Modals / Overlays
- `z-50`: System-level alerts / Toasts

## 2. Color Palette (Initial - Expand as Needed)
Use CSS variables for theming:
- `--bg-primary`: #ffffff (light) / #121212 (dark)
- `--glow-primary`: #00ff88 (neon green for accents)
- `--text-primary`: #000000 (ensure WCAG AA contrast)

## 3. Motion Guidelines
- All animations via Framer Motion.
- Respect `prefers-reduced-motion` media query.
- Default transition: { duration: 0.3, ease: 'easeOut' }
