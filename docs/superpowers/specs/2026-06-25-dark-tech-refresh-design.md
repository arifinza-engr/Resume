# Dark-Tech Light-Touch Refresh — Design Spec

**Date:** 2026-06-25
**Project:** developerFolio personal portfolio (branch `chore/modernize-stack`)
**Author:** Arifinza Eska Nugraha (with Claude)

## Goal

Make the portfolio look more professional with a "dark-tech / engineer" feel, using a
**light-touch** approach: minimal, low-risk changes that do not alter layout, sections, or
illustrations. Three changes only: dark theme by default, a sky-blue accent replacing the
purple, and a monospace logo.

## Non-Goals

- No layout or section structure changes.
- No replacement/removal of the Lottie illustrations (kept as-is).
- No new web-font network requests.
- No deep accessibility rework (color-contrast of body text and card heading-order remain
  known issues tracked separately).
- Light mode is **not removed** — the toggle stays; only the default flips to dark.

## Decisions (from brainstorming)

| Topic | Decision |
|-------|----------|
| Direction | Dark tech / engineer |
| Depth | Light touch |
| Accent color | Sky blue `#38BDF8` (hover/deeper `#0EA5E9`) |
| Logo | Monospace, keep existing `< name />` bracket structure |
| Light mode | Keep toggle, default to dark |

## Palette

| Token | Value | Use |
|-------|-------|-----|
| Accent | `#38BDF8` | buttons, skill bars, borders, skills color, toggle-checked |
| Accent hover / deeper | `#0EA5E9` | button hover |
| On-accent text | `#0E1525` | text/icon on sky-blue button fill (contrast ≈ 10:1, passes WCAG AA) |
| Dark background | `#171C28` | already defined as `$darkBackground`; reused for theme-color & PWA |

Rationale for dark on-accent text: white text on `#38BDF8` fails WCAG (~1.7:1). Dark navy
text on `#38BDF8` is ~10:1 and is the standard modern "bright accent button" look. The current
button **hover** also fails with sky-blue (it inverts to a white background with accent-colored
text — `#38BDF8` on white ≈ 1.9:1), so the hover is redesigned to *darken the fill* instead of
inverting: hover background `#0EA5E9` with the same dark text (≈ 7:1).

A new token `$onAccentText: #0E1525;` is added to `_globalColor.scss` to express this.

## Changes

### 1. Dark by default — `src/containers/Main.tsx`
- Change the theme initializer from `useLocalStorage("isDark", darkPref.matches)` to
  `useLocalStorage("isDark", true)`.
- Remove the now-unused `const darkPref = window.matchMedia("(prefers-color-scheme: dark)")`
  line (otherwise it becomes an unused-variable lint error).
- The light/dark toggle (ToggleSwitch in Header) is untouched — visitors can still switch,
  and the choice persists via localStorage.

### 2. Accent recolor — `src/_globalColor.scss` (all purple lives here; no hardcoded purple
exists in component SCSS/TSX — verified by grep)

| Line | Variable | Old | New |
|------|----------|-----|-----|
| 6 | `$buttonColor` | `#55198b` | `#38BDF8` |
| 7 | `$buttonHover` | `#8c43ce` | `#0EA5E9` |
| 31 | `$githubProfileCardBorder` | `#6c63ff` | `#38BDF8` |
| 63 | `$educationCardBorder` | `#a9a7f9` | `rgba(56, 189, 248, 0.45)` |
| 72 | `$progressBarSpanBG` | `#aaa5ff` | `#38BDF8` |
| 77 | `$skillsColor` | `#645beb` | `#38BDF8` |
| 22 | `$toggleCheck` | `#2196f3` | `#38BDF8` (align toggle to accent) |

Also **add** a new token near the button colors: `$onAccentText: #0E1525;`.

Button rules — `src/components/button/Button.scss` (verified):
- `.main-button` (line 6): `color: $textColorDark;` → `color: $onAccentText;`
  (background stays `$buttonColor`, now `#38BDF8`).
- `.main-button:hover` (lines 22–23): change
  `background-color: $darkBoxShadow2;` → `background-color: $buttonHover;` (now `#0EA5E9`), and
  `color: $buttonColor;` → `color: $onAccentText;`.
  This makes the button *darken* on hover (dark text throughout) instead of inverting to a
  low-contrast white. All button variants (resume, project, scroll-to-top) inherit `.main-button`.

These accent variables are shared by both themes, so the sky-blue accent applies in light
mode too (sky-blue fill + dark text works on a light background as well).

### 3. Monospace logo — `src/components/header/Header.scss` (line ~64)
- `.header .logo-name` `font-family: "Agustina Regular";` →
  `font-family: "JetBrains Mono", "Fira Code", "SF Mono", Consolas, "Liberation Mono", monospace;`
- Adjust `font-size` / `letter-spacing` only if the monospace rendering looks too wide/tight
  for the header (monospace is wider than the signature font). Keep the existing
  `< … />` bracket markup in `Header.tsx` unchanged.
- Optional consistency: the splash title (`SplashScreen.css` `.splash-title`) also uses
  "Agustina Regular". Leave as-is for this light touch unless it looks off on dark.

### 4. Browser/PWA chrome to match dark
- `index.html`: `<meta name="theme-color" content="#6c63ff">` → `#171C28`;
  `<meta name="msapplication-TileColor" content="#603cba">` → `#171C28`.
- `public/manifest.json`: `"theme_color": "#6c63ff"` → `#171C28`;
  `"background_color": "#ffffff"` → `#171C28` (so the PWA launch background is dark, no white flash).

### Splash background
The splash renders inside the `isDark ? "dark-mode"` wrapper in `Main.tsx`, so flipping the
default to dark makes the splash inherit the dark background automatically (no white flash).
Verify during testing.

## Verification

1. `npm run typecheck` — passes (no unused `darkPref`).
2. `npm run lint` — no new errors.
3. `npx vite build` — succeeds.
4. Screenshots via Playwright on `vite preview`:
   - Desktop + mobile load **dark by default**.
   - Buttons are sky-blue with **dark, readable text**; skill bars and card borders are sky-blue.
   - Logo renders in **monospace** with the `< name />` brackets intact.
   - Toggle to light mode still works and looks intact.
5. Re-run axe color-contrast: confirm the recolor introduces **no new** contrast failures and
   the button contrast is now strong (dark-on-accent).
6. Confirm the Lottie illustrations still read acceptably on the dark background; flag any clash.

## Risks / Tension

- The playful purple Lottie illustrations remain and sit on a dark background. They may look
  slightly out of place against the engineer aesthetic. Accepted for this light touch; flag
  if any specific illustration clashes badly. Swapping them for a tech motif is a separate,
  future step.
- Shared accent variables affect both themes — intended, but light mode should be spot-checked.
