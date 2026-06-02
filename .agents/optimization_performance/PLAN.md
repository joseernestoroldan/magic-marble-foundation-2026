# Performance Optimization Plan — Magic Marble Foundation

Based on Vercel React Best Practices (70 rules, 8 categories, prioritized by impact).

---

## Priority 1: Eliminating Waterfalls (CRITICAL)

### P1.1 — Parallelize Sanity fetches in `app/paddyfield/page.tsx`
- **Current:** `getAllPaddyField()` then `getAllRecipes()` sequentially
- **Fix:** Wrap both in `Promise.all()`
- **Rule:** `async-parallel`

### P1.2 — Parallelize home page fetches (already mitigated)
- Home page already uses `<Suspense>` boundaries around `MagicDiaries` and `OurProjects`
- RSC streams past Suspense boundaries, starting fetches in parallel
- **Status:** No change needed

### P1.3 — Deduplicate SSG detail page fetches
- Pages: `diaries/[id]`, `projects/[_id]`, `gallery/[id]`, `paddyfield/paddy/[id]`, `paddyfield/recipes/[id]`
- Both `generateMetadata` and the page component call the same `getById()` Sanity query
- **Fix:** Wrap Sanity fetch functions with `React.cache()` in `client.ts`
- **Rule:** `async-parallel` + `server-cache-react`

---

## Priority 2: Bundle Size Optimization (CRITICAL)

### P2.1 — Replace `googleapis` (~30MB) with direct `fetch()`
- **File:** `app/api/documents/route.ts`
- Only used to list files in one Google Drive folder
- **Fix:** Replace with raw HTTPS requests using service account JWT + Drive API REST
- **Rule:** `bundle-dynamic-imports`

### P2.2 — Replace or dynamic-import `recharts` (~500KB+)
- **File:** `components/Financials/Charts.tsx`
- Only a single pie chart with 3 categories
- **Fix:** Dynamic import with `next/dynamic` with `ssr: false`, or replace with lightweight SVG
- **Rule:** `bundle-dynamic-imports`

### P2.3 — Remove `axios` (~30KB)
- Used in PayPal API routes and Google Drive proxy
- **Fix:** Replace with native `fetch()` (Node 18+ built-in)
- **Files:** `app/api/AccessToken.ts`, `app/api/create-subscription/route.ts`, `app/api/create-plan/route.ts`, `app/api/cancel-subscription/route.ts`, `lib/apiCalls.ts`
- **Rule:** `bundle-barrel-imports`

### P2.4 — Add `optimizePackageImports` for `lucide-react`
- **File:** `next.config.mjs`
- Currently only `react-icons` is configured
- **Fix:** Add `"lucide-react"` to `experimental.optimizePackageImports`
- **Rule:** `bundle-barrel-imports`

### P2.5 — Lazy-load `countries.ts` (~2386 lines)
- **File:** `components/auth/Register/RegisterForm/RegisterForm.tsx`
- Large static data imported into client component
- **Fix:** Load on demand when country field is focused, or use search-as-you-type
- **Rule:** `bundle-dynamic-imports`

---

## Priority 3: Server-Side Performance (HIGH)

### P3.1 — Add ISR (`revalidate`) to SSG pages
- All 5 `generateStaticParams` pages lack `revalidate` — content changes require full rebuild
- **Fix:** Add `export const revalidate = 3600;` to each SSG page
- **Pages:**
  - `app/diaries/[id]/page.tsx`
  - `app/projects/[_id]/page.tsx`
  - `app/gallery/[id]/page.tsx`
  - `app/paddyfield/paddy/[id]/page.tsx`
  - `app/paddyfield/recipes/[id]/page.tsx`
- **Rule:** `server-cache-lru`

### P3.2 — Parameterize GROQ queries
- All `*ByIdQuery` functions in `utils/groqQueries.ts` use string interpolation (`"${id}"`)
- **Fix:** Use GROQ parameter syntax: `*[_id == $id]` with `{ id }` as second arg to `client.fetch()`
- **Rule:** `server-no-shared-module-state` (security)

### P3.3 — Hoist static Sanity data
- `getBoard()`, `getAllDiaries()`, etc. called repeatedly across renders
- **Fix:** Use `React.cache()` for per-request deduplication
- **Rule:** `server-hoist-static-io` + `server-cache-react`

