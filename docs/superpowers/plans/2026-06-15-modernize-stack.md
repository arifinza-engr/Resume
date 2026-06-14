# Modernisasi Stack developerFolio — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Migrasi developerFolio dari Create React App + React 16 + JavaScript ke Vite + React 19 + TypeScript, mengganti library yang sudah mati, dengan aplikasi tetap berjalan di setiap fase.

**Architecture:** Migrasi incremental in-place. Arsitektur runtime tidak berubah (config `portfolio` → containers → components; data opsional dari `fetch` build-time → JSON → runtime). Yang berubah: build tool, versi React, library animasi/test, dan bahasa.

**Tech Stack:** Vite 6, React 19, TypeScript 5, react-awesome-reveal, Vitest + Testing Library, ESLint 9 (flat) + typescript-eslint, Prettier 3, SCSS.

**Catatan verifikasi:** Ini migrasi, bukan fitur baru — "test" tiap task umumnya berupa `npm run build` / `npm run dev` smoke test / `tsc --noEmit`. Tes unit nyata baru muncul di Fase 4. Commit setelah setiap task agar mudah rollback.

**Branch:** `chore/modernize-stack` (sudah dibuat). Working tree punya perubahan lama (`build/`, `package.json`, `src/portfolio.js`, dll) — biarkan, jangan di-revert.

---

## FASE 1 — Vite + React 19 (masih JS, app harus jalan)

### Task 1: Pasang Vite, buang react-scripts

**Files:**
- Modify: `package.json`

- [ ] **Step 1: Uninstall CRA & testing lama, install Vite + React 19**

```bash
npm uninstall react-scripts enzyme enzyme-adapter-react-16 react-test-renderer jest-canvas-mock @babel/plugin-proposal-private-property-in-object baseline-browser-mapping
npm install react@19 react-dom@19
npm install -D vite@6 @vitejs/plugin-react@4
```

Jika muncul konflik peer dependency (lib lama belum mendukung React 19), ulangi `npm install` yang gagal dengan tambahan `--legacy-peer-deps`. Lib bermasalah akan diganti/ditangani di Fase 2.

- [ ] **Step 2: Hapus `react-reveal` belum** — biarkan dulu (diganti Fase 2). Jangan uninstall di task ini.

- [ ] **Step 3: Commit**

```bash
git add package.json package-lock.json
git commit -m "build: install vite and react 19, remove CRA/enzyme deps"
```

### Task 2: Buat konfigurasi Vite

**Files:**
- Create: `vite.config.js`

- [ ] **Step 1: Tulis `vite.config.js`**

```js
import {defineConfig} from "vite";
import react from "@vitejs/plugin-react";

// outDir "build" dipertahankan agar `gh-pages -d build` tetap bekerja.
// loader jsx untuk file .js dipakai SEMENTARA selama Fase 1-2 (sebelum rename ke .tsx).
export default defineConfig({
  plugins: [react()],
  build: {outDir: "build"},
  server: {port: 3000, open: true},
  esbuild: {loader: "jsx", include: /src\/.*\.js$/, exclude: []},
  optimizeDeps: {
    esbuildOptions: {loader: {".js": "jsx"}}
  }
});
```

- [ ] **Step 2: Commit**

```bash
git add vite.config.js
git commit -m "build: add vite config (outDir=build, jsx-in-js loader)"
```

### Task 3: Pindahkan index.html ke root & sesuaikan untuk Vite

**Files:**
- Create: `index.html` (root)
- Delete: `public/index.html`

- [ ] **Step 1: Buat `index.html` di root proyek**

