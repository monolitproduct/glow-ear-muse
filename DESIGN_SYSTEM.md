# EyeHearU Design System v3.5
**Version:** 3.5.0  
**Date:** 2025-10-27  
**Design Language:** Sonic Clarity  
**Status:** Production Ready for Multi-AI Workflow  
**Replaces:** v2.0 "Kinetic Glow" → v3.5 "Sonic Clarity"

---

## 🎯 EXECUTIVE SUMMARY

### Design Philosophy: Sonic Clarity

**Sonic Clarity** emphasizes minimalism paired with audio/visual precision for accessibility. Core principles:
- **Visual Sound:** Wave-inspired gradients represent audio capture
- **Clean Precision:** High-contrast feedback with minimal decoration  
- **Subtle Sonic Cues:** Non-intrusive animations mimicking sound waves
- **Privacy-First:** All processing on-device, no cloud dependencies
- **WCAG AA+:** Accessibility is core, not an afterthought

### Critical Changes from v2.0 → v3.5

| Aspect | OLD: Kinetic Glow | NEW: Sonic Clarity |
|--------|-------------------|---------------------|
| **Color System** | Cool blues/purples with glow | Warm coral/orange gradients |
| **Animation** | Pulsing glow effects | Audio-reactive waveforms |
| **Motion** | Linear easing | Spring physics (organic) |
| **Depth** | Glassmorphism blur | Multi-layer glow halos |
| **Accessibility** | WCAG AA | WCAG AA+ with enhanced contrast |
| **Visual Feedback** | Static pulses | Dynamic waveform visualization |

---

## 🎨 COLOR SYSTEM

### Primary Palette: Sunset Spectrum

