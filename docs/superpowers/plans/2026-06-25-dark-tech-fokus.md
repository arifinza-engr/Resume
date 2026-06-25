# Dark-Tech "Fokus" Refresh Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Turn the recolored portfolio into a genuinely "dark-tech / engineer" look: a centered minimal+grid hero, monospace `//`-prefixed section headings, cartoon illustrations replaced by a clean technical aesthetic, minimal mono contact, and polished cards.

**Architecture:** SCSS skin + targeted component edits. A shared SCSS partial holds the monospace font stack and a `section-heading` mixin; the hero (`Greeting`) and `Skills`/`Contact` get layout edits to drop the Lottie/SVG illustrations; card SCSS gets a border/glow/mono skin. No new dependencies; dark is already the default.

**Tech Stack:** React 19, Vite 6, SCSS (Sass), Playwright + axe-core (verification).

**Design source of truth:** `docs/superpowers/specs/2026-06-25-dark-tech-fokus-design.md` and the approved hero mockup `mock-c-minimal.html` (in the session scratchpad).

## Global Constraints

- Accent `#38bdf8`; accent-deep `#0ea5e9`; on-accent text `#0e1525`; dark bg `#171c28`; muted `#868e96` (`$subTitle`). All hex lowercase in SCSS.
- Monospace = system stack (NO web-font fetch): `"JetBrains Mono", "Fira Code", "SF Mono", Consolas, "Liberation Mono", monospace`.
- Heading prefix is exactly `// ` (two slashes + space) via `::before`.
- Dark is the default and the design target; the light/dark toggle MUST stay functional (light mode not redesigned, only must remain readable — rely on inherited `color` so text flips with theme; never hardcode the name/body text color).
- Watch the pre-existing global `.dark-mode { color:#fff !important }` in `Footer.scss`: any new text that must be the accent color in dark mode needs enough specificity or `!important` to win (as the button did).
- No content/copy edits in `portfolio.ts`; no section reordering; Blogs/Talks/Podcast/StartupProjects stay `display:false`.
- `npm run typecheck`, `npm run lint` (0 errors; the one pre-existing `react-refresh` warning in `StyleContext.tsx` is acceptable), and `npx vite build` MUST pass before each commit.
- Verification uses `vite preview --port 4173` (keep ports 3000/3001 free); kill the preview server after each verification; `build/` is git-ignored — never commit it.

---

### Task 1: Shared monospace token + `//` section-heading treatment

**Files:**
- Modify: `src/_globalColor.scss` (add `$mono` variable + `@mixin section-heading`)
- Modify: `src/components/header/Header.scss` (refactor logo to use `$mono`)
- Modify (add `@include section-heading;`, remove old font-size/font-weight for the heading class): `src/containers/skills/Skills.scss` (`.skills-heading`), `src/containers/workExperience/WorkExperience.scss` (`.experience-heading`), `src/containers/education/Education.scss` (`.education-heading`), `src/containers/projects/Project.scss` (`.project-title`), `src/containers/blogs/Blog.scss` (`.blog-header-text`), `src/containers/talks/Talks.scss` (`.talk-header-title`), `src/containers/podcast/Podcast.scss` (`.podcast-header-title`), `src/containers/achievement/Achievement.scss` (`.achievement-heading`), `src/components/githubProfileCard/GithubProfileCard.scss` (`.prof-title`), `src/containers/contact/Contact.scss` (`.contact-title`)

**Interfaces:**
- Produces: SCSS `$mono` (font stack) and `@mixin section-heading`, both defined in `_globalColor.scss` (which every component SCSS already `@import`s — no new imports needed). Consumed by Header logo, the hero (Task 2), and all heading classes.

- [ ] **Step 1: Add `$mono` + mixin to `src/_globalColor.scss`**

Append at the end of the file:

```scss
// ---- typography ----
$mono: "JetBrains Mono", "Fira Code", "SF Mono", Consolas, "Liberation Mono",
  monospace;

// Shared "code-comment" style for every section heading.
@mixin section-heading {
  font-family: $mono;
  font-weight: 500;
  font-size: clamp(1.4rem, 4vw, 2rem);
  letter-spacing: -0.5px;
  &::before {
    content: "// ";
    color: $skillsColor;
  }
}
```

- [ ] **Step 2: Refactor the logo font in `src/components/header/Header.scss` to use `$mono`**