Ganti semua `%PUBLIC_URL%/` menjadi `/`, hapus `<link rel="preload">` font lama (path `/static/media/...` adalah artefak CRA yang tidak ada di Vite), dan tambah `<script type="module" src="/src/index.js">` sebelum `</body>`:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />

    <title>Resume | Arifinza Eska Nugraha</title>
    <meta name="title" content="Resume | Arifinza Eska Nugraha" />
    <meta
      name="description"
      content="Software Developer Portfolio Template that helps you showcase your work and skills as a software developer"
    />

    <meta property="og:type" content="website" />
    <meta property="og:url" content="https://developerfolio.js.org/" />
    <meta property="og:title" content="Resume | Arifinza Eska Nugraha" />
    <meta
      property="og:description"
      content="Software Developer Portfolio Template that helps you showcase your work and skills as a software developer"
    />

    <meta property="twitter:card" content="summary_large_image" />
    <meta property="twitter:url" content="https://developerfolio.js.org/" />
    <meta property="twitter:title" content="Resume | Arifinza Eska Nugraha" />
    <meta
      property="twitter:description"
      content="Software Developer Portfolio Template that helps you showcase your work and skills as a software developer"
    />

    <meta name="msapplication-TileColor" content="#603cba" />
    <meta name="theme-color" content="#6c63ff" />

    <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
    <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
    <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#885bd5" />
    <link rel="shortcut icon" href="/favicon.ico" />
    <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
    <link rel="manifest" href="/manifest.json" />

    <script
      async
      src="https://www.googletagmanager.com/gtag/js?id=UA-135618960-2"
    ></script>
    <script>
      window.dataLayer = window.dataLayer || [];
      function gtag() {
        dataLayer.push(arguments);
      }
      gtag("js", new Date());
      gtag("config", "UA-135618960-2");
    </script>

    <link
      rel="stylesheet"
      href="https://cdn.jsdelivr.net/gh/FortAwesome/Font-Awesome@5.15.4/css/all.min.css"
    />
  </head>
  <body>
    <noscript>You need to enable JavaScript to run this app.</noscript>
    <div id="root"></div>
    <script type="module" src="/src/index.js"></script>
  </body>
</html>
```

- [ ] **Step 2: Hapus `public/index.html`**

```bash
git rm public/index.html
```

- [ ] **Step 3: Commit**

```bash
git add index.html
git commit -m "build: move index.html to root for vite"
```

### Task 4: Update entrypoint ke createRoot (React 19) & buang serviceWorker

**Files:**
- Modify: `src/index.js`
- Delete: `src/serviceWorker.js`

- [ ] **Step 1: Tulis ulang `src/index.js`**

```js
import React from "react";
import {createRoot} from "react-dom/client";
import "./index.css";
import App from "./App";

const container = document.getElementById("root");
const root = createRoot(container);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
```

- [ ] **Step 2: Hapus serviceWorker CRA**

```bash
git rm src/serviceWorker.js
```

- [ ] **Step 3: Commit**

```bash
git add src/index.js
git commit -m "feat: use React 19 createRoot, remove CRA service worker"
```

### Task 5: Update scripts npm & verifikasi build Fase 1

**Files:**
- Modify: `package.json`

- [ ] **Step 1: Ganti blok `scripts`**

```json
"scripts": {
  "dev": "vite",
  "start": "node fetch.js && vite",
  "build": "node fetch.js && vite build",
  "preview": "vite preview",
  "deploy": "gh-pages -b master -d build",
  "format": "prettier --write \"./src/**/*.{js,jsx,ts,tsx,css,scss,json}\"",
  "check-format": "prettier -c \"./src/**/*.{js,jsx,ts,tsx,css,scss,json}\""
}
```

Hapus juga blok `"eslintConfig"` (akan diganti flat config di Fase 5) dan `"browserslist"` (tidak dipakai Vite).

- [ ] **Step 2: Verifikasi dev server jalan**

Run: `npm run dev`
Expected: Vite start tanpa error, buka `http://localhost:3000`, halaman portfolio render (splash → semua section). Hentikan dengan Ctrl+C.

Catatan: jika `node fetch.js` gagal karena tak ada `.env`, jalankan `npx vite` langsung untuk smoke test; data GitHub/Medium opsional.

