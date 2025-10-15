# Regression Checklist (Phase 1)

## 1. App Shell & Layout
- [ ] Root gradient renders from #121212 to #1A1A2E
- [ ] Root container has `overflow-auto` (not hidden)
- [ ] Root explicitly sets `z-0`
- [ ] No unexpected global scroll lock
- [ ] No stray `overflow-hidden` on structural wrappers

## 2. Routing
- [ ] Routes resolve: `/` (Dashboard), `/login`, `/transcribe`, `/settings`
- [ ] All placeholder pages mount under AppShell
- [ ] 404 handled gracefully (NotFound)

## 3. Internationalization
- [ ] `app.title` key exists and shows "EyeHearU"
- [ ] No missing translation warnings in console

## 4. Motion & A11Y
- [ ] Page fade-in animation works
- [ ] `prefers-reduced-motion` disables transforms
- [ ] Focus rings visible on keyboard navigation

## 5. Visual Layering
- [ ] z-index values adhere to defined scale
- [ ] No unintended occlusion (modals, toasts, dropdowns)

## 6. Theming & Contrast
- [ ] Contrast AA for body text
- [ ] No hard-coded colors outside tokens (spot check components)

## 7. Forms & Validation
- [ ] Zod schema validation shows user-friendly messages
- [ ] No console errors during invalid submission

## 8. Build & Native
- [ ] Capacitor iOS build succeeds
- [ ] Info.plist includes microphone & speech usage descriptions
- [ ] PrivacyInfo.xcprivacy present with empty accessed APIs array

## 9. Performance / Stability
- [ ] Initial load no unhandled promise rejections
- [ ] No layout shift after first paint (CLS stable)

## 10. Logging / Warnings
- [ ] No React StrictMode warnings (if enabled)
- [ ] No missing key warnings in lists

Run this checklist after each significant merge during Phase 1.
Version: 1.0.0
