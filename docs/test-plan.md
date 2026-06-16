# GetDoa — Test Plan

**Version**: 1.0  
**Date**: 2026-06-16  
**Author**: Aerry Asmani  
**Branch**: GetDoa-UIUX  
**Status**: Draft

---

## 1. Overview

GetDoa is a full-stack Islamic prayer (dua) companion web application built with TanStack Start, React 19, TypeScript, Nitro server runtime, and PostgreSQL. It allows users to browse 90+ authentic duas, curate personalised prayer lists, export lists as custom images, discover public lists, and participate in a referral programme.

This test plan governs quality assurance activities across the entire GetDoa system — frontend, server functions, REST API, database layer, authentication, and CI/CD pipeline.

### 1.1 Objectives

1. Establish a baseline of verified, repeatable test coverage where today almost none exists (one test file, six tests, no CI enforcement).
2. Define which features carry the highest defect risk and must reach coverage before any release.
3. Document test types, tooling, and ownership so the team can execute and maintain the suite without tribal knowledge.
4. Create a traceability bridge between features, user stories, and test cases.
5. Set measurable entry and exit criteria so "done" is unambiguous.

---

## 2. Scope

### 2.1 In Scope

| Area                         | Details                                                                                                          |
| ---------------------------- | ---------------------------------------------------------------------------------------------------------------- |
| **Dua browsing**             | Paginated list (`/doa`), full-text search, category filters, individual dua detail (`/doa/:slug`)                |
| **Authentication**           | Google OAuth sign-in, email/password sign-up, session management, route guards on `/dashboard/*` and `/admin`    |
| **Onboarding**               | Post-signup flow (`/onboarding`), referral code capture and processing                                           |
| **Dashboard — lists**        | Create, read, update, delete doa lists; drag-and-drop reordering; visibility/status toggles; list detail builder |
| **Dashboard — saved duas**   | Save and unsave individual duas; saved-duas listing                                                              |
| **Dashboard — saved lists**  | Favourite and unfavourite public lists                                                                           |
| **Dashboard — image export** | Generate list image with font/colour/pattern customisation; daily quota enforcement (3/day); image download      |
| **Dashboard — profile**      | Update name, avatar, privacy settings (favorites display, leaderboard name preference)                           |
| **Dashboard — referrals**    | Referral code display; share flow; referral stats; leaderboard display preference                                |
| **Public list view**         | `/list/:listId` read-only shareable page (published + public only)                                               |
| **Public lists discovery**   | `/lists` page; search and browse community lists                                                                 |
| **Public user profile**      | `/user/:userId` page respecting privacy settings                                                                 |
| **Leaderboard**              | `/leaderboard` — referral counts, censored/anonymous name display                                                |
| **REST API**                 | `GET /api/doa`, `GET /api/doa/random`, `GET /api/list/:listId`                                                   |
| **Admin panel**              | Access restriction to `ADMIN_EMAILS`; basic admin actions                                                        |
| **Server-side rendering**    | Loaders run on server, hydration on client, meta tags                                                            |
| **Database layer**           | Schema correctness, constraint enforcement, migration idempotency, seed data integrity                           |
| **CI pipeline**              | Tests execute on every push; build fails if tests fail                                                           |

### 2.2 Out of Scope

| Area                                              | Reason                                                                                    |
| ------------------------------------------------- | ----------------------------------------------------------------------------------------- |
| Razorpay payment flows                            | Payment feature present in env vars but no UI or user-facing code found in current branch |
| Shopee referral deep-link parsing (non-auth path) | Utility exists but no user flow is fully exposed in current branch                        |
| Third-party OAuth provider internals              | Google OAuth is external; tested only at integration boundary                             |
| Load / stress / soak testing                      | Infrastructure responsibility; outside this plan's budget                                 |
| Accessibility (WCAG) audit                        | Planned separately; not blocking this release                                             |
| Mobile native apps                                | Web only                                                                                  |
| Sharp SVG font rendering accuracy                 | Visual output is subjective; covered by snapshot only                                     |

---

## 3. Test Approach

### 3.1 Test Pyramid

