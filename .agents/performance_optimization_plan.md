# Performance Optimization Plan

Based on the [Vercel React Best Practices](file:///C:/Users/josee/Programacion/Jennifer/magic-marble-foundation-2026/.agents/skills/vercel-react-best-practices/AGENTS.md) guide and a comprehensive audit of the codebase, here is the plan to improve the application's performance.

## User Review Required

> [!WARNING]
> During the performance audit, several **Critical Security Flaws** were found in Server Actions. While optimizing performance, these security flaws should be addressed immediately.
> Actions like `delete.ts`, `updateRole.ts`, and `update.ts` currently have **no authentication or authorization checks**, meaning any user could delete accounts or change roles.

> [!IMPORTANT]
> The plan outlines the changes to be made. As requested, **no code changes have been made yet**. Please review the proposed changes below and provide your approval to proceed with the refactoring.

## Proposed Changes

---

### Eliminating Waterfalls & Server Actions

We will parallelize independent async operations and secure server actions.

#### [MODIFY] [actions/register.ts](file:///C:/Users/josee/Programacion/Jennifer/magic-marble-foundation-2026/actions/register.ts)
- Parallelize `bcrypt.hash` and `getUserByEmail` using `Promise.all()`.
- Move the password match check (if needed) before the hash.

#### [MODIFY] [actions/new-password.ts](file:///C:/Users/josee/Programacion/Jennifer/magic-marble-foundation-2026/actions/new-password.ts)
- Parallelize independent database operations `db.user.update` and `db.passwordResetToken.delete`.

#### [MODIFY] [actions/new-verification.ts](file:///C:/Users/josee/Programacion/Jennifer/magic-marble-foundation-2026/actions/new-verification.ts)
- Parallelize independent database operations `db.user.update` and `db.verificationToken.delete`.

#### [MODIFY] Server Actions (`actions/delete.ts`, `actions/updateRole.ts`, `actions/update.ts`, etc.)
- Add authentication and authorization checks using `currentUser()` to prevent unauthorized access.
- Validate inputs using existing Zod schemas.

---

### Bundle Size Optimization

We will eliminate barrel imports and dynamically import heavy dependencies to significantly reduce the initial JavaScript bundle size.

#### [DELETE] [utils/index.ts](file:///C:/Users/josee/Programacion/Jennifer/magic-marble-foundation-2026/utils/index.ts)
- Remove this barrel file. It forces the bundler to load all utility functions whenever one is imported.
- Update all imports across the app to import directly from the specific utility files (e.g., `import { formatFinancialData } from "@/utils/formatData"`).

#### [DELETE] [components/Home/index.tsx](file:///C:/Users/josee/Programacion/Jennifer/magic-marble-foundation-2026/components/Home/index.tsx)
- Remove this barrel file.
- Update imports in `app/page.tsx` to import components directly.

#### [MODIFY] [components/Financials/FinancialsPage.tsx](file:///C:/Users/josee/Programacion/Jennifer/magic-marble-foundation-2026/components/Financials/FinancialsPage.tsx)
- Use `next/dynamic` to lazy load `recharts` components. `recharts` is a large library (~300KB) and should not block the initial page load.

#### [MODIFY] [components/Home/Financials.tsx](file:///C:/Users/josee/Programacion/Jennifer/magic-marble-foundation-2026/components/Home/Financials.tsx)
- Use `next/dynamic` to lazy load `recharts` components.

#### [MODIFY] All Pages (`app/page.tsx`, `app/about/page.tsx`, etc.)
- Dynamically import `SanityLive` using `next/dynamic` so it doesn't block hydration.

#### [MODIFY] [components/settingsTabs/SettingsPage.tsx](file:///C:/Users/josee/Programacion/Jennifer/magic-marble-foundation-2026/components/settingsTabs/SettingsPage.tsx)
- Dynamically import the individual tab components so they are only loaded when the user clicks on a tab.

---

### Server-Side Performance

We will deduplicate database queries across the component tree and add Suspense boundaries for streaming rendering.

#### [MODIFY] [data/user.ts](file:///C:/Users/josee/Programacion/Jennifer/magic-marble-foundation-2026/data/user.ts)
- Wrap `getUserByEmail` and `getUserById` with `React.cache()` to deduplicate database queries within the same request.

#### [MODIFY] [data/account.ts](file:///C:/Users/josee/Programacion/Jennifer/magic-marble-foundation-2026/data/account.ts)
- Wrap `getAccountByUserId` with `React.cache()`.

#### [MODIFY] [app/lib/auth.ts](file:///C:/Users/josee/Programacion/Jennifer/magic-marble-foundation-2026/app/lib/auth.ts)
- Wrap `currentUser()` with `React.cache()` so multiple calls don't trigger the NextAuth session callback multiple times per request.

#### [MODIFY] All Pages (`app/page.tsx`, `app/projects/page.tsx`, etc.)
- Wrap data-fetching components (like `Projects`, `Stories`, `Financials`) with `<Suspense>` boundaries to allow the layout to stream instantly while data loads.

---

### Rendering & JavaScript Performance

#### [MODIFY] [app/layout.tsx](file:///C:/Users/josee/Programacion/Jennifer/magic-marble-foundation-2026/app/layout.tsx)
- Implement `next/font/google` (e.g., `Inter`) to optimize font loading and prevent layout shift.

#### [MODIFY] [utils/formatData.ts](file:///C:/Users/josee/Programacion/Jennifer/magic-marble-foundation-2026/utils/formatData.ts)
- Combine chained `.map()` and `.filter()` operations into single iterations to improve CPU performance when formatting large datasets.

## Verification Plan

### Automated Tests
- Run `npm run lint` and `npm run build` to ensure the project builds correctly without type errors.

### Manual Verification
- Verify that the app still functions correctly (navigation, authentication, data fetching).
- Check the terminal during `npm run build` to verify that the First Load JS bundle size has decreased significantly for routes using charts and the homepage.
- Test server actions (like updating profile or changing settings) to ensure the newly added authorization checks function correctly.
