# EyeHearU Design System (v2.0)

**Version:** 2.0 | **Date:** October 25, 2025
**Purpose:** Foundational style guide and principles for EyeHearU v2.0. Establishes visual identity and interaction rules for consistency. Serves as a primary reference for all AI collaborators.
**Hierarchy Note:** This document defines the **design intent**. The canonical implementation source for visual tokens (colors, spacing, etc.) is `tailwind.config.ts` and `src/index.css`. If discrepancies exist, **the code implementation is the active truth.**

---

## 1. Core Principles

### 1.1 Brand Foundations
- **Product Name:** EyeHearU
- **Purpose:** Accessible live transcription & multimodal assistance.
- **Tone:** Clear, supportive, trustworthy.

### 1.2 Design Pillars (Reference: `EYEHEARU_PROJECT_GUIDE_Version2.2.md`)
- **Pillar 2: "Kinetic Glow":** Mandatory. Motion-first, visually stunning, futuristic, premium, dynamic. Includes specific required animations.
- **Pillar 4: Privacy & Offline-First:** Mandatory. Design choices must support on-device processing where feasible.

### 1.3 Accessibility Principles
- **WCAG Target:** AA compliance minimum for all text contrast. Mandatory.
- **Motion:** Respect `prefers-reduced-motion`. Mandatory.
- **Focus States:** Clear, visible focus indicators required for all interactive elements. Mandatory.
- **ARIA:** Use appropriate ARIA labels, especially for icon-only buttons. Mandatory.

---

## 2. Visual Tokens (Reference Only - Canonical Source: Code)

### 2.1 Color Palette
* **Canonical Source:** `tailwind.config.ts` and `src/index.css` (CSS Variables).
* **Intent:** Dark theme, vibrant accents, clear states.

| Token Group | Intent / Usage | Example Tailwind Tokens | Example Hex (Verify in Code) |
|---|---|---|---|
| **Primary** | Core actions, branding | `primary-500`, `primary-600` | `#6366F1`*, `#4F46E5`* |
| **Accent** | Highlights, secondary actions | `accent-500` (Cyan) | `#06B6D4`* |
| **Background** | Base layout, gradients | `bg-dark-start`, `bg-dark-end`, `background` | `#121212`*, `#1A1A2E`*, `#0D0D0F`* |
| **Surface** | Panel/Card backgrounds | `surface-800` | `#1E1E2A`* |
| **Text** | Content readability | `text-primary`, `text-secondary` | `#F5F5F7`*, `#B4B4C2`* |
| **Border** | Dividers, contrast | `border-contrast` | `#2A2A3C`* |
| **Feedback** | Status indicators | `success-500`, `warn-500`, `danger-500` (`accent-error`) | `#10B981`*, `#F59E0B`*, `#EF4444`* |

*\*Note: Audit identified potential discrepancies between this spec and `tailwind.config.ts` (e.g., text colors, missing feedback tokens). The config file values are the active implementation.* Ensure WCAG AA contrast for text is **Mandatory**.

### 2.2 Gradient & Glow Colors (New Additions for Kinetic Glass)
* **Canonical Source:** `tailwind.config.ts` / `src/index.css`.
* **Intent:** Enhance visual depth and animation effects.

| Token Group | Intent / Usage | Example Tailwind Tokens | Example Values (Verify in Code) |
|---|---|---|---|
| **Gradient Stops** | Used in backgrounds, buttons | `gradient-aurora-start/mid/end`, `gradient-cyber-start/mid/end` | `#6366F1`, `#8B5CF6`, `#EC4899`, etc. |
| **Glow Colors** | Used in `box-shadow` for animations | `glow-primary`, `glow-accent`, `glow-intense` | `rgba(99,102,241,0.6)`, etc. |

### 2.3 Typography
* **Canonical Source:** Tailwind classes defined in `tailwind.config.ts`.
* **Intent:** Clear hierarchy, modern sans-serif.