```
          ┌─────────────┐
          │    E2E      │  ~10%   Playwright — critical user journeys
          ├─────────────┤
          │ Integration │  ~30%   Vitest + real DB — server functions, API routes
          ├─────────────┤
          │    Unit     │  ~60%   Vitest — utils, validation schemas, business logic
          └─────────────┘
```

The project currently has only unit tests (6). The plan grows the pyramid bottom-up: harden units first, then add integration tests against a test database, then a focused E2E suite for the golden paths that cannot be verified any other way.

### 3.2 Test Types

| Type                               | Scope                                                                                             | Tooling                                 | Location                       |
| ---------------------------------- | ------------------------------------------------------------------------------------------------- | --------------------------------------- | ------------------------------ |
| **Unit**                           | Pure functions, Zod schemas, search scoring, text helpers, date utilities, Drizzle query builders | Vitest + jsdom                          | `src/**/*.test.ts`             |
| **Component**                      | React components in isolation: form validation states, conditional rendering, theme switching     | Vitest + @testing-library/react + jsdom | `src/components/**/*.test.tsx` |
| **Integration (API)**              | REST endpoints: response shape, status codes, pagination edge cases, auth guards                  | Vitest + real Postgres test DB          | `src/routes/api/**/*.test.ts`  |
| **Integration (Server Functions)** | TanStack server functions: auth context, DB side-effects, error paths                             | Vitest + real Postgres test DB          | `src/functions/**/*.test.ts`   |
| **Integration (DB)**               | Schema constraints, cascade deletes, unique violations, referral cap logic                        | Vitest + Drizzle + test DB              | `src/db/**/*.test.ts`          |
| **E2E**                            | Full browser flows from login to task completion                                                  | Playwright                              | `e2e/**/*.spec.ts`             |
| **Smoke**                          | Subset of E2E: app boots, home page loads, login page reachable                                   | Playwright (tag: `@smoke`)              | `e2e/smoke.spec.ts`            |
| **Visual regression**              | Snapshot diffs of image export output                                                             | Playwright screenshots + pixelmatch     | `e2e/visual/**`                |

### 3.3 Manual vs Automated

| Activity                                | Approach       | Frequency                              |
| --------------------------------------- | -------------- | -------------------------------------- |
| Unit + component tests                  | Automated (CI) | Every push                             |
| Integration tests                       | Automated (CI) | Every push                             |
| Smoke E2E                               | Automated (CI) | Every push to `main`                   |
| Full E2E suite                          | Automated (CI) | Every PR to `main`                     |
| Visual regression                       | Automated (CI) | Every PR that touches image generation |
| Exploratory testing                     | Manual         | Before each release                    |
| Admin panel verification                | Manual         | Before each release                    |
| New device / browser check              | Manual         | Before major releases                  |
| Referral link share flow (real devices) | Manual         | Before referral feature changes        |

---

## 4. Test Environment

| Environment    | Purpose                          | Database                                       | URL              |
| -------------- | -------------------------------- | ---------------------------------------------- | ---------------- |
| **Local dev**  | Developer self-test              | Docker Compose Postgres on port 5432           | `localhost:3000` |
| **CI**         | Automated suite on every push    | GitHub Actions service container (Postgres 18) | internal         |
| **Staging**    | Pre-release manual + exploratory | Dedicated staging Postgres                     | staging URL      |
| **Production** | Smoke only post-deploy           | Production DB (read-only queries only)         | production URL   |

The test Postgres instance must be isolated from production. The CI service container is seeded fresh for every run using `pnpm db:push && pnpm db:seed`.

Environment variables required for test runs:

```
DATABASE_URL=postgres://test:test@localhost:5432/getdoa_test
BETTER_AUTH_SECRET=test-secret-not-for-production
BETTER_AUTH_URL=http://localhost:3000
GOOGLE_CLIENT_ID=<mock or real test app>
GOOGLE_CLIENT_SECRET=<mock or real test app>
ADMIN_EMAILS=testadmin@example.com
```

Google OAuth cannot be automated in CI without a real test OAuth app. For integration tests, the auth layer is seeded with pre-created sessions. E2E tests use a dedicated test Google account with stored auth state (Playwright `storageState`).

### 4.1 Test Data Strategy

**Seed duas**: The existing `pnpm db:seed` command seeds 99+ production duas idempotently. This seed is reused in tests — do not mock dua data.