- [ ] **Step 3: Verifikasi production build**

Run: `npm run build` (atau `npx vite build` bila tanpa `.env`)
Expected: build sukses, folder `build/` terisi `index.html` + assets.

- [ ] **Step 4: Commit**

```bash
git add package.json
git commit -m "build: switch npm scripts to vite"
```

---

## FASE 2 — Ganti library tidak kompatibel React 19

### Task 6: Ganti react-reveal → react-awesome-reveal (14 file)

**Files (semua di-modify):**
- `src/components/educationCard/EducationCard.js`
- `src/components/footer/Footer.js`
- `src/components/githubProfileCard/GithubProfileCard.js`
- `src/components/githubRepoCard/GithubRepoCard.js`
- `src/containers/achievement/Achievement.js`
- `src/containers/blogs/Blogs.js`
- `src/containers/contact/Contact.js`
- `src/containers/greeting/Greeting.js`
- `src/containers/podcast/Podcast.js`
- `src/containers/skillProgress/skillProgress.js`
- `src/containers/skills/Skills.js`
- `src/containers/StartupProjects/StartupProject.js`
- `src/containers/talks/Talks.js`
- `src/containers/workExperience/WorkExperience.js`

- [ ] **Step 1: Install library**

```bash
npm install react-awesome-reveal@4 @emotion/react@11
```

- [ ] **Step 2: Terjemahkan setiap file** dengan aturan pemetaan berikut.

Ganti import:
```js
// dari
import {Fade} from "react-reveal";
import {Fade, Slide} from "react-reveal";
// menjadi
import {Fade} from "react-awesome-reveal";
import {Fade, Slide} from "react-awesome-reveal";
```

Ganti prop arah & buang `distance` (react-awesome-reveal tidak punya `distance`; jarak diatur lewat CSS bila perlu). Tambah `triggerOnce` agar animasi berjalan sekali (perilaku mirip default react-reveal pada banyak section):

| react-reveal | react-awesome-reveal |
|---|---|
| `<Fade bottom duration={1000} distance="20px">` | `<Fade direction="up" duration={1000} triggerOnce>` |
| `<Fade bottom duration={1000} distance="40px">` | `<Fade direction="up" duration={1000} triggerOnce>` |
| `<Fade bottom duration={1000} distance="5px">` | `<Fade direction="up" duration={1000} triggerOnce>` |
| `<Fade left duration={1000}>` | `<Fade direction="left" duration={1000} triggerOnce>` |
| `<Fade right duration={1000}>` | `<Fade direction="right" duration={1000} triggerOnce>` |
| `<Slide left duration={2000}>` | `<Slide direction="left" duration={2000} triggerOnce>` |

Contoh lengkap (`src/containers/greeting/Greeting.js` baris 18):
```js
// dari
<Fade bottom duration={1000} distance="40px">
// menjadi
<Fade direction="up" duration={1000} triggerOnce>
```

Khusus `src/containers/skills/Skills.js` ada DUA Fade (`left` baris 18 & `right` baris 30) → `direction="left"` dan `direction="right"`.
Khusus `src/components/educationCard/EducationCard.js` ada `Fade left` (baris 24) dan `Slide left` (baris 67) → `direction="left"` keduanya.

Catatan layout: `react-awesome-reveal` membungkus children dengan `<div>`. Jika ada section yang layout-nya rusak (mis. grid/flex pecah), tambahkan `className` pada komponen reveal dan beri `display:contents` atau sesuaikan SCSS section tersebut.

- [ ] **Step 3: Uninstall react-reveal**

```bash
npm uninstall react-reveal
```

- [ ] **Step 4: Verifikasi**

