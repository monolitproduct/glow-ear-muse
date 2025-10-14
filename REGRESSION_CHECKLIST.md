# EyeHearU Core Functionality Regression Checklist

This checklist must be completed on a physical iPhone after every single implementation prompt. Use "Nuke and Pave" builds (rm -rf ios && npx cap add ios && npx cap sync ios) for testing.

## Phase 1: Foundation & UI
- [ ] App launches successfully without crashing (verify native compliance like privacy manifests).
- [ ] Core navigation is functional (e.g., navigating between placeholder pages).
- [ ] No global scroll prevention bugs (test on a page with long placeholder content).
- [ ] All UI elements render correctly without visual occlusion (check z-index adherence).
- [ ] Animations respect prefers-reduced-motion and have good contrast.

## Phase 2: Core Transcription (Placeholder - Expand Later)
- [ ] Transcription starts/stops without races.
- [ ] Text displays with proper solidification animation.

## General A11Y & Perf
- [ ] WCAG AA contrast on all text/elements.
- [ ] No flickering or stuttering animations.
