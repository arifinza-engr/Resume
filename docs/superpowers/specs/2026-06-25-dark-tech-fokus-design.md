# Dark-Tech "Fokus" Refresh — Design Spec

**Date:** 2026-06-25
**Project:** developerFolio portfolio (branch `chore/modernize-stack`)
**Builds on:** the merged light-touch refresh (dark default, sky-blue `#38bdf8` accent, monospace logo). This increment goes further: a redesigned hero, removal of the cartoon illustrations in favor of a consistent technical motif, monospace section headings, and polished cards.

## Goal

Make the portfolio genuinely read as "dark-tech / engineer" — not just recolored. Chosen hero direction: **Mockup C (Minimal + grid)** — a centered hero on a dot-grid background with a monospace command prompt, large name, accent role line, and clean CTAs. The same minimal/mono aesthetic is applied consistently to skills, contact, section headings, and cards.

## Non-Goals

- No section reordering, no new sections, no content/copy changes in `portfolio.ts`.
- No new runtime dependencies. Fonts use a system monospace stack (matches the merged logo change) + the existing Montserrat for body; no required web-font fetch.
- Light mode is not redesigned; it remains functional via the toggle. The visual target is dark mode (the default). Spot-check light mode for no breakage; minor light-mode imperfections are acceptable.
- Blogs/Talks/Podcast/StartupProjects sections stay `display:false`; their headings get the shared treatment for consistency but are not otherwise designed.

## Reference

Approved hero mockup: `<scratchpad>/mock-c-minimal.html` (the source of truth for the hero's CSS — grid background, prompt pill, name scale, role line, buttons, socials).

## Palette / tokens (already in `src/_globalColor.scss`)

- Accent `#38bdf8` (`$buttonColor`, `$skillsColor`, …), accent-deep `#0ea5e9` (`$buttonHover`), on-accent text `#0e1525` (`$onAccentText`), dark bg `#171c28` (`$darkBackground`). Muted text uses the existing `$subTitle: #868e96`.
- New additions this increment may introduce: a muted border token and a dot-grid background — defined inline or as new SCSS variables (e.g. `$techBorder: rgba(56,189,248,0.18)`).

## Design by section

### 1. Hero (`Greeting`)
Replace the two-column (text + Lottie) layout with the centered Mockup-C layout:
- **Dot-grid background** + soft sky-blue radial glow at top, scoped to the hero region.
- **Prompt pill**: monospace `~/finza $ whoami` with a blinking accent cursor, in a rounded outlined chip.
- **Name**: `greeting.username` ("Arifinza Eska Nugraha") large and bold (Montserrat/sans), tight letter-spacing.
- **Role line** (monospace, accent): `> IT Support Specialist · server · network · automation`.
- **Subtitle**: `greeting.subTitle` (muted).
- **CTAs**: existing buttons — "Contact me" (filled sky-blue, dark text) and, when `greeting.resumeLink` is set, "Download résumé" (outline). Reuse the existing `Button` component and the `resumePdf` download anchor.
- **Socials**: existing `SocialMedia` component, centered.
- **Removed**: `landingPerson` Lottie, `manOnTable.svg`, and `DisplayLottie` usage in this component. Centered, single-column; responsive (stacks/sizes down on mobile).

### 2. Section headings (all sections)
Unified "code-comment" treatment via a shared SCSS mixin so the rule lives in one place (no per-file duplication):
- **Monospace**, normal weight, ~`2rem` (responsive down), accent-tinted `//` prefix via `::before { content: "// "; }`.
- Applied to: `.skills-heading`, `.experience-heading`, `.education-heading`, `.project-title`, `.blog-header-text`, `.talk-header-title`, `.podcast-header-title`, `.achievement-heading`, `.prof-title`, `.contact-title`.
- Result reads like `// what i do`, `// education`, etc. (Prefix is `//` per decision.)

### 3. Skills (`Skills`)
- Remove the left illustration (`codingPerson` Lottie / `developerActivity.svg`) and the `DisplayLottie` usage there.
- Make the **software-skill icon grid** (`SoftwareSkill`) the section's visual anchor: centered, larger icons, sky-blue hover. Keep the "What I do" subtitle + bullet list. Single-column, centered layout instead of two-column.

### 4. Contact ("Reach Out to me!" — `GithubProfileCard`, plus `Contact` fallback)
- The normally-rendered contact is `GithubProfileCard` (Profile renders it when `openSource` + profile.json load). Remove its reliance on the cartoon look; present a **minimal mono contact block**: heading, subtitle, location, "open to opportunities" line, and `SocialMedia`, styled mono/minimal on the dark bg. The avatar image stays (round, thin accent ring).
- Apply the same minimal treatment to the `Contact` fallback (`Contact.tsx`/`Contact.scss`): remove the `email`/`DisplayLottie` illustration; show mono contact details (number + email) + socials. Email/number already set in `portfolio.ts`.

### 5. Cards (`EducationCard`, `ExperienceCard`, `AchievementCard`)
- Dark panel surface, **thin sky-blue border** (`rgba(56,189,248,0.18)`), subtle **glow/lift on hover** (border brightens to `#38bdf8` + soft box-shadow + slight translateY).
- Dates and role/sub-labels rendered in **monospace**, muted/accent color.
- Keep existing card content and structure; this is a skin, not a rewrite.

### 6. Background
- Dot-grid prominent in the **hero only**. Other sections keep the flat `$darkBackground`. Avoid a site-wide busy grid.

### 7. Splash screen
- Ensure it sits on the dark background (already inherits `.dark-mode`) with sky-blue/light text. Optional: switch `.splash-title` to monospace for consistency. Low priority.

## Verification

1. `npm run typecheck`, `npm run lint` (0 errors), `npx vite build` pass.
2. Playwright screenshots on `vite preview --port 4173` (keep ports 3000/3001 free; kill preview after):
   - Hero loads dark, centered, dot-grid + prompt pill + big name + accent role line + sky-blue buttons (dark text) + socials. No cartoon illustration anywhere.
   - Section headings render monospace with `//` prefix.
   - Skills shows the icon grid (no illustration); contact is the minimal mono block; cards show thin accent border + hover glow.
   - Full-page dark screenshot (desktop + mobile) looks cohesive.
3. axe color-contrast count must not exceed the post-light-touch baseline (0); no new contrast failures from the new text-on-dark / accent elements.
4. Light mode still reachable via toggle and not broken.

## Risks

- The `Footer.scss` global `.dark-mode { color:#fff !important }` still forces text white app-wide; any new colored text in dark mode may need to account for it (as the button did). Watch for it on the role line / prompt / mono accents; use the accent color with sufficient specificity or `!important` only where this rule interferes. (Root-cause cleanup remains a tracked follow-up.)
- Mono headings at large sizes are wide; size them moderately (~2rem) to avoid overflow on mobile.
- This touches many files (hero rewrite + ~10 heading classes + 3 card SCSS + skills/contact). It is a real redesign; scope is bounded to skinning + the hero/skills/contact layout, not logic.