Replace the `.header .logo-name` font-family value (currently the inline monospace stack) with:

```scss
.header .logo-name {
  font-family: $mono;
}
```

(Keep all other properties in that rule unchanged.)

- [ ] **Step 3: Apply the mixin to every section-heading class**

For EACH heading class below, set its rule to use the mixin and REMOVE that rule's own `font-size` and `font-weight` declarations and any media-query `font-size` override for that same class (the mixin's `clamp()` handles responsiveness). Keep any unrelated properties (e.g. `text-align`, color). Worked example for `src/containers/skills/Skills.scss`:

Before:
```scss
.skills-heading {
  font-size: 56px;
  font-weight: 400;
}
```
After:
```scss
.skills-heading {
  @include section-heading;
}
```
…and delete the `.skills-heading { font-size: 40px; }` (1380px query) and `.skills-heading { font-size: 30px; text-align: center; }` (768px query) — keep `text-align: center;` by moving it onto the base rule:
```scss
.skills-heading {
  @include section-heading;
}
@media (max-width: 768px) {
  .skills-heading {
    text-align: center;
  }
}
```

Apply the same pattern (add `@include section-heading;`, strip old font-size/font-weight, preserve text-align/color) to each:

| File | Class |
|------|-------|
| `src/containers/workExperience/WorkExperience.scss` | `.experience-heading` |
| `src/containers/education/Education.scss` | `.education-heading` |
| `src/containers/projects/Project.scss` | `.project-title` |
| `src/containers/blogs/Blog.scss` | `.blog-header-text` |
| `src/containers/talks/Talks.scss` | `.talk-header-title` |
| `src/containers/podcast/Podcast.scss` | `.podcast-header-title` |
| `src/containers/achievement/Achievement.scss` | `.achievement-heading` |
| `src/components/githubProfileCard/GithubProfileCard.scss` | `.prof-title` |
| `src/containers/contact/Contact.scss` | `.contact-title` |

For each file: open it, find the class rule, replace its `font-size`/`font-weight` with `@include section-heading;`, and remove any media-query block that only changed that class's font-size. If a class has no explicit font-size of its own, just add `@include section-heading;` to it.

- [ ] **Step 4: Build**

Run: `npx vite build`
Expected: `✓ built` with no Sass errors (a Sass error here usually means a `//` was written outside a quoted string — the prefix must stay inside `content: "// "`).

- [ ] **Step 5: Verify headings render monospace with `//` prefix**

```bash
(npx vite preview --port 4173 &) && sleep 5
```
Create `/tmp/h.py`:
```python
from playwright.sync_api import sync_playwright
with sync_playwright() as p:
    pg = p.chromium.launch().new_context(viewport={"width":1366,"height":900}).new_page()
    pg.goto("http://localhost:4173/", wait_until="load"); pg.wait_for_timeout(3000)
    for y in range(0, pg.evaluate("document.body.scrollHeight"), 500):
        pg.evaluate(f"window.scrollTo(0,{y})"); pg.wait_for_timeout(120)
    h = pg.evaluate("""() => { const el=document.querySelector('.skills-heading');
        const cs=getComputedStyle(el); const pre=getComputedStyle(el,'::before').content;
        return {font: cs.fontFamily, before: pre}; }""")
    print("HEADING:", h)
```
Run: `python /tmp/h.py`
Expected: `font` includes a monospace family and `before` is `"// "`. Kill preview:
```bash
powershell -Command "(Get-NetTCPConnection -LocalPort 4173 -State Listen -ErrorAction SilentlyContinue).OwningProcess | Select-Object -Unique | ForEach-Object { Stop-Process -Id \$_ -Force }"
```

- [ ] **Step 6: Commit**
```bash
git add src/_globalColor.scss src/components/header/Header.scss src/containers/*/*.scss
git commit -m "style(fokus): monospace // section headings + shared \$mono token

Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>"
```

---

### Task 2: Hero rewrite — minimal + grid (Mockup C)

**Files:**
- Rewrite: `src/containers/greeting/Greeting.tsx`
- Rewrite: `src/containers/greeting/Greeting.scss`

**Interfaces:**
- Consumes: `$mono` (Task 1), `greeting` from `portfolio.ts` (`username`, `subTitle`, `resumeLink`, `displayGreeting`), the `Button` component, the `SocialMedia` component, and `resumePdf`.
- Produces: the new hero markup classes (`.hero`, `.prompt`, `.cursor`, `.hero-name`, `.hero-role`, `.hero-sub`, `.hero-cta`).