**User fixtures**: A set of pre-seeded test users covers:

- `user_no_lists` — new user, no lists, no referrals
- `user_with_lists` — has 3 draft lists and 2 published lists
- `user_referrer` — has a referral code with 2 successful referrals
- `user_referred` — signed up via `user_referrer`'s code
- `user_admin` — email matches `ADMIN_EMAILS`
- `user_maxed_export` — has used 3 image exports today

**List fixtures**:

- `list_draft_private` — draft, private, single dua
- `list_published_public` — published, public, 5 duas in order
- `list_published_private` — published but private (should not appear in `/lists`)

**Isolation**: Each integration test that writes to the DB must wrap in a transaction rolled back after the test (Drizzle supports this). E2E tests run against a dedicated staging-like DB that is reset before the full suite.

**No fake dua content**: Tests must use real slug values from the seed. Hard-coding made-up slugs that don't exist in the seed will cause false failures.

---

## 5. Entry and Exit Criteria

### 5.1 Entry Criteria

A test cycle may begin when:

- [ ] All code changes for the feature or sprint are merged to the target branch
- [ ] The application builds successfully (`pnpm build`) with no TypeScript errors
- [ ] ESLint passes with no errors (`pnpm lint`)
- [ ] The test database is provisioned and seeded
- [ ] Environment variables for the test environment are configured
- [ ] Test cases for the targeted features are written and reviewed

### 5.2 Exit Criteria

A release may proceed when:

- [ ] All unit and integration tests pass (0 failures)
- [ ] Smoke E2E suite passes (0 failures)
- [ ] Full E2E suite passes with ≤ 1 flaky retry allowed per test (0 confirmed failures)
- [ ] Code coverage for `src/utils/`, `src/db/`, and `src/functions/` is ≥ 80%
- [ ] No open P0 or P1 defects
- [ ] Visual regression snapshots are approved (no unexpected diffs)
- [ ] Manual exploratory testing sign-off from the QA lead
- [ ] CI pipeline is green on the release commit

### 5.3 Suspension and Resumption

**Suspend testing when**:

- A P0 defect (data loss, auth bypass, app crash on load) is found — halt until fixed and re-deployed to the test environment
- The test database becomes corrupted or unavailable
- CI infrastructure is down for > 2 hours
- A dependent external service (Google OAuth, Docker registry) is unavailable

**Resume testing when**:

- The blocking defect is fixed, verified, and the environment is restored
- A test environment reset is confirmed complete
- CI infrastructure is restored and a clean build passes

---

## 6. Feature Priorities

Features are prioritised by risk — the combination of defect likelihood and user/business impact.

| Priority | Feature                                            | Risk Rationale                                                                        |
| -------- | -------------------------------------------------- | ------------------------------------------------------------------------------------- |
| **P0**   | Authentication (Google OAuth, session guards)      | Security boundary; all protected routes depend on it                                  |
| **P0**   | Doa list create / update / delete                  | Core user value; data loss here is irreversible                                       |
| **P0**   | Daily image export quota enforcement               | Business rule; bypass = abuse vector                                                  |
| **P0**   | Public vs private list visibility                  | Privacy guarantee; private lists must never appear in `/lists` or `/api/list/:listId` |
| **P1**   | Dua browsing and search                            | Primary content discovery; affects all users every session                            |
| **P1**   | Referral code capture and processing               | Revenue mechanism; silent failures damage user trust                                  |
| **P1**   | Referral bonus cap (max lists per referral)        | Business logic integrity; over-granting or under-granting bonuses                     |
| **P1**   | `GET /api/doa` pagination and search               | Public API; incorrect pagination corrupts consumer integrations                       |
| **P1**   | Onboarding flow                                    | First impression; broken onboarding chokes the funnel                                 |
| **P2**   | Drag-and-drop list reordering                      | Usability; ordering bugs are annoying but recoverable                                 |
| **P2**   | Leaderboard name censoring / anonymous             | Privacy preference; incorrect display is embarrassing                                 |
| **P2**   | User profile privacy settings                      | Preference correctness                                                                |
| **P2**   | Image export customisation (font, colour, pattern) | Aesthetic; wrong output is low-severity                                               |
| **P3**   | Admin panel access restriction                     | Internal; low traffic                                                                 |
| **P3**   | Static pages (`/about`, `/terms`, `/privacy`)      | Content only; no logic                                                                |