Run: `npm run dev`
Expected: tidak ada error import; setiap section yang sebelumnya beranimasi (Greeting, Skills, Education, Experience, Projects, Achievement, Blogs, Talks, Podcast, Contact, Footer) tampil & beranimasi saat scroll. Periksa visual tiap section.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "refactor: replace react-reveal with react-awesome-reveal"
```

### Task 7: Verifikasi & perbaiki kompatibilitas library lain di React 19

**Files:**
- Modify: `src/containers/twitter-embed/twitter.js` (hanya bila perlu)
- Modify: `package.json` (bila perlu `overrides`)

- [ ] **Step 1: Update versi library yang masih dipakai**

```bash
npm install lottie-react@latest react-headroom@latest react-easy-emoji@latest colorthief@latest
```

- [ ] **Step 2: Cek `react-twitter-embed`**

Run: `npm run dev`, buka section Twitter.
Expected: timeline Twitter render tanpa error console.

Jika error / blank karena inkompatibel React 19: ganti ke `react-twitter-widgets`:
```bash
npm uninstall react-twitter-embed
npm install react-twitter-widgets@1
```
Lalu di `src/containers/twitter-embed/twitter.js` ganti penggunaan `TwitterTimelineEmbed` dengan `Timeline` dari `react-twitter-widgets`:
```js
import {Timeline} from "react-twitter-widgets";
// ...
<Timeline
  dataSource={{sourceType: "profile", screenName: twitterDetails.userName}}
  options={{height: "600"}}
/>
```

- [ ] **Step 3: Tangani peer dependency warning (bila ada)**

Jika `npm install` memunculkan error peer-deps untuk lib yang sebenarnya jalan di React 19, tambahkan `overrides` di `package.json`:
```json
"overrides": {
  "react": "$react",
  "react-dom": "$react-dom"
}
```
lalu `npm install` ulang.

- [ ] **Step 4: Verifikasi build penuh**

Run: `npm run build`
Expected: build sukses tanpa error.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "build: update libs for React 19 compatibility"
```

---

## FASE 3 — Migrasi TypeScript

### Task 8: Setup TypeScript

**Files:**
- Create: `tsconfig.json`
- Create: `src/vite-env.d.ts`
- Modify: `package.json` (script `typecheck`)

- [ ] **Step 1: Install TypeScript & types**

```bash
npm install -D typescript@5 @types/react@19 @types/react-dom@19 @types/node
```

- [ ] **Step 2: Buat `tsconfig.json`** (strict, tapi `noImplicitAny:false` selama migrasi agar rename bertahap tetap hijau; diketatkan di Task 12)

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "moduleDetection": "force",
    "noEmit": true,
    "jsx": "react-jsx",
    "strict": true,
    "noImplicitAny": false,
    "noUnusedLocals": false,
    "noUnusedParameters": false,
    "allowJs": true,
    "esModuleInterop": true,
    "forceConsistentCasingInFileNames": true
  },
  "include": ["src", "vite.config.js"]
}
```

- [ ] **Step 3: Buat `src/vite-env.d.ts`**

```ts
/// <reference types="vite/client" />
```

- [ ] **Step 4: Tambah script typecheck di `package.json`**

```json
"typecheck": "tsc --noEmit"
```

- [ ] **Step 5: Commit**

```bash
git add tsconfig.json src/vite-env.d.ts package.json
git commit -m "build: add typescript config"
```

### Task 9: Konversi file inti (context, hook, util, data) ke TS bertipe

**Files:**
- Rename+modify: `src/contexts/StyleContext.js` → `src/contexts/StyleContext.tsx`
- Rename+modify: `src/hooks/useLocalStorage.js` → `src/hooks/useLocalStorage.ts`
- Rename+modify: `src/utils.js` → `src/utils.ts`
- Rename+modify: `src/portfolio.js` → `src/portfolio.ts`

- [ ] **Step 1: `StyleContext.tsx`** — beri tipe context

```tsx
import React from "react";

export interface StyleContextType {
  isDark: boolean;
  changeTheme: () => void;
}