- [ ] **Step 1: Replace `src/containers/greeting/Greeting.tsx` with the centered hero**

```tsx
import "./Greeting.scss";
import SocialMedia from "../../components/socialMedia/SocialMedia";
import Button from "../../components/button/Button";
import {greeting} from "../../portfolio";
import resumePdf from "./resume.pdf";

export default function Greeting() {
  if (!greeting.displayGreeting) {
    return null;
  }
  return (
    <div className="greet-main" id="greeting">
      <div className="hero">
        <div className="prompt">
          ~/finza $ whoami<span className="cursor"></span>
        </div>
        <h1 className="hero-name">{greeting.username}</h1>
        <div className="hero-role">
          &gt; <b>IT Support Specialist</b> · server · network · automation
        </div>
        <p className="hero-sub">{greeting.subTitle}</p>
        <div className="hero-cta">
          <Button text="Contact me" href="#contact" />
          {greeting.resumeLink && (
            <a
              href={resumePdf}
              download="Resume.pdf"
              className="download-link-button"
            >
              <Button text="Download résumé" />
            </a>
          )}
        </div>
        <SocialMedia />
      </div>
    </div>
  );
}
```

This removes the `landingPerson` Lottie, `manOnTable.svg`, `DisplayLottie`, `illustration`, `StyleContext`, `Fade`, and `emoji` imports — they are no longer used. (`greeting.subTitle` is already an emoji-processed node from `portfolio.ts`, so it renders directly.)

- [ ] **Step 2: Replace `src/containers/greeting/Greeting.scss`**

```scss
@import "../../_globalColor";

.greet-main {
  width: 100%;
  margin: 0 auto;
}

.hero {
  text-align: center;
  padding: 90px 24px 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-image:
    linear-gradient(rgba(56, 189, 248, 0.05) 1px, transparent 1px),
    linear-gradient(90deg, rgba(56, 189, 248, 0.05) 1px, transparent 1px),
    radial-gradient(
      900px 500px at 50% -5%,
      rgba(56, 189, 248, 0.1),
      transparent 60%
    );
  background-size:
    38px 38px,
    38px 38px,
    100% 100%;
}

.prompt {
  font-family: $mono;
  color: $buttonColor;
  font-size: 1rem;
  margin-bottom: 26px;
  border: 1px solid rgba(56, 189, 248, 0.25);
  padding: 8px 16px;
  border-radius: 999px;
  background: rgba(56, 189, 248, 0.06);
}
.cursor {
  display: inline-block;
  width: 8px;
  height: 1em;
  background: $buttonColor;
  vertical-align: -2px;
  margin-left: 2px;
  animation: blink 1s steps(1) infinite;
}
@keyframes blink {
  50% {
    opacity: 0;
  }
}

.hero-name {
  font-size: clamp(2.2rem, 7vw, 4.4rem);
  font-weight: 800;
  letter-spacing: -2px;
  line-height: 1.02;
  margin: 0 0 18px;
}
.hero-role {
  font-family: $mono;
  font-size: clamp(0.95rem, 2.4vw, 1.25rem);
  margin-bottom: 24px;
  b {
    color: $buttonColor;
    font-weight: 500;
  }
}
.hero-sub {
  color: $subTitle !important;
  font-size: 1.1rem;
  line-height: 1.7;
  max-width: 38rem;
  margin: 0 auto 34px;
}
.hero-cta {
  display: flex;
  gap: 16px;
  justify-content: center;
  margin-bottom: 26px;
  flex-wrap: wrap;
}
// the shared Button sets margin-right:50px; cancel it in the centered hero
.hero-cta .main-button {
  margin-right: 0;
}
.download-link-button {
  text-decoration: none;
}
// center the social icons row
.hero .social-media-div {
  justify-content: center;
}

@media (max-width: 768px) {
  .hero {
    padding: 60px 16px 40px;
  }
  .hero-sub {
    font-size: 1rem;
  }
}
```

Note: `.hero-name` intentionally has no `color` — it inherits white from the `.dark-mode` wrapper in dark mode and dark text in light mode, so it stays readable in both themes. `.hero-role b` and `.prompt` use the accent; if the `Footer.scss` global `.dark-mode { color:#fff !important }` overrides them to white in dark mode, add `!important` to those two `color` declarations (verify in Step 4).