---

## 7. Suite Organisation and Execution

### 7.1 Tagging, Not Duplication

Every test is tagged with one or more of the following labels. Tags drive which subset of tests runs in a given CI trigger without duplicating test code across files.

| Tag             | Meaning                                                 |
| --------------- | ------------------------------------------------------- |
| `@unit`         | Pure logic, no I/O                                      |
| `@component`    | React component via @testing-library                    |
| `@integration`  | Requires a real database or server                      |
| `@api`          | Tests a REST endpoint                                   |
| `@e2e`          | Full Playwright browser test                            |
| `@smoke`        | Must pass before any deployment; fastest-running subset |
| `@auth`         | Touches authentication or session logic                 |
| `@referral`     | Referral system logic                                   |
| `@image-export` | Image generation and quota                              |
| `@visual`       | Pixel-level screenshot comparison                       |
| `@slow`         | Known to take > 5 s; excluded from watch mode           |

Example test annotation (Vitest):

```ts
it('rejects list creation when user is unauthenticated', { tags: ['@integration', '@auth'] }, async () => { ... })
```

Example (Playwright):

```ts
test('smoke: home page loads', { tag: ['@smoke', '@e2e'] }, async ({ page }) => { ... })
```

### 7.2 CI Triggers

| Trigger                                | Tests Run                                                               | Approximate Duration |
| -------------------------------------- | ----------------------------------------------------------------------- | -------------------- |
| Push to any feature branch             | `@unit`, `@component`                                                   | < 60 s               |
| PR opened / updated (targeting `main`) | `@unit`, `@component`, `@integration`, `@api`, `@e2e` excluding `@slow` | < 8 min              |
| Merge to `main`                        | Full suite including `@slow` and `@visual`                              | < 20 min             |
| Manual deploy to staging               | `@smoke` against staging URL                                            | < 2 min              |
| Manual deploy to production            | `@smoke` against production URL                                         | < 2 min              |

GitHub Actions matrix: use a Postgres 18 service container, run `pnpm db:push && pnpm db:seed` before integration tests, cache `node_modules` and `.pnpm-store` between runs.

```yaml
# Minimal CI job outline — not final
services:
  postgres:
    image: postgres:18-alpine
    env:
      POSTGRES_DB: getdoa_test
      POSTGRES_USER: test
      POSTGRES_PASSWORD: test
    ports: ["5432:5432"]
    options: --health-cmd pg_isready --health-interval 5s --health-timeout 5s --health-retries 5

steps:
  - uses: actions/checkout@v4
  - uses: pnpm/action-setup@v4
    with: { version: "10.25.0" }
  - run: pnpm install --frozen-lockfile
  - run: pnpm db:push && pnpm db:seed
    env: { DATABASE_URL: postgres://test:test@localhost:5432/getdoa_test }
  - run: pnpm test --reporter=verbose
  - run: pnpm playwright test --grep-invert @slow
```

### 7.3 On Failure

1. **Unit / component failure** — CI blocks the branch. Developer must fix before the PR can merge.
2. **Integration failure** — CI blocks the PR. Check whether the failure is a schema drift (run `pnpm db:push` locally) or a logic regression.
3. **E2E failure** — Playwright generates a trace file and screenshot. The trace is uploaded as a CI artifact. Investigate the trace before re-running; do not accept a "re-run fixed it" result for a non-flaky test.
4. **Flaky E2E** — A test that fails then passes on retry is treated as a P2 defect and must be stabilised within one sprint. It is quarantined with the `@flaky` tag and excluded from blocking CI until fixed.
5. **Visual regression diff** — The diff image is uploaded as a CI artifact. A human must review and either update the baseline or raise a defect.

---

## 8. Traceability

