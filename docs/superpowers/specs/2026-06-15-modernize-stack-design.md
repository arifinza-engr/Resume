# Modernisasi Stack developerFolio — Design Spec

- **Tanggal:** 2026-06-15
- **Status:** Disetujui (siap masuk tahap rencana implementasi)
- **Repo:** `developerFolio` (portfolio React)

## 1. Tujuan

Memodernisasi seluruh stack aplikasi agar sesuai standar 2026: meninggalkan
tooling/library yang sudah mati, upgrade ke versi mutakhir, dan mengkonversi
codebase ke TypeScript — tanpa mengubah arsitektur atau konten portfolio.

## 2. Kondisi saat ini

| Area | Sekarang | Masalah |
|------|----------|---------|
| Build tool | Create React App (`react-scripts` 5) | Deprecated sejak 2023, tidak dirawat |
| React | 16.10 + `ReactDOM.render` | 2 mayor di belakang React 19 |
| Animasi | `react-reveal` (14 file) | Tidak kompatibel React 18+ (lifecycle lama, `findDOMNode`) |
| Testing | Enzyme + `enzyme-adapter-react-16` | Enzyme mati, tak ada adapter React 18/19. Hanya 1 test (`App.test.js`) |
| Embed | `react-twitter-embed` | Tidak dirawat, berpotensi warn di React 19 |
| PWA | `serviceWorker.js` bawaan CRA | Pola lama |
| Data | `fetch.js` (Node, gaya global lama) tarik GitHub/Medium saat build | Perlu ESM + native fetch |
| Bahasa | JavaScript murni (0 file TS) | Target: TypeScript |

**Temuan penting:** env var `REACT_APP_*` HANYA dipakai di `fetch.js` (script Node
build-time), tidak di kode klien. Jadi migrasi env Vite nyaris tanpa risiko.

## 3. Keputusan (hasil brainstorming)

- **Build tool:** Vite
- **React:** versi 19
- **Bahasa:** migrasi ke TypeScript
- **Cakupan:** modernisasi penuh (tooling, versi, library mati, perbaikan kode)
- **Animasi:** `react-awesome-reveal` (penerus react-reveal, Intersection Observer)
- **Data fetch:** pertahankan pola pre-fetch, tulis ulang `fetch.js` jadi ESM + native fetch
- **Styling:** tetap SCSS (masih modern)

## 4. Strategi: Incremental in-place

Migrasi bertahap di repo yang sama. Aplikasi harus tetap bisa di-`build`, di-run,
dan di-commit setelah setiap fase, sehingga setiap fase bisa diverifikasi dan
di-rollback secara independen. (Alternatif big-bang rewrite & config-first ditolak
karena cakupan besar membutuhkan verifikasi bertahap.)

## 5. Fase

### Fase 0 — Persiapan
- Branch baru `chore/modernize-stack`.
- Rapikan `.gitignore` untuk artefak `build/` (tidak lagi commit build manual).

### Fase 1 — Vite + React 19 (masih JS, app harus jalan)
- Hapus `react-scripts`; tambah `vite`, `@vitejs/plugin-react`.
- `src/index.js`: ganti `ReactDOM.render` → `createRoot(...).render`.
- Pindah `public/index.html` → `index.html` root; buang `%PUBLIC_URL%`, tambah
  `<script type="module" src="/src/index.js">`.
- Konfigurasi Vite agar memuat JSX di file `.js` (esbuild loader) supaya belum perlu
  rename massal di fase ini.
- Buang `serviceWorker.js` CRA. (Opsional: `vite-plugin-pwa` bila PWA ingin
  dipertahankan — default: dilewati kecuali diminta.)
- Script: `dev` (vite), `build` (`node fetch.js && vite build`), `preview`.
- **Verifikasi:** `npm run build` sukses + dev server render normal.

### Fase 2 — Ganti library tidak kompatibel
- `react-reveal` → `react-awesome-reveal` di 14 file. Tabel pemetaan prop:
  - `<Fade bottom>` → `<Fade direction="up">`
  - `<Fade top>` → `<Fade direction="down">`
  - `<Fade left>` / `right` → `direction="left"` / `"right"`
  - `duration` tetap; `distance` tidak didukung 1:1 → hilangkan / atur via CSS bila perlu.
  - Tambah `triggerOnce` bila perilaku reveal-sekali diinginkan.
- Verifikasi kompatibilitas React 19: `react-headroom`, `lottie-react`,
  `colorthief`, `react-easy-emoji`. Update versi seperlunya.
- `react-twitter-embed`: bila gagal di React 19, fallback `react-twitter-widgets`.
- Hapus `enzyme`, `enzyme-adapter-react-16`, `react-test-renderer` (testing ditangani fase 4).
- **Verifikasi:** build + smoke-test visual tiap section beranimasi.

### Fase 3 — TypeScript
- Tambah `typescript`, `@types/react`, `@types/react-dom`, `@types/node`; buat `tsconfig.json`
  (strictness wajar, bukan ultra-strict; `allowJs` selama transisi lalu dimatikan).
- Rename `.js` → `.tsx` (komponen) / `.ts` (util/hook/data).
- Tipe: `portfolio` (shape data), `StyleContext`, `useLocalStorage`, props komponen.
- **Verifikasi:** `tsc --noEmit` bersih + build sukses.

### Fase 4 — Testing modern
- Tambah `vitest`, `@testing-library/react`, `@testing-library/jest-dom`, `jsdom`.
- Konversi `setupTests` (buang enzyme/adapter) & `App.test` (render via RTL).
- Konfig `vitest` di `vite.config`.
- **Verifikasi:** `npm test` hijau.

### Fase 5 — Tooling & cleanup
- ESLint 9 flat config + `typescript-eslint` + plugin react/react-hooks.
- Prettier 3 (update dari 2); samakan config.
- `fetch.js` → ESM + native `fetch` (Node 24); jaga fungsi GitHub/Medium tetap jalan.
- Update `README`/`env.example` (catat `VITE_`/penjelasan baru bila relevan).
- Build final + verifikasi end-to-end.

## 6. Data flow (tidak berubah)

`portfolio.ts` (config statis) → containers → components.
Opsional: `fetch.js` saat build → `public/profile.json` & `public/blogs.json` → dibaca runtime.

## 7. Risiko & mitigasi

- **Animasi tidak 1:1** → tabel pemetaan prop + verifikasi visual per section.
- **Breaking React 19** (mis. `defaultProps` di function component dihapus, `ReactDOM.render`)
  → audit & ganti dengan default parameter / `createRoot`.
- **twitter-embed inkompatibel** → fallback `react-twitter-widgets`.
- **Konversi TS memunculkan error tersembunyi** → migrasi bertahap dengan `allowJs`,
  bukan sekali jalan.

## 8. Kriteria sukses

- `npm run dev`, `npm run build`, `npm run preview`, `npm test`, `tsc --noEmit`,
  dan lint semuanya hijau.
- Tampilan & perilaku aplikasi setara versi lama (semua section + animasi + dark mode).
- Tidak ada lagi dependency mati (CRA, enzyme, react-reveal).
- Codebase TypeScript, build via Vite, React 19.
