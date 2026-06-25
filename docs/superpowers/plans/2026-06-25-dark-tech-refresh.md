# Dark-Tech Light-Touch Refresh Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Give the portfolio a dark-tech / engineer look via three low-risk changes — dark theme by default, a sky-blue accent replacing the purple, and a monospace logo — without touching layout, sections, or illustrations.

**Architecture:** Pure styling/config change. All accent color lives in one SCSS variables file (`src/_globalColor.scss`); the theme default is one line in `Main.tsx`; the logo font is one rule in `Header.scss`; browser/PWA chrome colors are in `index.html` and `public/manifest.json`. No new dependencies, no new network requests.

**Tech Stack:** Vite 6, React 19, TypeScript, SCSS (Sass), Playwright (verification), axe-core (a11y verification).

## Global Constraints

- Light/dark toggle MUST remain functional; only the **default** flips to dark.
- No new web-font network request — logo uses a system monospace stack.
- Accent: `#38BDF8`; accent hover/deeper: `#0EA5E9`; on-accent text: `#0E1525`; dark bg: `#171C28`.
- All hex values written lowercase in SCSS to match existing file style.
- No layout, section, or illustration changes (light-touch scope).
- Verification uses `vite preview --port 4173` (keep ports 3000/3001 free for the user's other app); kill the preview server after each verification.
- `npm run typecheck`, `npm run lint` (0 errors), and `npx vite build` MUST pass before each commit.

---

### Task 1: Recolor accent to sky blue

**Files:**
- Modify: `src/_globalColor.scss` (lines 6, 7, 22, 31, 63, 72, 77; add one new token)
- Modify: `src/components/button/Button.scss` (lines 6, 22, 23)

**Interfaces:**
- Produces: SCSS variable `$onAccentText: #0e1525;` (new), consumed by `Button.scss`. Accent value `#38bdf8` now carried by `$buttonColor`, `$skillsColor`, `$progressBarSpanBG`, `$githubProfileCardBorder`, `$toggleCheck`.

- [ ] **Step 1: Edit the accent variables in `src/_globalColor.scss`**

Change these exact lines:

```scss
// button colors
$buttonColor: #38bdf8;
$buttonHover: #0ea5e9;
$topButtonHover: #000;
$onAccentText: #0e1525;
```

(`$buttonColor` was `#55198b`, `$buttonHover` was `#8c43ce`; the `$onAccentText` line is new, added right after `$topButtonHover`.)

```scss
// toggle switch colors
$toggleCheck: #38bdf8;
```

(was `#2196f3`)

```scss
$githubProfileCardBorder: #38bdf8;
```

(was `#6c63ff`)

```scss
$educationCardBorder: rgba(56, 189, 248, 0.45);
```

(was `#a9a7f9`)

```scss
$progressBarSpanBG: #38bdf8;
```

(was `#aaa5ff`)

```scss
$skillsColor: #38bdf8;
```

(was `#645beb`)

- [ ] **Step 2: Update button text + hover in `src/components/button/Button.scss`**

`.main-button` — change line 6:

```scss
  color: $onAccentText;
```

(was `color: $textColorDark;`)

`.main-button:hover` — change lines 22–23 so the button darkens instead of inverting to a low-contrast white:

```scss
.main-button:hover {
  background-color: $buttonHover;
  color: $onAccentText;
  transition: all 0.3s ease 0s;
  transform: translateY(-3px);
}
```

(was `background-color: $darkBoxShadow2;` and `color: $buttonColor;`)

- [ ] **Step 3: Verify no purple accent values remain**

Run:

```bash
grep -rinE "#6c63ff|#55198b|#8c43ce|#a9a7f9|#aaa5ff|#645beb|#603cba" src/
```

Expected: **no output** (empty). If anything prints, replace that occurrence with the sky-blue equivalent.

- [ ] **Step 4: Build to verify SCSS compiles**

Run:

```bash
npx vite build
```

Expected: `✓ built in …` with no Sass errors.

- [ ] **Step 5: Commit**

```bash
git add src/_globalColor.scss src/components/button/Button.scss
git commit -m "style: replace purple accent with sky-blue (#38bdf8)

Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>"
```

---

### Task 2: Dark theme by default + matching browser/PWA chrome

**Files:**
- Modify: `src/containers/Main.tsx` (lines 25–26)
- Modify: `index.html` (lines 42–43)
- Modify: `public/manifest.json` (`theme_color`, `background_color`)

**Interfaces:**
- Consumes: nothing from Task 1.
- Produces: theme default `isDark = true`; no new symbols.

- [ ] **Step 1: Flip the default theme in `src/containers/Main.tsx`**

Replace lines 25–26:

```tsx
  const [isDark, setIsDark] = useLocalStorage("isDark", true);
```

This removes the `const darkPref = window.matchMedia("(prefers-color-scheme: dark)");` line entirely (it becomes unused) and changes the `useLocalStorage` default from `darkPref.matches` to `true`. The toggle and `useLocalStorage` persistence are otherwise unchanged.

- [ ] **Step 2: Update browser chrome colors in `index.html`**

Change lines 42–43:

```html
    <meta name="msapplication-TileColor" content="#171C28" />
    <meta name="theme-color" content="#171C28" />
```

(were `#603cba` and `#6c63ff`)

- [ ] **Step 3: Update PWA colors in `public/manifest.json`**

Change these two values:

```json
  "theme_color": "#171C28",
  "background_color": "#171C28"
```

(were `#6c63ff` and `#ffffff`)

- [ ] **Step 4: Typecheck (catches the unused `darkPref` if not removed)**

Run:

```bash
npm run typecheck
```

Expected: no output / no errors. (TypeScript `noUnusedLocals` would flag a leftover `darkPref`.)

- [ ] **Step 5: Lint**

Run:

```bash
npm run lint
```

Expected: `0 errors` (one pre-existing `react-refresh` warning in `StyleContext.tsx` is acceptable).

- [ ] **Step 6: Verify dark-by-default visually**

Start preview and screenshot with a CLEARED localStorage (fresh visitor):

```bash
npx vite build && (npx vite preview --port 4173 &) && sleep 5
```

Create `/tmp/dark-default.py`:

```python
from playwright.sync_api import sync_playwright
with sync_playwright() as p:
    ctx = p.chromium.launch().new_context(viewport={"width":1280,"height":760})
    page = ctx.new_page()
    page.goto("http://localhost:4173/", wait_until="load")
    page.wait_for_timeout(2500)
    bg = page.evaluate("getComputedStyle(document.querySelector('.dark-mode') || document.body).backgroundColor")
    print("BG:", bg)
    page.screenshot(path="/tmp/dark-default.png")
```

Run: `python /tmp/dark-default.py`
Expected: a dark background reported (rgb close to `23, 28, 40`), and `/tmp/dark-default.png` shows the page in dark mode on load. Then kill preview:

```bash
powershell -Command "(Get-NetTCPConnection -LocalPort 4173 -State Listen -ErrorAction SilentlyContinue).OwningProcess | Select-Object -Unique | ForEach-Object { Stop-Process -Id \$_ -Force }"
```

- [ ] **Step 7: Commit**

```bash
git add src/containers/Main.tsx index.html public/manifest.json
git commit -m "style: default to dark theme + match browser/PWA chrome

Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>"
```

---

### Task 3: Monospace logo

**Files:**
- Modify: `src/components/header/Header.scss` (line ~64)

**Interfaces:**
- Consumes/produces: nothing shared.

- [ ] **Step 1: Change the logo font in `src/components/header/Header.scss`**

In the `.header .logo-name` rule, replace:

```scss
.header .logo-name {
  font-family: "JetBrains Mono", "Fira Code", "SF Mono", Consolas,
    "Liberation Mono", monospace;
}
```

(was `font-family: "Agustina Regular";`) Keep every other property in that rule unchanged. The `< {username} />` markup in `Header.tsx` stays as-is.

- [ ] **Step 2: Build**

Run: `npx vite build`
Expected: `✓ built in …`, no errors.

- [ ] **Step 3: Verify the logo renders monospace**

```bash
(npx vite preview --port 4173 &) && sleep 5
```

Create `/tmp/logo.py`:

```python
from playwright.sync_api import sync_playwright
with sync_playwright() as p:
    page = p.chromium.launch().new_context(viewport={"width":1280,"height":300}).new_page()
    page.goto("http://localhost:4173/", wait_until="load")
    page.wait_for_timeout(2500)
    fam = page.evaluate("getComputedStyle(document.querySelector('.logo-name')).fontFamily")
    print("LOGO FONT:", fam)
    page.locator("header").screenshot(path="/tmp/logo.png")
```

Run: `python /tmp/logo.py`
Expected: `LOGO FONT:` includes a monospace family (e.g. `"JetBrains Mono"`/`Consolas`/`monospace`), and `/tmp/logo.png` shows `< Arifinza Eska Nugraha />` in monospace. Kill preview (same command as Task 2 Step 6).

- [ ] **Step 4: Adjust spacing only if needed**

If the monospace logo overflows or looks cramped in the header screenshot, add to the same rule (otherwise skip):

```scss
  font-size: 1.1rem;
  letter-spacing: -0.5px;
```

Re-run Step 3 to confirm. (Skip this step entirely if the logo already looks fine.)

- [ ] **Step 5: Commit**

```bash
git add src/components/header/Header.scss
git commit -m "style: switch logo to monospace font

Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>"
```

---

### Task 4: Integrated visual + accessibility verification

**Files:**
- None modified unless a regression is found (then fix in the relevant file from Tasks 1–3).

**Interfaces:**
- Consumes: the built output from Tasks 1–3.

- [ ] **Step 1: Fresh build + preview**

```bash
npx vite build && (npx vite preview --port 4173 &) && sleep 5
```

- [ ] **Step 2: Capture dark (default), light (toggled), and mobile screenshots**

Create `/tmp/verify-refresh.py`:

```python
from playwright.sync_api import sync_playwright
import json
with sync_playwright() as p:
    b = p.chromium.launch()
    # dark default desktop
    page = b.new_context(viewport={"width":1366,"height":900}).new_page()
    page.goto("http://localhost:4173/", wait_until="load")
    page.wait_for_timeout(2800)
    # scroll to trigger reveals
    h = page.evaluate("document.body.scrollHeight")
    for y in range(0, h, 600):
        page.evaluate(f"window.scrollTo(0,{y})"); page.wait_for_timeout(150)
    page.evaluate("window.scrollTo(0,0)"); page.wait_for_timeout(400)
    page.screenshot(path="/tmp/refresh-dark.png", full_page=True)
    # button colors sanity
    btn = page.evaluate("""() => { const b=document.querySelector('.main-button');
        const s=getComputedStyle(b); return {bg:s.backgroundColor, color:s.color}; }""")
    print("BUTTON:", json.dumps(btn))
    # toggle to light
    page.click(".react-toggle, .switch, input[type=checkbox]#switch", timeout=3000) if False else None
    b.close()
```

Run: `python /tmp/verify-refresh.py`
Expected: `BUTTON:` shows `bg` ≈ `rgb(56, 189, 248)` and `color` ≈ `rgb(14, 21, 37)` (dark text on sky-blue). `/tmp/refresh-dark.png` shows the full page dark with sky-blue accents on buttons, skill bars, and card borders. Inspect the screenshot and confirm the Lottie illustrations still read acceptably on the dark background.

- [ ] **Step 3: Re-run axe color-contrast (must not regress)**

Reuse the existing audit approach. Create `/tmp/axe-refresh.py`:

```python
from playwright.sync_api import sync_playwright
import json
with sync_playwright() as p:
    page = p.chromium.launch().new_context(viewport={"width":1366,"height":900}).new_page()
    page.goto("http://localhost:4173/", wait_until="load")
    page.wait_for_timeout(2800)
    page.add_script_tag(url="https://cdnjs.cloudflare.com/ajax/libs/axe-core/4.10.2/axe.min.js")
    page.wait_for_timeout(800)
    res = page.evaluate("""async () => { const r = await axe.run();
        return r.violations.map(v=>({id:v.id, impact:v.impact, n:v.nodes.length})); }""")
    print("AXE:", json.dumps(res))
```

Run: `python /tmp/axe-refresh.py`
Expected: the `color-contrast` violation count is **not higher** than the pre-refresh baseline (20). The buttons must NOT appear as new contrast failures (dark-on-sky-blue passes). If button text shows up as a new failure, revisit Task 1 Step 2.

- [ ] **Step 4: Kill preview server**

```bash
powershell -Command "(Get-NetTCPConnection -LocalPort 4173 -State Listen -ErrorAction SilentlyContinue).OwningProcess | Select-Object -Unique | ForEach-Object { Stop-Process -Id \$_ -Force }"
```

- [ ] **Step 5: Clean build artifacts (not committed)**

```bash
rm -rf build
```

- [ ] **Step 6: Final commit (only if Step 2/3 required a fix; otherwise skip)**

```bash
git add -A
git commit -m "style: finalize dark-tech refresh after visual/a11y verification

Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>"
```

---

## Self-Review

**Spec coverage:**
- Dark by default → Task 2 ✓
- theme-color / msapplication-TileColor / manifest → Task 2 ✓
- Accent recolor (7 variables + `$onAccentText`) → Task 1 ✓
- Button text + hover redesign → Task 1 ✓
- Monospace logo → Task 3 ✓
- Verification (build, screenshots dark/mobile, axe contrast, Lottie-on-dark check) → Task 4 ✓
- Light mode still works → toggle untouched (Task 2 Step 1 note); spot-check during Task 4.

**Placeholder scan:** No TBD/TODO. Task 3 Step 4 ("adjust only if needed") and Task 4 Step 6 ("only if a fix was needed") are explicit conditional steps with concrete code, not placeholders.

**Type/value consistency:** `$onAccentText` defined in Task 1 Step 1, consumed in Task 1 Step 2 — same name. Accent `#38bdf8` and `#0e1525` used consistently across `_globalColor.scss`, `Button.scss`, and verification expectations. Dark bg `#171C28` consistent across `Main.tsx` default, `index.html`, `manifest.json`.

**Note on TDD:** This is a visual/config change with no meaningful unit test. Each task substitutes deterministic verification (SCSS compile, typecheck/lint, computed-style assertions via Playwright, axe re-scan) for the red-green test cycle.