| Feature / User Story                        | Test File(s)                                                     | Priority |
| ------------------------------------------- | ---------------------------------------------------------------- | -------- |
| Browse duas with search                     | `src/routes/api/doa.test.ts`, `e2e/doa-browse.spec.ts`           | P1       |
| View individual dua                         | `src/routes/doa.$slug.test.ts`, `e2e/doa-detail.spec.ts`         | P1       |
| Sign in with Google                         | `e2e/auth.spec.ts`                                               | P0       |
| Route guard on `/dashboard`                 | `src/routes/dashboard.test.ts`                                   | P0       |
| Create a doa list                           | `src/functions/lists.test.ts`, `e2e/create-list.spec.ts`         | P0       |
| Edit and delete a list                      | `src/functions/lists.test.ts`, `e2e/manage-lists.spec.ts`        | P0       |
| Reorder items via drag-and-drop             | `e2e/list-reorder.spec.ts`                                       | P2       |
| Publish / unpublish a list                  | `src/functions/lists.test.ts`                                    | P0       |
| Private list not in `/lists`                | `src/routes/api/list.test.ts`, `e2e/list-visibility.spec.ts`     | P0       |
| Save / unsave a dua                         | `src/functions/saved-duas.test.ts`                               | P2       |
| Favourite / unfavourite a list              | `src/functions/favorites.test.ts`                                | P2       |
| Generate list image                         | `src/functions/image-export.test.ts`, `e2e/image-export.spec.ts` | P1       |
| Daily export quota (3/day)                  | `src/functions/image-export.test.ts`                             | P0       |
| Visual image output                         | `e2e/visual/image-export.spec.ts`                                | P2       |
| Referral code on signup URL                 | `e2e/referral.spec.ts`                                           | P1       |
| Referral code processed post-login          | `src/functions/referrals.test.ts`                                | P1       |
| Referral bonus cap per user                 | `src/functions/referrals.test.ts`, `src/db/referral.test.ts`     | P1       |
| Leaderboard anonymous/censored              | `src/functions/leaderboard.test.ts`, `e2e/leaderboard.spec.ts`   | P2       |
| Profile privacy settings                    | `src/functions/profile.test.ts`, `e2e/profile.spec.ts`           | P2       |
| Public user profile respects privacy        | `e2e/user-profile.spec.ts`                                       | P2       |
| Onboarding flow                             | `e2e/onboarding.spec.ts`                                         | P1       |
| Admin panel access (non-admin blocked)      | `e2e/admin.spec.ts`                                              | P3       |
| `GET /api/doa` pagination                   | `src/routes/api/doa.test.ts`                                     | P1       |
| `GET /api/doa/random` count + category      | `src/routes/api/doa.test.ts`                                     | P2       |
| `GET /api/list/:listId` auth/visibility     | `src/routes/api/list.test.ts`                                    | P0       |
| Text search scoring                         | `src/utils/text-helpers.test.ts` _(existing)_                    | P1       |
| Dua seed integrity (hash dedup)             | `src/db/seed.test.ts`                                            | P2       |
| DB unique constraint: one referral per user | `src/db/referral.test.ts`                                        | P1       |

---

## 9. Tools

| Category                           | Tool                                          | Version        | Purpose                                                        |
| ---------------------------------- | --------------------------------------------- | -------------- | -------------------------------------------------------------- |
| **Test runner (unit/integration)** | Vitest                                        | 3.0.5          | Already installed; runs `*.test.ts` files                      |
| **Component testing**              | @testing-library/react                        | 16.2.0         | Already installed; render + interact components                |
| **DOM environment**                | jsdom                                         | 27.0.0         | Already installed; simulates browser for unit tests            |
| **E2E testing**                    | Playwright                                    | latest stable  | Browser automation; install via `pnpm add -D @playwright/test` |
| **API testing**                    | Vitest (HTTP fetch)                           | —              | Use native `fetch` against the Nitro test server               |
| **Visual regression**              | Playwright + pixelmatch                       | —              | Screenshot diffing for image export output                     |
| **Mock server**                    | MSW (Mock Service Worker)                     | 2.x            | Mock external HTTP (Google OAuth, Shopee) in unit tests        |
| **Database**                       | PostgreSQL 18                                 | 18             | Real DB for integration tests (no SQLite shim)                 |
| **DB client**                      | Drizzle ORM                                   | 0.45.1         | Already in use; reused for test fixtures                       |
| **Coverage**                       | Vitest coverage (v8)                          | —              | `pnpm test --coverage`; threshold ≥ 80% for core modules       |
| **Code quality**                   | ESLint 9 + Prettier 3                         | 9.39.4 / 3.5.3 | Already configured; CI enforced                                |
| **CI**                             | GitHub Actions                                | —              | Test matrix + Postgres service container                       |
| **Reporting**                      | Vitest HTML reporter + Playwright HTML report | —              | Artefacts on CI; local review                                  |

