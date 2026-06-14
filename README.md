# developerFolio

A software developer portfolio, modernized to a current stack.

## Stack
- **Vite 6** (build tool / dev server)
- **React 19**
- **TypeScript 5** (strict)
- **SCSS** for styling
- **react-awesome-reveal** for scroll animations
- **Vitest** + **Testing Library** for tests
- **ESLint 9** (flat config) + **Prettier 3**

## Scripts
| Command | Description |
|---------|-------------|
| `npm start` | Fetch live GitHub/Medium data (needs .env) then start the dev server |
| `npm run dev` | Start the dev server at http://localhost:3000 (no data fetch) |
| `npm run build` | Fetch optional data + production build into `build/` |
| `npm run preview` | Preview the production build locally |
| `npm test` | Run unit tests (Vitest) |
| `npm run typecheck` | Type-check with `tsc --noEmit` |
| `npm run lint` | Lint with ESLint |
| `npm run format` | Format with Prettier |

## Optional GitHub / Medium data
Copy `env.example` to `.env` and fill in your values to enable the build-time
fetch of GitHub profile data and Medium blog posts:
- `REACT_APP_GITHUB_TOKEN`, `GITHUB_USERNAME`, `USE_GITHUB_DATA=true`
- `MEDIUM_USERNAME`

Without a `.env`, the app still builds and runs using the static data in `src/portfolio.ts`.

## Editing your portfolio
All content lives in `src/portfolio.ts`.