const StyleContext = React.createContext<StyleContextType>({
  isDark: false,
  changeTheme: () => {}
});

export const StyleProvider = StyleContext.Provider;
export const StyleConsumer = StyleContext.Consumer;

export default StyleContext;
```

- [ ] **Step 2: `useLocalStorage.ts`** — baca isi lama dulu, lalu tipekan generic. Pola:

```ts
import {useState} from "react";

export function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, (value: T | ((val: T) => T)) => void] {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? (JSON.parse(item) as T) : initialValue;
    } catch (error) {
      console.log(error);
      return initialValue;
    }
  });

  const setValue = (value: T | ((val: T) => T)) => {
    try {
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.log(error);
    }
  };

  return [storedValue, setValue];
}
```
Pastikan tetap kompatibel dengan pemakaian di `Main` (`const [isDark, setIsDark] = useLocalStorage("isDark", darkPref.matches)`).

- [ ] **Step 3: `utils.ts`** — baca isi lama, beri tipe parameter/return. Isi file kecil (159 byte); tambahkan anotasi tipe pada fungsi yang ada.

- [ ] **Step 4: `portfolio.ts`** — cukup rename. TypeScript meng-infer tipe object literal secara otomatis; tidak perlu interface manual. Pastikan semua `export const ...` tetap sama.

- [ ] **Step 5: Verifikasi**

Run: `npm run typecheck` lalu `npm run dev`
Expected: typecheck tanpa error pada file ini; app jalan normal.

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "refactor: convert core context/hook/util/data to typescript"
```

### Task 10: Konversi entrypoint, App, dan komponen leaf ke .tsx

**Files (rename `.js`→`.tsx`, kecuali yang disebut):**
- `src/index.js` → `src/index.tsx`
- `src/App.js` → `src/App.tsx`
- Semua di `src/components/**/*.js` → `.tsx` (15 file: ToggleSwitch, achievementCard, blogCard, button, displayLottie, educationCard, experienceCard, footer, githubProfileCard, githubRepoCard, header, socialMedia, softwareSkills, talkCard)

- [ ] **Step 1: Rename file** (gunakan `git mv` agar history terjaga), contoh:

```bash
git mv src/index.js src/index.tsx
git mv src/App.js src/App.tsx
git mv src/components/button/Button.js src/components/button/Button.tsx
# ...ulangi untuk semua komponen
```

- [ ] **Step 2: Update referensi entry di `index.html`**

```html
<script type="module" src="/src/index.tsx"></script>
```

- [ ] **Step 3: Tambah tipe props per komponen.** Aturan: untuk setiap komponen yang menerima props, tambahkan `interface` dan anotasikan. Contoh lengkap konversi `src/components/button/Button.tsx`:

```tsx
import React from "react";
import "./Button.scss";

interface ButtonProps {
  text: string;
  href?: string;
  newTab?: boolean;
  className?: string;
}

export default function Button({text, className, href, newTab}: ButtonProps) {
  return (
    <div className={className}>
      <a
        className="main-button"
        href={href}
        target={newTab ? "_blank" : undefined}
        rel="noreferrer"
      >
        {text}
      </a>
    </div>
  );
}
```
Sesuaikan field interface dengan props yang BENAR-BENAR dipakai tiap komponen (baca isinya). Karena `tsconfig` masih `noImplicitAny:false`, props yang belum ditipekan tidak menggagalkan build — tetapi tipekan minimal komponen sederhana di task ini.

- [ ] **Step 4: Verifikasi**