---

## 10. Deliverables

| Deliverable                                        | Owner        | Target       |
| -------------------------------------------------- | ------------ | ------------ |
| This test plan (`test-plan.md`)                    | QA Lead      | Sprint 1     |
| Vitest config update (coverage, reporters)         | Dev          | Sprint 1     |
| CI workflow update (test job, Postgres service)    | Dev / DevOps | Sprint 1     |
| Playwright installation and `playwright.config.ts` | QA / Dev     | Sprint 1     |
| Test user and list seed fixtures                   | QA / Dev     | Sprint 1     |
| Unit tests: `src/utils/` complete coverage         | Dev          | Sprint 1     |
| Unit tests: Zod schemas and form validation        | Dev          | Sprint 2     |
| Integration tests: all REST API endpoints          | QA / Dev     | Sprint 2     |
| Integration tests: list CRUD server functions      | Dev          | Sprint 2     |
| Integration tests: referral system                 | Dev          | Sprint 2     |
| Integration tests: image export quota              | Dev          | Sprint 2     |
| E2E: auth flow (login, logout, route guard)        | QA           | Sprint 2     |
| E2E: golden path (sign up → create list → share)   | QA           | Sprint 3     |
| E2E: image export flow                             | QA           | Sprint 3     |
| E2E: referral signup and bonus verification        | QA           | Sprint 3     |
| E2E: leaderboard and profile privacy               | QA           | Sprint 3     |
| Visual regression baselines (image export)         | QA           | Sprint 3     |
| Test execution report (pre-release)                | QA Lead      | Each release |
| Defect summary report                              | QA Lead      | Each release |

---

## 11. Roles and Responsibilities

| Role                 | Responsibility                                                                                                               |
| -------------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| **QA Lead**          | Authors and maintains this test plan; owns E2E suite; signs off on releases; files and tracks defects                        |
| **Developer**        | Writes unit and integration tests alongside feature code; fixes defects within SLA; reviews QA-written tests for correctness |
| **DevOps / Infra**   | Provisions and maintains CI pipeline, Postgres service containers, staging environment; supports Docker build issues         |
| **Product Owner**    | Clarifies acceptance criteria; prioritises defect fixes; approves release go/no-go                                           |
| **All team members** | Run `pnpm test` before pushing; do not merge with failing unit tests; flag flaky tests immediately                           |

---

## 12. Risks and Assumptions

### Risks

| Risk                                                            | Likelihood | Impact | Mitigation                                                                                                                      |
| --------------------------------------------------------------- | ---------- | ------ | ------------------------------------------------------------------------------------------------------------------------------- |
| Google OAuth cannot be automated in CI                          | High       | Medium | Use pre-seeded session tokens for integration tests; dedicate a test Google account for E2E with stored `storageState`          |
| TanStack Start server function testing is poorly documented     | Medium     | Medium | Test server functions by calling the underlying DB/logic functions directly; wrap in minimal server context where needed        |
| Sharp image generation is environment-sensitive (fonts, OS)     | Medium     | Low    | Pin font paths in Dockerfile; run visual regression only inside the same Docker image used in production                        |
| Drag-and-drop (@dnd-kit) is hard to automate reliably           | Medium     | Low    | Use Playwright's `dragTo` API; tag these as `@slow`; accept manual verification as fallback                                     |
| Daily export quota uses `generationsToday` denormalised counter | Low        | High   | Cover with integration tests that reset the counter to 2 and verify rejection on third attempt; test reset at midnight boundary |
| Test database diverges from production schema                   | Medium     | High   | Always run `pnpm db:push` in CI before integration tests; fail the job if push reports schema changes                           |
| Referral bonus cap logic is complex and stateful                | Medium     | High   | Dedicated integration tests for boundary conditions (0, 1, cap) with rollback isolation                                         |
| No existing E2E infrastructure to build on                      | High       | Medium | Treat Playwright setup as a Sprint 1 deliverable; block E2E test writing on setup completion                                    |
| CI pipeline currently has no test step                          | High       | High   | First deliverable of this plan; all other automation depends on it                                                              |

