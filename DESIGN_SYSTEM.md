# EyeHearU Design System (Phase 1 Baseline)

## 1. Brand Foundations
- Product Name: EyeHearU
- Purpose: Accessible live transcription & multimodal assistance.
- Tone: Clear, supportive, trustworthy.

## 2. Color Palette (Tailwind Tokens)
| Token | Hex | Usage |
|-------|-----|-------|
| primary-500 | #6366F1 | Primary actions |
| primary-600 | #4F46E5 | Hover / active |
| accent-500 | #06B6D4 | Highlights |
| bg-dark-start | #121212 | Gradient start (AppShell) |
| bg-dark-end | #1A1A2E | Gradient end |
| surface-800 | #1E1E2A | Panels |
| success-500 | #10B981 | Success |
| warn-500 | #F59E0B | Warnings |
| danger-500 | #EF4444 | Errors |
| text-primary | #F5F5F7 | Main text |
| text-secondary | #B4B4C2 | Secondary text |
| border-contrast | #2A2A3C | Dividers |

WCAG AA required for all body text.

## 3. Z-Index Scale
| Layer | Class | Purpose |
|-------|-------|---------|
| Base | z-0 | Root gradient shell (AppShell) |
| Raised | z-10 | Standard interactive |
| Float | z-20 | Floating buttons |
| Nav | z-30 | Persistent bars |
| Modal | z-40 | Overlays / dialogs |
| Toast | z-50 | Alerts / toasts |

Do not skip layers arbitrarily. Always explicitly set `z-0` for root to avoid accidental stacking context issues.

## 4. Typography
| Role | Classes |
|------|---------|
| Display | text-4xl font-semibold tracking-tight |
| H1 | text-3xl font-semibold |
| H2 | text-2xl font-semibold |
| H3 | text-xl font-semibold |
| Body | text-base leading-relaxed |
| Small | text-sm text-text-secondary |
| Mono | font-mono text-sm |

## 5. Spacing & Layout
- Base spacing unit: 4px (Tailwind scale)
- Section vertical rhythm: `py-6 md:py-8`
- Container: `max-w-7xl mx-auto px-4 md:px-6`
- Avoid `overflow-hidden` on layout-level containers unless functionally necessary (e.g. clipping an animation region).

## 6. Motion
Default page fade-in:
```ts
{ opacity: 0 } -> { opacity: 1 } duration 0.35s ease: [0.4,0,0.2,1]
```

Optional slide-in: y: 8 -> 0
Respect `prefers-reduced-motion`: disable transforms, keep a minimal opacity transition.

## 7. Components (Phase 1)

- Button (primary/secondary/ghost/danger)
- Card
- Input + Label + Helper/Error
- Navbar / Shell (AppShell)
- Loading Spinner

All must include accessible labels & focus states.

## 8. Accessibility

- Focus ring: `outline-none ring-2 ring-primary-500 ring-offset-2 ring-offset-bg-dark-start`
- Icon-only buttons: `aria-label` required
- No color used as sole meaning signal
- Ensure motion reductions applied

## 9. Internationalization

Base namespace: `translation`
Example root:

```json
{
  "app": {
    "title": "EyeHearU"
  }
}
```

Add new keys before UI usage. No hard-coded user-facing strings.