| Role | Classes (Reference) | Notes |
|---|---|---|
| Display | `text-4xl font-semibold tracking-tight` | Limited use |
| H1 | `text-3xl font-semibold` | Page titles |
| H2 | `text-2xl font-semibold` | Section headings |
| H3 | `text-xl font-semibold` | Sub-section headings |
| Body | `text-base leading-relaxed` | Main content text |
| Small | `text-sm text-text-secondary` | Meta-text, captions |
| Mono | `font-mono text-sm` | Code snippets, data |

*Note: Audit identified inconsistencies in application (e.g., Dashboard H1). Adherence to this scale is required.*

### 2.4 Spacing
* **Canonical Source:** Tailwind's default 4px scale (`space-*`, `p-*`, `m-*`).
* **Intent:** Consistent rhythm and padding.
* **Layout:** Use standard section padding (`py-6 md:py-8`), container constraints (`max-w-7xl`).

### 2.5 Z-Index Scale (Mandatory)
* **Canonical Source:** Tailwind classes (`z-*`).
* **Intent:** Prevent stacking context issues.

| Layer | Class | Purpose |
|---|---|---|
| Base | `z-0` | Root gradient shell (AppShell) - **Must** be applied. |
| Raised | `z-10` | Standard interactive elements |
| Float | `z-20` | Floating action buttons |
| Nav | `z-30` | Persistent navigation bars |
| Modal | `z-40` | Overlays, dialogs |
| Toast | `z-50` | Notification popups |

*Note: Do not skip layers. Audit identified `z-0` missing from `AppShell`.*

---

## 3. Motion System

* **Library:** Framer Motion (Mandatory).
* **Goal:** Create "spectacular," smooth (target 120fps), physics-based, visually engaging motion. [cite: 2025-10-17]
* **Accessibility:** Respect `prefers-reduced-motion`. Mandatory.

### 3.1 Standard Durations & Easing
* **Micro:** ~150ms (Button press feedback)
* **Quick:** ~250ms (Toggles, hover transitions)
* **Standard:** ~350ms (Page transitions, panel reveals)
* **Emphasis:** ~500ms (Modal entrances)
* **Ambient:** 2s - 10s+ (Background gradients, breathing effects)
* **Easing:** Default `easeInOut` (`[0.4, 0, 0.2, 1]`), use `spring` physics where appropriate for natural feel (tune `stiffness`, `damping`, `mass`).

### 3.2 Core Required Animations (Reference: `EYEHEARU_PROJECT_GUIDE v2.2.md`)
* **`anim_breathing_indicator`:** Multi-layer pulsing glow on Start/Stop button when active. Specs: ~1.5s cycle, opacity variation, potential gradient shift.
* **`anim_text_solidification`:** Interim text animates into final text (per-word spring/fade/blur preferred).
* **`anim_3d_flip`:** High-quality 3D card flip (Y-axis) for Flip Screen. Back face must be readable. Include mid-flip light streak effect.

### 3.3 Microinteractions
* Apply subtle, spring-based `whileHover` / `whileTap` effects (scale, shadow) to all interactive elements.

---

## 4. Layout System

* **Primary:** Tailwind CSS Flexbox & Grid.
* **Containers:** Use standard max-width and padding (`max-w-7xl`, `px-4 md:px-6`).
* **Overflow:** Avoid `overflow-hidden` globally unless essential for clipping animations.

---

## 5. Component Patterns (Index)

This document defines principles, not specific component APIs.

### 5.1 Core UI Patterns
* **Glassmorphism:** Use `.glass-panel` / `.glass-panel-elevated` styles (defined in `src/index.css`) for cards, panels, modals where appropriate to create depth over the gradient background.
* **Button Hierarchy:** Apply distinct styles for Primary (solid accent), Secondary (outlined accent), Tertiary (outlined neutral), Destructive (solid error) actions.