---

## Priority 4: Client-Side Data Fetching (MEDIUM-HIGH)

No critical issues identified. The project uses server components for most data fetching with minimal client-side data fetching (only `ShowUsersList` and `Donators` use `useEffect` + server actions, which is acceptable for admin search).

---

## Priority 5: Re-render Optimization (MEDIUM)

### P5.1 — Hoist `tabs` array in `SettingsTabs`
- **File:** `components/settingsTabs/SettingsTabs.tsx`
- `tabs` array recreated on every render
- **Fix:** Move constant outside the component
- **Rule:** `rerender-memo-with-default-value`

### P5.2 — Fix `useIsVisible` hook referential stability
- **File:** `hooks/useIsVisible.ts`
- Called with `{ threshold: 0.3 }` as inline object literal, causing `useEffect` to recreate IntersectionObserver on every render
- **Fix:** Use `useRef` for options or destructure stable values
- **Rule:** `rerender-dependencies`

### P5.3 — Extract inline components from `Charts`
- **File:** `components/Financials/Charts.tsx`
- `CustomTooltip` and `CustomLegend` defined as nested components inside `Charts`
- **Fix:** Extract to module-level components
- **Rule:** `rerender-no-inline-components`

### P5.4 — Refactor `FadeInOutCarousel` interval logic
- **File:** `components/Home/FadeInOutCarousel/FadeInOutCarausel.tsx`
- Nested `setTimeout` inside `setInterval` with empty deps `[]` is fragile
- **Fix:** Use refs for timer IDs and functional state updates
- **Rule:** `rerender-use-ref-transient-values`

---

## Priority 6: Rendering Performance (MEDIUM)

### P6.1 — Replace inline `<style>` tag in `DiariesFullMosaic`
- **File:** `components/Diaries/DiariesFullMosaic.tsx`
- ~200 lines of CSS injected via `<style>` tag on every render
- **Fix:** Move all CSS to a co-located `.module.css` file
- **Rule:** `rendering-hoist-jsx`

### P6.2 — Add `content-visibility` to long lists
- Gallery grid, diaries mosaic, paddy fields list
- **Fix:** Add CSS `content-visibility: auto` to scrolling card containers
- **Rule:** `rendering-content-visibility`

---

## Priority 7: JavaScript Performance (LOW-MEDIUM)

### P7.1 — Enable `reactStrictMode`
- **File:** `next.config.mjs`
- Currently `false` — React 19 strict mode catches side-effects and unsafe lifecycle patterns
- **Fix:** Set `reactStrictMode: true`
- **Rule:** General best practice

### P7.2 — Fix render-time mutation in `SmokeText`
- **File:** `components/SmokeText/SmokeText.tsx`
- `globalCharIndex` mutated during render phase
- **Fix:** Use a reducing pattern or local accumulator
- **Rule:** `js-early-exit`

---

## Priority 8: Advanced Patterns (LOW)

### P8.1 — Type `data: any` props
- Multiple components use `data: any`: `SettingsTabs`, `UpdateForm`, `DangerZone`, `NotifyDiaries`, `AdminSectionClient`
- **Fix:** Define proper prop interfaces

---

## Execution Order

1. **P1.1** — Parallelize paddyfield (Promise.all) — safe, no style changes
2. **P1.3** — React.cache() for Sanity fetches — safe, transparent dedup
3. **P2.7** — next.config: optimizePackageImports + reactStrictMode
4. **P2.6** — Remove axios, use native fetch
5. **P2.4** — Replace googleapis with direct fetch
6. **P2.5** — Dynamic import recharts
7. **P2.8** — Lazy-load countries.ts
8. **P3.9** — Add revalidate to SSG pages
9. **P3.10** — React.cache() for all Sanity fetches
10. **P3.11** — Parameterize GROQ queries
11. **P5.14** — Hoist tabs array
12. **P5.15** — Fix useIsVisible hook
13. **P5.16** — Extract inline Charts components
14. **P6.18** — DiariesFullMosaic CSS Module
15. **P7.21** — Enable reactStrictMode
16. **Verify** — `npm run build` + `npm run lint`