- [ ] **Step 3: Build + typecheck**

Run: `npm run typecheck && npx vite build`
Expected: both pass, no unused-import errors (confirms the removed imports are truly gone).

- [ ] **Step 4: Verify the hero visually**
```bash
(npx vite preview --port 4173 &) && sleep 5
```
Create `/tmp/hero.py`:
```python
from playwright.sync_api import sync_playwright
with sync_playwright() as p:
    pg = p.chromium.launch().new_context(viewport={"width":1280,"height":820}).new_page()
    pg.goto("http://localhost:4173/", wait_until="load"); pg.wait_for_timeout(3000)
    role = pg.evaluate("getComputedStyle(document.querySelector('.hero-role b')).color")
    print("ROLE ACCENT:", role)  # expect rgb(56, 189, 248); if white, add !important
    pg.screenshot(path="/tmp/hero-fokus.png")
```
Run: `python /tmp/hero.py` then open `/tmp/hero-fokus.png`.
Expected: centered hero, dot-grid + glow, prompt pill with cursor, big name, accent role line (`ROLE ACCENT` = `rgb(56, 189, 248)`), subtitle, sky-blue buttons with dark text, centered socials. No cartoon illustration. If `ROLE ACCENT` is white, add `!important` to `.hero-role b` and `.prompt` color, rebuild, re-check. Kill preview (Task 1 Step 5 command).

- [ ] **Step 5: Commit**
```bash
git add src/containers/greeting/Greeting.tsx src/containers/greeting/Greeting.scss
git commit -m "style(fokus): rewrite hero to minimal + grid (mockup C)

Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>"
```

---

### Task 3: Skills — drop illustration, center the icon grid

**Files:**
- Modify: `src/containers/skills/Skills.tsx`
- Modify: `src/containers/skills/Skills.scss`

**Interfaces:**
- Consumes: `skillsSection` from `portfolio.ts`, `SoftwareSkill` component.

- [ ] **Step 1: Remove the illustration column in `src/containers/skills/Skills.tsx`**

Delete the entire `.skills-image-div` block (the `<Fade direction="left">…<DisplayLottie/.../></Fade>` wrapping the illustration) and the now-unused imports: `codingPerson`, `DisplayLottie`, `developerActivity`, and `illustration`. Keep `StyleContext`/`isDark` only if still used for the text classes (it is — `dark-mode` class toggling). Resulting render keeps a single centered column:

```tsx
import {useContext} from "react";
import "./Skills.scss";
import SoftwareSkill from "../../components/softwareSkills/SoftwareSkill";
import {skillsSection} from "../../portfolio";
import {Fade} from "react-awesome-reveal";
import StyleContext from "../../contexts/StyleContext";

export default function Skills() {
  const {isDark} = useContext(StyleContext);
  if (!skillsSection.display) {
    return null;
  }
  return (
    <div className={isDark ? "dark-mode main" : "main"} id="skills">
      <div className="skills-main-div skills-single">
        <Fade direction="up" duration={1000} triggerOnce>
          <div className="skills-text-div">
            <h2
              className={isDark ? "dark-mode skills-heading" : "skills-heading"}
            >
              {skillsSection.title}{" "}
            </h2>
            <p
              className={
                isDark
                  ? "dark-mode subTitle skills-text-subtitle"
                  : "subTitle skills-text-subtitle"
              }
            >
              {skillsSection.subTitle}
            </p>
            <SoftwareSkill />
            <div>
              {skillsSection.skills.map((skill, i) => (
                <p
                  key={i}
                  className={
                    isDark ? "dark-mode subTitle skills-text" : "subTitle skills-text"
                  }
                >
                  {skill}
                </p>
              ))}
            </div>
          </div>
        </Fade>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Center the layout in `src/containers/skills/Skills.scss`**

Change `.skills-main-div` (currently `display:flex` two-column) so the single column is centered, and remove the now-irrelevant `.skills-image-div` / left-margin rules. Add:

```scss
.skills-main-div.skills-single {
  display: block;
  max-width: 70rem;
  margin: 0 auto;
  text-align: center;
}
.skills-single .skills-text-div {
  margin-left: 0;
}
.skills-single .software-skills-main-div {
  justify-content: center;
}
```

Keep `.skills-heading` (already mono via Task 1) and the subtitle/text rules. The `SoftwareSkill` icon container is `.software-skills-main-div` — centering it makes the icon grid the visual anchor.

- [ ] **Step 3: Build**

Run: `npm run typecheck && npx vite build`
Expected: pass, no unused-import errors.

- [ ] **Step 4: Verify**

Preview + screenshot the skills section (reuse the pattern from Task 2 Step 4, screenshot full page or scroll to `#skills`). Expected: no illustration; centered heading (`// What I do`), subtitle, centered icon grid, bullet list. Kill preview.