### 5.2 Component Pattern Reference
Detailed component specifications (variants, states, props) are maintained in:
- **Component Code Comments:** See `src/components/ui/` (shadcn) and `src/components/` (custom) for inline documentation via TypeScript interfaces, PropTypes, or JSDoc.
- **Storybook** (if/when implemented): [Link TBD]
- **Figma Design File** (if applicable): [Link TBD]

*For exact component APIs, reference the code or linked resources.*

---

## 6. Accessibility Details (Mandatory)

* **Focus Ring:** `outline-none ring-2 ring-primary-500 ring-offset-2 ring-offset-bg-dark-start` must be applied to all interactive elements on focus-visible.
* **Labels:** All icon-only buttons require `aria-label`. All form inputs require associated `<label>`.
* **Contrast:** Verify text/background contrast meets WCAG AA.
* **Motion:** All animations check `useReducedMotion` or `prefers-reduced-motion` media query.
* **Semantics:** Use appropriate HTML tags (headings, landmarks, lists).

---

## 7. Internationalization (i18n)

* **Library:** `i18next` / `react-i18next`.
* **Config:** `src/i18n.ts`.
* **Files:** `public/locales/{{lng}}/translation.json`.
* **Namespace:** Default namespace is `translation`. Keys use dot notation (e.g., `dashboard.title`).
* **Rule:** No hard-coded user-facing strings in components. Add keys to `en/translation.json` first.

---

## 8. Version History & Maintenance

### 8.1 Current Version: v2.0 (2025-10-25)
**Major Changes from v1.0:**
- Clarified document hierarchy (intent vs. implementation source).
- Added explicit requirement to verify tokens against `tailwind.config.ts`.
- Expanded Motion System section with required animations and standards.
- Added Component Patterns index, linking to code/external docs for specifics.
- Integrated cross-references to `EYEHEARU_PROJECT_GUIDE_Version2.2.md`.
- Acknowledged verified discrepancies (text colors, missing tokens) found during audit.
- Added Quick Reference Card (Section 9).

### 8.2 Updating This Document
**When:** New patterns validated, palette expanded, requirements change, user feedback.
**Process:** Propose change -> Validate -> Update `.md` -> Sync code (`tailwind.config.ts`) -> Notify team -> Bump version -> Document here.

### 8.3 Conflict Resolution
If `DESIGN_SYSTEM.md` conflicts with code (`tailwind.config.ts`, components):
1. Fetch actual code.
2. Determine intent (spec outdated OR implementation wrong?).
3. Fix the source of error (update code OR update this document).
4. Document the resolution and reason in commit/changelog.

*Remember: `tailwind.config.ts` reflects the **active** visual truth.*

---

## 9. Quick Reference Card (For AI Prompts)

### **Before ANY Design Change:**
- [ ] Verify tokens exist in `tailwind.config.ts` (fetch file if uncertain; do NOT use arbitrary values).
- [ ] Check z-index requirements against defined scale (`z-0` to `z-50`).
- [ ] Confirm WCAG AA contrast ratios for new color pairings.
- [ ] Include `useReducedMotion()` check or `prefers-reduced-motion` handling for animations.
- [ ] Define responsive behavior (`sm:`, `md:`, etc.) if needed.

### **Common Pattern Snippets (Examples):**
```tsx
// Page container
<div className="min-h-screen p-4 max-w-7xl mx-auto"> ... </div>

// Glass panel
<div className="bg-surface-800/30 backdrop-blur-md border border-border-contrast/50 rounded-lg p-6"> ... </div>

// Primary button
<button className="bg-primary-500 hover:bg-primary-600 text-white font-semibold py-3 px-6 rounded-lg"> ... </button>

// Animated element (Framer Motion)
<motion.div
  initial={shouldReduceMotion ? undefined : { opacity: 0 }}
  animate={shouldReduceMotion ? undefined : { opacity: 1 }}
> ... </motion.div>