Run: `npm run typecheck && npm run dev`
Expected: typecheck hijau; app render normal; tidak ada warning import yang hilang.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "refactor: convert App and components to tsx"
```

### Task 11: Konversi containers ke .tsx & matikan jsx-in-js loader

**Files:**
- Semua `src/containers/**/*.js` → `.tsx` (19 file termasuk `Main.js`, `twitter.js`, `Top.js`, `Loading.js`, `SplashScreen.js`, dan section container lainnya)
- Modify: `vite.config.js` (hapus loader sementara)

- [ ] **Step 1: Rename semua container** dengan `git mv ... .tsx`.

- [ ] **Step 2: Tipekan props container** yang menerima props (mis. card list mapping). Banyak container tidak menerima props (mengambil dari `portfolio`) → cukup rename. Untuk yang menerima props, tambahkan `interface` seperti pola Task 10.

- [ ] **Step 3: Hapus loader sementara di `vite.config.js`** (sekarang semua file sudah `.tsx`/`.ts`, tidak ada lagi JSX dalam `.js`):

```js
import {defineConfig} from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  build: {outDir: "build"},
  server: {port: 3000, open: true}
});
```

- [ ] **Step 4: Verifikasi**

Run: `npm run typecheck && npm run build`
Expected: typecheck hijau; build sukses; `npm run dev` render seluruh halaman.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "refactor: convert containers to tsx, drop jsx-in-js loader"
```

### Task 12: Ketatkan TypeScript

**Files:**
- Modify: `tsconfig.json`

- [ ] **Step 1: Set `noImplicitAny: true`** (hapus baris `"noImplicitAny": false`).

- [ ] **Step 2: Jalankan typecheck & perbaiki error**

Run: `npm run typecheck`
Expected awal: kemungkinan muncul error `implicit any` pada props/parameter yang belum ditipekan. Perbaiki dengan menambah `interface`/anotasi pada file terkait (pola Task 10). Ulangi hingga hijau.

- [ ] **Step 3: Verifikasi build**

Run: `npm run build`
Expected: sukses.

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "refactor: enable noImplicitAny and finish typing"
```

---

## FASE 4 — Testing modern (Vitest + Testing Library)

### Task 13: Setup Vitest & konversi test

**Files:**
- Modify: `vite.config.js` → rename `vite.config.ts` + tambah blok `test`
- Rename+rewrite: `src/setupTests.js` → `src/setupTests.ts`
- Rename+rewrite: `src/App.test.js` → `src/App.test.tsx`

- [ ] **Step 1: Install**

```bash
npm install -D vitest@2 @testing-library/react@16 @testing-library/jest-dom@6 @testing-library/dom@10 jsdom@25
```

- [ ] **Step 2: Rename & lengkapi `vite.config.ts`**

```bash
git mv vite.config.js vite.config.ts
```
Isi:
```ts
/// <reference types="vitest/config" />
import {defineConfig} from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  build: {outDir: "build"},
  server: {port: 3000, open: true},
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./src/setupTests.ts"
  }
});
```
Update juga `tsconfig.json` `include` menjadi `["src", "vite.config.ts"]`.

- [ ] **Step 3: Tulis `src/setupTests.ts`** (buang enzyme; sediakan mock `matchMedia` yang dipakai `Main`)

```ts
import "@testing-library/jest-dom";
import {vi} from "vitest";

Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: vi.fn().mockImplementation((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn()
  }))
});
```

- [ ] **Step 4: Tulis `src/App.test.tsx`**

```tsx
import {render} from "@testing-library/react";
import {describe, it} from "vitest";
import App from "./App";

describe("App", () => {
  it("renders without crashing", () => {
    render(<App />);
  });
});
```

- [ ] **Step 5: Tambah script test di `package.json`**

```json
"test": "vitest run",
"test:watch": "vitest"
```

- [ ] **Step 6: Verifikasi**

Run: `npm test`
Expected: 1 test PASS. Jika `App` gagal render karena dependency eksternal (mis. lottie/twitter) di jsdom, mock modul tersebut di `setupTests.ts` atau gunakan `vi.mock`.

- [ ] **Step 7: Commit**

```bash
git add -A
git commit -m "test: migrate to vitest + testing-library"
```

---

## FASE 5 — Tooling & cleanup

### Task 14: ESLint 9 flat config + Prettier 3

**Files:**
- Create: `eslint.config.js`
- Modify: `package.json` (script `lint`, prettier 3)
- Delete: `.eslintConfig` (sudah dihapus dari package.json di Task 5)

- [ ] **Step 1: Install**

```bash
npm install -D eslint@9 @eslint/js typescript-eslint@8 eslint-plugin-react-hooks@5 eslint-plugin-react-refresh@0.4 globals prettier@3
```

- [ ] **Step 2: Buat `eslint.config.js`**

```js
import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";