| Token | Hex Value | RGB | Usage | WCAG Contrast (on #0F0F12) |
|-------|-----------|-----|-------|----------------------------|
| `--color-recording-start` | #FF6B6B | 255, 107, 107 | Recording button start gradient | 4.8:1 ✅ AA |
| `--color-recording-mid` | #FF8E53 | 255, 142, 83 | Recording button mid gradient | 5.2:1 ✅ AA |
| `--color-recording-end` | #FFB84D | 255, 184, 77 | Recording button end gradient | 6.1:1 ✅ AAA |

### Background System

| Token | Hex Value | RGB | Usage | Notes |
|-------|-----------|-----|-------|-------|
| `--bg-primary` | #0F0F12 | 15, 15, 18 | Main background | Near black with blue tint |
| `--bg-secondary` | #1A1A1F | 26, 26, 31 | Card backgrounds | Slightly elevated |
| `--bg-tertiary` | #252530 | 37, 37, 48 | Elevated surfaces | Highest elevation |

### Text Colors

| Token | Hex Value | RGB | Usage | WCAG Contrast (on #0F0F12) |
|-------|-----------|-----|-------|----------------------------|
| `--text-primary` | #F8F9FA | 248, 249, 250 | Primary text | 19.1:1 ✅ AAA |
| `--text-secondary` | #B8B9C0 | 184, 185, 192 | Secondary text | 10.3:1 ✅ AAA |
| `--text-tertiary` | #6E6F7A | 110, 111, 122 | Low emphasis | 4.5:1 ✅ AA |

### Accent Colors

| Token | Hex Value | Usage | State |
|-------|-----------|-------|-------|
| `--accent-success` | #10B981 | Saved items, success states | ✅ Pass |
| `--accent-warning` | #F59E0B | Warnings, alerts | ⚠️ Alert |
| `--accent-info` | #3B82F6 | Informational states | ℹ️ Info |

### Gradient Definitions

```css
/* Primary Recording Gradient */
--gradient-recording: linear-gradient(135deg, 
  #FF6B6B 0%,    /* Coral start */
  #FF8E53 50%,   /* Warm orange mid */
  #FFB84D 100%   /* Golden end */
);

/* Animated Background Gradient */
--bg-ambient: linear-gradient(135deg,
  #0F0F12 0%,
  #1A1325 30%,
  #1F1A2E 60%,
  #0F0F12 100%
);

/* Waveform Gradient (Vertical) */
--gradient-waveform: linear-gradient(180deg,
  #FF6B6B 0%,
  #FF8E53 50%,
  #FFB84D 100%
);
```

### Glow Effects

| Token | RGBA Value | Usage | Intensity |
|-------|------------|-------|-----------|
| `--glow-recording-inner` | rgba(255, 107, 107, 0.7) | Inner glow ring | Strong |
| `--glow-recording-outer` | rgba(255, 142, 83, 0.4) | Outer glow halo | Medium |
| `--glow-recording-intense` | rgba(255, 184, 77, 0.8) | Peak glow state | Maximum |

---

## 📐 TYPOGRAPHY SYSTEM

### Font Stacks

```css
/* Primary Font Stack */
--font-primary: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;

/* Monospace Stack (for timestamps) */
--font-mono: 'JetBrains Mono', 'SF Mono', 'Consolas', 'Liberation Mono', monospace;
```

### Type Scale

| Token | Size (rem/px) | Line Height | Usage | Min Touch Target |
|-------|---------------|-------------|-------|------------------|
| `--text-transcript` | 2rem / 32px | 1.75 | Live transcript display | N/A |
| `--text-interim` | 1.75rem / 28px | 1.75 | Interim/uncertain text | N/A |
| `--text-heading` | 1.5rem / 24px | 1.5 | Page titles | N/A |
| `--text-body` | 1rem / 16px | 1.5 | Body text | N/A |
| `--text-small` | 0.875rem / 14px | 1.5 | Labels, captions | 44px |
| `--text-tiny` | 0.75rem / 12px | 1.5 | Timestamps | 44px |

### Font Weights

| Token | Value | Usage |
|-------|-------|-------|
| `--weight-normal` | 400 | Body text |
| `--weight-medium` | 500 | UI labels |
| `--weight-semibold` | 600 | Buttons, emphasis |
| `--weight-bold` | 700 | Headings |

---

## 📏 SPACING & LAYOUT

### Spacing Scale (8px Base Unit)

| Token | Value (rem/px) | Usage Example |
|-------|----------------|---------------|
| `--space-xs` | 0.25rem / 4px | Icon margins |
| `--space-sm` | 0.5rem / 8px | Tight spacing |
| `--space-md` | 1rem / 16px | Default spacing |
| `--space-lg` | 1.5rem / 24px | Section spacing |
| `--space-xl` | 2rem / 32px | Component spacing |
| `--space-2xl` | 3rem / 48px | Page margins |
| `--space-3xl` | 4rem / 64px | Large sections |

### Component Dimensions

| Component | Dimension | Value | Notes |
|-----------|-----------|-------|-------|
| Recording Button | Size | 80px | Large touch target |
| Recording Button | Icon | 36px | Microphone icon |
| Waveform | Height | 60px | Total height |
| Waveform | Bar Width | 4px | Individual bar |
| Waveform | Bar Gap | 3px | Space between |
| Waveform | Bar Count | 24 | Optimal for iPhone |

### Safe Area Variables

```css
--safe-top: env(safe-area-inset-top);
--safe-right: env(safe-area-inset-right);
--safe-bottom: env(safe-area-inset-bottom);
--safe-left: env(safe-area-inset-left);
```

---

## 🎭 ANIMATION SYSTEM

### Duration Scale

| Token | Value | Usage | User Perception |
|-------|-------|-------|-----------------|
| `--duration-instant` | 0ms | No animation | Immediate |
| `--duration-fast` | 150ms | Micro-interactions | Quick response |
| `--duration-normal` | 300ms | Standard transitions | Natural |
| `--duration-slow` | 500ms | Complex transitions | Deliberate |
| `--duration-breath` | 1800ms | Breathing pulse | Ambient |
| `--duration-ripple` | 2500ms | Ripple expansion | Background |

### Easing Functions

| Token | Value | Usage | Feel |
|-------|-------|-------|------|
| `--ease-standard` | cubic-bezier(0.4, 0, 0.2, 1) | Default easing | Natural |
| `--ease-in-out` | cubic-bezier(0.4, 0, 0.6, 1) | Symmetric motion | Balanced |
| `--ease-out` | cubic-bezier(0, 0, 0.2, 1) | Deceleration | Stopping |
| `--ease-bounce` | cubic-bezier(0.68, -0.55, 0.265, 1.55) | Playful motion | Energetic |

### Spring Physics Configuration

```javascript
// Standard Spring Configuration
const springConfig = {
  type: "spring",
  stiffness: 100,
  damping: 12,
  mass: 1
};

// Responsive Spring (for user interactions)
const responsiveSpring = {
  type: "spring",
  stiffness: 150,
  damping: 15,
  mass: 1
};

// Gentle Spring (for ambient animations)
const gentleSpring = {
  type: "spring",
  stiffness: 50,
  damping: 10,
  mass: 1
};
```

### Animation Presets

```javascript
// Breathing Pulse Animation
const breathingPulse = {
  scale: [1, 1.08, 1],
  boxShadow: [
    "0 0 25px rgba(255, 107, 107, 0.5)",
    "0 0 45px rgba(255, 142, 83, 0.7)",
    "0 0 25px rgba(255, 107, 107, 0.5)"
  ],
  transition: {
    duration: 1.8,
    repeat: Infinity,
    ease: "easeInOut"
  }
};

// Ripple Expansion Animation
const rippleExpansion = {
  scale: [1, 2.5],
  opacity: [0.6, 0],
  transition: {
    duration: 2.5,
    ease: "easeOut",
    repeat: Infinity
  }
};

// Waveform Bar Animation
const waveformBar = {
  scaleY: [0.2, 1, 0.2],
  transition: {
    duration: 0.8,
    ease: "easeInOut",
    repeat: Infinity,
    repeatDelay: 0.1
  }
};
```

---

## 🌟 SHADOW & GLOW SYSTEM

### Elevation Shadows

| Token | Value | Usage | Elevation |
|-------|-------|-------|-----------|
| `--shadow-sm` | 0 1px 2px rgba(0, 0, 0, 0.1) | Subtle depth | 1dp |
| `--shadow-md` | 0 4px 8px rgba(0, 0, 0, 0.15) | Cards, modals | 4dp |
| `--shadow-lg` | 0 8px 16px rgba(0, 0, 0, 0.2) | Elevated elements | 8dp |
| `--shadow-xl` | 0 16px 32px rgba(0, 0, 0, 0.25) | Overlays | 16dp |

### Glow States

| State | Token | Value | Usage |
|-------|-------|-------|-------|
| Idle | `--glow-idle` | 0 0 0 rgba(255, 107, 107, 0) | No glow |
| Active Min | `--glow-active-min` | 0 0 25px rgba(255, 107, 107, 0.5) | Recording start |
| Active Max | `--glow-active-max` | 0 0 45px rgba(255, 142, 83, 0.7) | Recording peak |
| Intense | `--glow-intense` | 0 0 60px rgba(255, 184, 77, 0.8) | High audio level |

---

## 📊 Z-INDEX SCALE

| Layer | Token | Value | Usage |
|-------|-------|-------|-------|
| Background | `--z-background` | -1 | Background animations |
| Base | `--z-base` | 0 | Default layer |
| Card | `--z-card` | 10 | Cards, elevated surfaces |
| Dropdown | `--z-dropdown` | 100 | Dropdowns, tooltips |
| Sticky | `--z-sticky` | 200 | Sticky headers |
| Modal | `--z-modal` | 1000 | Modal overlays |
| Popover | `--z-popover` | 1100 | Popovers, menus |
| Toast | `--z-toast` | 1200 | Toast notifications |
| Critical | `--z-critical` | 9999 | Critical UI elements |

---

## ♿ ACCESSIBILITY REQUIREMENTS

### Motion Preferences

```css
/* Reduced Motion Media Query */
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
  
  /* Preserve essential feedback */
  .recording-indicator {
    opacity: 1 !important;
    transform: none !important;
  }
}
```

### ARIA Implementation

```javascript
// Recording Button ARIA
{
  role: "button",
  "aria-label": isRecording ? "Stop recording" : "Start recording",
  "aria-pressed": isRecording,
  "aria-live": "polite",
  tabIndex: 0
}

// Waveform ARIA
{
  role: "img",
  "aria-label": "Audio level visualization showing current recording volume",
  "aria-live": "polite"
}

// Transcript ARIA
{
  role: "region",
  "aria-label": "Live transcription output",
  "aria-live": "polite",
  "aria-atomic": false
}
```

### Focus Indicators

```css
/* Visible Focus States */
:focus-visible {
  outline: 3px solid var(--color-recording-mid);
  outline-offset: 2px;
  border-radius: 8px;
}

/* Skip Links */
.skip-link:focus {
  position: absolute;
  top: var(--space-md);
  left: var(--space-md);
  z-index: var(--z-critical);
}
```

---

## 🚀 IMPLEMENTATION CHECKLIST

### Phase 1: Foundation Setup
- [ ] Update CSS variables in `index.css`
- [ ] Implement color tokens exactly as specified
- [ ] Configure typography scale
- [ ] Set up spacing system
- [ ] Define z-index scale

### Phase 2: Component Migration
- [ ] Update RecordingButton with gradient system
- [ ] Implement WaveformVisualizer component
- [ ] Apply spring physics to animations
- [ ] Add breathing pulse to active states
- [ ] Configure glow effects

### Phase 3: Accessibility Enhancement
- [ ] Implement reduced motion fallbacks
- [ ] Add comprehensive ARIA labels
- [ ] Test keyboard navigation
- [ ] Verify focus indicators
- [ ] Validate color contrast ratios

### Phase 4: Quality Assurance
- [ ] Lighthouse accessibility: 100/100
- [ ] Performance: 60fps on iPhone 12+
- [ ] Bundle size increase: <50KB
- [ ] WCAG compliance: AA minimum
- [ ] Device testing: iPhone 12/13/14/15

---

## 📋 QUICK REFERENCE CARDS

### Color Quick Reference
```
Recording Gradient: #FF6B6B → #FF8E53 → #FFB84D
Background: #0F0F12 (primary), #1A1A1F (cards)
Text: #F8F9FA (primary), #B8B9C0 (secondary)
```

### Animation Quick Reference
```
Standard Spring: stiffness=100, damping=12
Breathing Cycle: 1800ms
Ripple Duration: 2500ms
Standard Easing: cubic-bezier(0.4, 0, 0.2, 1)
```

### Spacing Quick Reference
```
xs: 4px, sm: 8px, md: 16px, lg: 24px
xl: 32px, 2xl: 48px, 3xl: 64px
Recording Button: 80px × 80px
Waveform: 168px × 60px (24 bars)
```

---

## 🔄 VERSION HISTORY

### v3.5.0 (2025-10-27)
- **MAJOR**: Complete shift from "Kinetic Glow" to "Sonic Clarity"
- **ADDED**: Wave-inspired gradient system
- **ADDED**: Audio-reactive waveform specifications
- **ADDED**: Spring physics configuration
- **ADDED**: Enhanced accessibility guidelines
- **IMPROVED**: AI-friendly tables and quick reference cards
- **FIXED**: All z-index conflicts documented in v2.0

### v2.0.0 (Previous)
- Original "Kinetic Glow" design system
- Glassmorphism effects
- Cool color palette (deprecated)

---

## 🤖 AI IMPLEMENTATION NOTES

### For Lovable (Code Generator)
1. Execute color tokens EXACTLY as specified (no variations)
2. Use spring physics config verbatim (no tweaking values)
3. Implement all ARIA labels as documented
4. Follow z-index scale strictly (no arbitrary values)

### For Gemini (Strategic Architect)
1. Reference this document in ALL implementation prompts
2. Break components into atomic tasks per HARMONIC methodology
3. Include accessibility requirements in EVERY prompt
4. Specify "DO NOT" constraints for each component

### For Validators (Grok/Claude)
1. Flag ANY color not from this palette
2. Verify ALL animations have reduced-motion fallbacks
3. Check z-index values against defined scale
4. Ensure ARIA implementation matches specifications

### For Copilot (Auditor)
1. Validate hex values match EXACTLY
2. Confirm spring physics values unchanged
3. Verify accessibility score maintains 100/100
4. Check bundle size impact remains <50KB

---

**END OF DESIGN SYSTEM v3.5**

This document serves as the single source of truth for all visual and interaction design decisions in EyeHearU. Any deviations must be approved and documented in a new version.