### Assumptions

1. The `pnpm db:seed` command remains idempotent and can be run on a fresh database to produce a known state.
2. A dedicated test Google OAuth application will be created and credentials provided to the QA team within Sprint 1.
3. The staging environment mirrors the Docker production image (same base image, same fonts, same Nitro configuration).
4. The `ADMIN_EMAILS` environment variable in CI is set to a test email so admin tests do not require a real admin account.
5. Razorpay payment flows are not user-facing in the current branch and are excluded without further notice.
6. The team agrees that integration tests against a real Postgres instance are non-negotiable — SQLite or in-memory databases are not acceptable substitutes given Drizzle's use of JSONB, GIN indexes, and PostgreSQL-specific features.

---

## 13. Glossary

| Term                  | Definition                                                                                                                                                              |
| --------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Dua** (pl. duas)    | An Islamic supplication or prayer; the core content unit of GetDoa                                                                                                      |
| **Doa**               | Malay/Indonesian spelling of dua; used interchangeably in the codebase and UI                                                                                           |
| **TanStack Start**    | Full-stack React meta-framework with file-based routing and server functions, built on Vite and Nitro                                                                   |
| **Nitro**             | Server runtime used by TanStack Start; handles SSR, API routes, and server functions                                                                                    |
| **Server Function**   | A TanStack Start concept: a TypeScript function that runs exclusively on the server but can be called from client components; used for all authenticated data mutations |
| **Drizzle ORM**       | TypeScript-first ORM used for all database queries; uses a push-based migration model                                                                                   |
| **Better Auth**       | Authentication library handling Google OAuth and session management in GetDoa                                                                                           |
| **Slug**              | URL-safe unique identifier for a dua (e.g., `doa-sebelum-makan`); primary key of the `doa` table                                                                        |
| **List**              | A user-curated ordered collection of duas; has visibility (public/private) and status (draft/published)                                                                 |
| **Referral code**     | A unique alphanumeric code assigned to each user; shared to earn list-creation bonuses                                                                                  |
| **Image export**      | The feature that generates a downloadable image of a doa list using Sharp; quota-limited to 3/day                                                                       |
| **Daily quota**       | The limit of 3 image exports per user per calendar day; tracked in `doa_image_generation.generationsToday`                                                              |
| **P0 / P1 / P2 / P3** | Defect severity: P0 = blocker (data loss, security, app down), P1 = major (core flow broken), P2 = moderate (degraded experience), P3 = minor (cosmetic, low traffic)   |
| **Golden path**       | The primary happy-path user journey: sign up → create a doa list → publish it → share the link                                                                          |
| **Smoke test**        | A minimal, fast subset of tests that verify the application is alive and the most critical features respond                                                             |
| **Flaky test**        | A test that non-deterministically passes or fails without code changes; must be fixed or quarantined                                                                    |
| **storageState**      | Playwright feature: saves browser cookies and localStorage to a file so authenticated sessions can be reused across tests without repeating the login flow              |
| **CI**                | Continuous Integration; GitHub Actions pipelines that run tests automatically on code pushes                                                                            |
| **Seed**              | Pre-loading the database with a known set of duas (and test users) so tests have consistent data to work with                                                           |
| **pgbouncer**         | PostgreSQL connection pooler used in production and staging to manage DB connection limits                                                                              |
| **jsdom**             | A JavaScript-based headless DOM implementation used by Vitest to simulate a browser environment for component tests                                                     |
| **MSW**               | Mock Service Worker; intercepts `fetch` calls in tests to mock external HTTP services like Google OAuth                                                                 |
| **pixelmatch**        | Node.js library for pixel-level image comparison; used for visual regression testing of exported images                                                                 |
| **@dnd-kit**          | The drag-and-drop library used for reordering items within a doa list                                                                                                   |
| **Content hash**      | SHA-based fingerprint stored on each dua record used by the seed process to detect and update changed content without duplicating entries                               |
