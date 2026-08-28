# SoloTome website design spec

## Positioning
SoloTome is a personal book catalog that runs in the user's Google account. Public copy must stay calm, concrete and reader-first. Avoid claims about encryption or local-first storage unless the implementation is later verified.

Primary Russian tagline: **Личный каталог книг в твоём Google-аккаунте**.

## Visual language
- Prata for SoloTome and rare display headlines.
- Manrope for UI, copy, navigation and buttons.
- Carbon and titanium as restrained material cues, never as a noisy texture layer.
- Dark background near #090909; light background warm ivory near #F3F1ED.
- Thin metallic borders, physical shadows, slow motion, large spacing.
- No generic blue/green startup gradients and no AI-purple.

## Page scenes
1. Hero: SoloTome, primary tagline, carbon/titanium book object, Install + GitHub.
2. Product: library, book detail, recommendations using replaceable screenshot containers.
3. Dark/light theme cinematic split.
4. Data architecture: Browser/PWA → Apps Script → Google Sheets; Gemini optional.
5. Export: application catalog visually unfolds into a human-readable SoloTome_Export sheet.
6. Optional Gemini recommendations.
7. Add/import books.
8. Browser/PWA installation walkthrough.
9. Open source / GitHub.
10. Closing CTA.

## Screenshot replacement contract
Temporary renders are deliberately isolated and referenced through a replaceable asset map. Replace them with final real screenshots using the same semantic slots and aspect ratios where practical, so the site composition does not need redesigning.

## Motion
- 0.7–1.2 second restrained reveal transitions.
- Subtle hero 3D pointer tilt and metallic glint.
- No springy gamification.
- Respect `prefers-reduced-motion`.

## Technical target
- React + Vite static site.
- GitHub Pages project path `/solotome/`.
- No backend dependency.
- Responsive desktop/mobile art direction, not simply scaled desktop.