- [ ] **Step 5: Commit**
```bash
git add src/containers/skills/Skills.tsx src/containers/skills/Skills.scss
git commit -m "style(fokus): skills section — drop illustration, center icon grid

Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>"
```

---

### Task 4: Contact — minimal mono block

**Files:**
- Modify: `src/components/githubProfileCard/GithubProfileCard.scss` (the normally-rendered contact)
- Modify: `src/containers/contact/Contact.tsx` + `src/containers/contact/Contact.scss` (the fallback)

**Interfaces:**
- Consumes: `$mono`, `contactInfo`, `SocialMedia`. No logic changes to which component renders.

- [ ] **Step 1: GithubProfileCard skin (`GithubProfileCard.scss`)**

Restyle so the card reads minimal/mono on the dark bg (do NOT change `GithubProfileCard.tsx` markup): keep the round avatar but give it a thin accent ring; render the location and "Open for opportunities" lines in `$mono`/muted; ensure spacing is clean. Add/adjust:

```scss
.profile-image {
  border: 2px solid rgba(56, 189, 248, 0.5);
  border-radius: 50%;
}
.location-div .desc-prof,
.opp-div .desc-prof {
  font-family: $mono;
  color: $subTitle;
}
```
(Keep the rest of the existing layout; this is a skin, not a rewrite.)

- [ ] **Step 2: Remove the Lottie illustration from the fallback `Contact.tsx`**

In `src/containers/contact/Contact.tsx`, remove the `.contact-image-div` block (the `DisplayLottie`/`email`/`contactMailDark` illustration) and its now-unused imports (`illustration`, `DisplayLottie`, `email`, `contactMailDark`, `StyleContext` if no longer used — note `isDark` is used for the subtitle class, so keep `StyleContext`/`useContext`). Render the contact details (`number`, `email_address`) + `SocialMedia` as a centered mono block.

- [ ] **Step 3: Minimal mono styling in `Contact.scss`**

Make `.contact-detail` / `.contact-detail-email` use `$mono`, accent on hover, and center the `.contact-div-main` content (single column). Example:
```scss
.contact-detail,
.contact-detail-email {
  font-family: $mono;
}
.contact-detail-email:hover,
.contact-detail:hover {
  color: $buttonColor;
}
```

- [ ] **Step 4: Build + verify**

`npm run typecheck && npx vite build`, then preview + screenshot the contact area ("Reach Out to me!"). Expected: minimal mono contact, avatar with accent ring, no cartoon envelope, socials present. Kill preview.

- [ ] **Step 5: Commit**
```bash
git add src/components/githubProfileCard/GithubProfileCard.scss src/containers/contact/Contact.tsx src/containers/contact/Contact.scss
git commit -m "style(fokus): minimal mono contact, drop envelope illustration

Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>"
```

---

### Task 5: Card polish — border + hover glow + mono meta

**Files:**
- Modify: `src/components/educationCard/EducationCard.scss`
- Modify: `src/components/experienceCard/ExperienceCard.scss`
- Modify: `src/components/achievementCard/AchievementCard.scss`

**Interfaces:**
- Consumes: `$mono`, `$buttonColor`. No markup changes to the card `.tsx` files.

- [ ] **Step 1: Apply a consistent card skin to each card's root container**

For each card's main container class (open each file and identify the outermost card class — e.g. `.education-card`, `.experience-card-base` / `.experience-card`, `.certificate-card` / `.achievement-cards-base`), add a thin accent border + hover lift/glow, and render date/role/sub-label text in `$mono`. Pattern (adapt the selector to each file's actual root + meta classes):

```scss
.<card-root> {
  border: 1px solid rgba(56, 189, 248, 0.18);
  border-radius: 10px;
  transition: transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease;
}
.<card-root>:hover {
  transform: translateY(-4px);
  border-color: $buttonColor;
  box-shadow: 0 12px 30px -12px rgba(56, 189, 248, 0.35);
}
.<date-or-meta-class> {
  font-family: $mono;
}
```