export default tseslint.config(
  {ignores: ["build", "node_modules", "src/assets"]},
  {
    files: ["**/*.{ts,tsx}"],
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    languageOptions: {
      ecmaVersion: 2022,
      globals: {...globals.browser}
    },
    plugins: {
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      "react-refresh/only-export-components": [
        "warn",
        {allowConstantExport: true}
      ],
      "@typescript-eslint/no-explicit-any": "off"
    }
  }
);
```

- [ ] **Step 3: Tambah script lint**

```json
"lint": "eslint . --max-warnings=0"
```

- [ ] **Step 4: Verifikasi & perbaiki**

Run: `npm run lint`
Expected: jalan tanpa error fatal. Perbaiki error yang muncul (umumnya unused vars, dependency hook). Untuk warning yang tak relevan migrasi, sesuaikan rule atau perbaiki.

- [ ] **Step 5: Format ulang**

```bash
npm run format
```

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "chore: add eslint 9 flat config, prettier 3, reformat"
```

### Task 15: Modernisasi fetch.js → ESM + native fetch

**Files:**
- Rename+rewrite: `fetch.js` → `fetch.mjs`
- Modify: `package.json` (script `start`/`build` referensi `fetch.mjs`)

- [ ] **Step 1: Tulis `fetch.mjs`** (ESM, native `fetch`, async/await; pertahankan logika GitHub GraphQL + Medium RSS yang sama)

```js
import {writeFile} from "node:fs/promises";
import "dotenv/config";

const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN;
const GITHUB_USERNAME = process.env.GITHUB_USERNAME;
const USE_GITHUB_DATA = process.env.USE_GITHUB_DATA;
const MEDIUM_USERNAME = process.env.MEDIUM_USERNAME;

const ERR = {
  noUserName:
    "Github Username was found to be undefined. Please set all relevant environment variables.",
  requestFailed:
    "The request to GitHub didn't succeed. Check if GitHub token in your .env file is correct.",
  requestFailedMedium:
    "The request to Medium didn't succeed. Check if Medium username in your .env file is correct."
};

async function fetchGithub() {
  if (USE_GITHUB_DATA !== "true") return;
  if (!GITHUB_USERNAME) throw new Error(ERR.noUserName);

  console.log(`Fetching profile data for ${GITHUB_USERNAME}`);
  const query = `
{
  user(login:"${GITHUB_USERNAME}") {
    name bio avatarUrl location
    pinnedItems(first: 6, types: [REPOSITORY]) {
      totalCount
      edges { node { ... on Repository {
        name description forkCount
        stargazers { totalCount }
        url id diskUsage
        primaryLanguage { name color }
      } } }
    }
  }
}`;

  const res = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${GITHUB_TOKEN}`,
      "User-Agent": "Node",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({query})
  });
  if (!res.ok) throw new Error(ERR.requestFailed);
  const data = await res.text();
  await writeFile("./public/profile.json", data);
  console.log("saved file to public/profile.json");
}

async function fetchMedium() {
  if (!MEDIUM_USERNAME) return;
  console.log(`Fetching Medium blogs data for ${MEDIUM_USERNAME}`);
  const res = await fetch(
    `https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@${MEDIUM_USERNAME}`
  );
  if (!res.ok) throw new Error(ERR.requestFailedMedium);
  const data = await res.text();
  await writeFile("./public/blogs.json", data);
  console.log("saved file to public/blogs.json");
}