Read each card SCSS first to find the correct root class and the date/role/duration class to make monospace. Do not duplicate content; only add the skin rules. If a card already has a `border`/`box-shadow`, modify it rather than adding a conflicting second declaration.

- [ ] **Step 2: Build**

Run: `npx vite build`
Expected: pass.

- [ ] **Step 3: Verify**

Preview + full-page screenshot; confirm education/experience/certification cards show the thin sky-blue border and a hover lift, with monospace dates/roles. Kill preview.

- [ ] **Step 4: Commit**
```bash
git add src/components/educationCard/EducationCard.scss src/components/experienceCard/ExperienceCard.scss src/components/achievementCard/AchievementCard.scss
git commit -m "style(fokus): card skin — accent border, hover glow, mono meta

Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>"
```

---

### Task 6: Integrated visual + accessibility verification

**Files:** none unless a regression is found (then fix in the relevant Task 1–5 file).

- [ ] **Step 1: Fresh build + preview**
```bash
npx vite build && (npx vite preview --port 4173 &) && sleep 5
```

- [ ] **Step 2: Full-page dark + mobile screenshots**

Reuse the scroll-then-screenshot pattern (Task 2/Task 1 verify). Capture desktop (1366) and mobile (390) full-page. Inspect for: cohesive dark-tech look, centered grid hero, `//` mono headings throughout, no cartoon illustrations anywhere (hero/skills/contact), minimal mono contact, cards with accent border + hover.

- [ ] **Step 3: axe color-contrast must not regress**

Run the axe scan (same approach as the light-touch verification). Expected: `color-contrast` violations count ≤ the post-light-touch baseline (0). New accent text (prompt, role `b`, mono meta) must not appear as failures. If any do, darken/adjust that specific color and note it.

- [ ] **Step 4: Light-mode smoke check**

Toggle to light mode (click the header ToggleSwitch via Playwright or evaluate) and screenshot once. Expected: hero name + body text remain readable (dark text on light bg via inherited color); accents still sky-blue. Minor imperfections acceptable; broken/invisible text is NOT — fix by ensuring those elements inherit `color` rather than hardcoding.

- [ ] **Step 5: Kill preview + clean build dir**
```bash
powershell -Command "(Get-NetTCPConnection -LocalPort 4173 -State Listen -ErrorAction SilentlyContinue).OwningProcess | Select-Object -Unique | ForEach-Object { Stop-Process -Id \$_ -Force }"
rm -rf build
```

- [ ] **Step 6: Final commit (only if Steps 2–4 forced a fix; otherwise skip)**
```bash
git add -A
git commit -m "style(fokus): finalize after visual/a11y verification

Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>"
```

---

## Self-Review

**Spec coverage:** Hero minimal+grid → Task 2. Cartoon illustrations removed (hero/skills/contact) → Tasks 2,3,4. `//` mono headings → Task 1. Skills icon-grid → Task 3. Minimal mono contact → Task 4. Card skin → Task 5. Background grid hero-only → Task 2 (`.hero` background, no global grid). Splash → inherits dark (no task needed; noted optional in spec, omitted as low-priority — explicitly out of plan scope). Verification incl. light-mode + axe → Task 6.

**Placeholder scan:** Tasks 1 & 2 contain complete code. Tasks 3–5 give complete code for the new rules plus explicit "read the file, find this class, apply this pattern" edit instructions with exact file paths — the variable parts (a card's exact root class) genuinely require reading the file and are called out as such, not hidden TODOs. Task 5's `<card-root>`/`<meta-class>` are explicit placeholders the implementer resolves by reading each card SCSS (named) — this is intentional discovery, not a missing requirement. Task 6 conditional commit is explicit.

**Type/value consistency:** `$mono` defined in Task 1, consumed in Tasks 2–5. `$buttonColor`=`#38bdf8`, `$onAccentText`=`#0e1525`, `$subTitle` used consistently. New classes (`.hero`, `.prompt`, `.cursor`, `.hero-name`, `.hero-role`, `.hero-sub`, `.hero-cta`, `.skills-single`) defined in Task 2/3 SCSS and used in the matching TSX. Heading prefix `"// "` consistent.

**Note on TDD:** Visual/SCSS change — no unit tests. Each task substitutes deterministic verification (SCSS compile, typecheck, computed-style assertions + screenshots via Playwright, axe re-scan) for red-green.