await Promise.all([fetchGithub(), fetchMedium()]);
```

- [ ] **Step 2: Hapus `fetch.js`, update scripts**

```bash
git rm fetch.js
```
Update `package.json`:
```json
"start": "node fetch.mjs && vite",
"build": "node fetch.mjs && vite build",
```

- [ ] **Step 3: Verifikasi**

Run: `node fetch.mjs` (dengan `.env` terisi) → menulis `public/profile.json`. Tanpa `.env`, script keluar tanpa menulis (tidak error fatal selama env kosong → `USE_GITHUB_DATA` undefined & `MEDIUM_USERNAME` undefined).

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "refactor: modernize fetch script to esm + native fetch"
```

### Task 16: Cleanup akhir, .gitignore, dokumentasi, verifikasi end-to-end

**Files:**
- Modify: `.gitignore`
- Modify: `env.example` (bila perlu klarifikasi)
- Modify: `README.md` (buat bila tidak ada — catat stack & perintah baru)

- [ ] **Step 1: Pastikan `.gitignore` mengabaikan artefak build**

Tambahkan bila belum ada:
```
node_modules
build
dist
.env
*.local
```
Catatan: `build/` saat ini di-commit untuk gh-pages. Jika ingin tetap deploy via gh-pages branch `master`, `gh-pages` membuat branch terpisah — `build/` tidak perlu di-commit ke `main`. Hapus tracking lama: `git rm -r --cached build` (opsional, konfirmasi dulu karena ada di working tree).

- [ ] **Step 2: Tulis/Update `README.md`** dengan stack baru & perintah:

```markdown
## Stack
Vite 6 · React 19 · TypeScript 5 · SCSS · react-awesome-reveal · Vitest

## Scripts
- `npm run dev` — dev server (http://localhost:3000)
- `npm run build` — fetch data (opsional) + production build ke `build/`
- `npm run preview` — preview hasil build
- `npm test` — unit test (Vitest)
- `npm run typecheck` — `tsc --noEmit`
- `npm run lint` — ESLint
- `npm run format` — Prettier

## Konfigurasi data (opsional)
Salin `env.example` → `.env`, isi token GitHub/username Medium untuk fitur fetch.
```

- [ ] **Step 3: Verifikasi end-to-end (semua hijau)**

Run berurutan:
```bash
npm run typecheck
npm run lint
npm test
npm run build
npm run preview
```
Expected: semua sukses; `preview` menampilkan portfolio lengkap (splash, semua section, animasi, dark mode toggle).

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "chore: finalize modernization (gitignore, docs, verification)"
```

---

## Self-Review (sudah dijalankan saat penulisan)

- **Spec coverage:** Fase 1–5 plan memetakan 1:1 ke Fase 0–5 spec (Vite ✔ Task 1-5, React 19 createRoot ✔ Task 4, react-awesome-reveal ✔ Task 6, lib lain ✔ Task 7, TypeScript ✔ Task 8-12, Vitest ✔ Task 13, ESLint/Prettier ✔ Task 14, fetch.mjs ✔ Task 15, docs/cleanup ✔ Task 16). Branch (Fase 0) sudah dibuat sebelum plan.
- **Placeholder scan:** tidak ada TBD/TODO; semua config & file kustom ditulis lengkap; konversi massal diberi aturan + contoh kerja penuh.
- **Konsistensi tipe:** `StyleContextType`, `useLocalStorage<T>` signature, `ButtonProps` konsisten lintas task; nama script (`dev/build/test/typecheck/lint/format`) konsisten.

## Catatan eksekusi
- Aplikasi harus tetap render setelah setiap Fase; jika sebuah Task memecah build, selesaikan sebelum lanjut.
- Risiko tertinggi: Task 6 (layout animasi) & Task 12 (error tipe). Alokasikan waktu verifikasi visual ekstra di sana.
