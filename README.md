# QA_GetDoa - Automated Testing

> **Work In Progress**
>
> The test suite is currently being rewritten. New tests will be added progressively as the platform stabilises.

---

## About

End-to-end (E2E) automated tests for [GetDoa.com](https://getdoa.com) using Playwright.

---

## Prerequisites

- **Node.js** v18 or higher
- **npm**
- **Google Chrome** installed (tests run on real Chrome, not bundled Chromium)

## Setup

```bash
git clone https://github.com/aerryasmani/QA_GetDoa.git
cd QA_GetDoa
npm install
npx playwright install
```

---

## Authentication Setup

This suite uses two projects — one for logged-out tests and one for authenticated tests. The authenticated project requires a saved session file (`auth.json`) before it can run.

### How it works

Google blocks automated browsers at its sign-in form. Instead of automating the login, you log in once in your real Chrome, export the session cookies, and build `auth.json` from them. Playwright then injects that session into every authenticated test — Google is never touched again during test runs.

### Step 1 — Export cookies from your real browser

1. Open [getdoa.com](https://getdoa.com) in Chrome and sign in as the test account
2. Install the [Cookie-Editor](https://cookie-editor.com) extension
3. Click the extension → **Export → Export as JSON**
4. Save the file as `scripts/cookies.json`

### Step 2 — Build auth.json

```bash
node scripts/build-auth.cjs
```

Confirm `auth.json` now exists at the project root. You can delete `scripts/cookies.json` after this.

### Session refresh

`auth.json` expires over time. When authenticated tests start redirecting back to the login page, repeat Steps 1–2 to write a fresh session. No test or config changes are needed.

> `auth.json` and `scripts/cookies.json` are gitignored — never commit them.

---

## Running Tests

### By project

The suite is split into two projects based on session state:

| Project | Session | Covers |
|---|---|---|
| `logged-out` | Empty (no cookies) | Login page, SSO button, Google redirect |
| `authenticated` | Loads `auth.json` | Dashboard, CMS, anything behind login |

```bash
# Run logged-out tests only
npx playwright test --project=logged-out

# Run authenticated tests only
npx playwright test --project=authenticated

# Run all tests (both projects)
npx playwright test
```

### Specific file or test

```bash
# Run a specific spec file in a specific project
npx playwright test tests/specs/auth.spec.js --project=logged-out
npx playwright test tests/specs/smoke.spec.js --project=authenticated

# Run tests matching a name pattern
npx playwright test --project=logged-out -g "Login button is present"
npx playwright test --project=authenticated -g "Dashboard"
```

### UI mode

```bash
# Open UI mode (all projects)
npx playwright test --ui

# Open UI mode for a specific project
npx playwright test --project=logged-out --ui
npx playwright test --project=authenticated --ui
```

In UI mode, use the project filter in the left sidebar to switch between logged-out and authenticated views.

### Reports

```bash
# View the last HTML report
npx playwright show-report
```

---

## Project Structure

```
QA_GetDoa/
├── scripts/
│   ├── build-auth.cjs       # Builds auth.json from exported cookies
│   └── save-auth.cjs        # Alternative: captures session via browser automation
├── tests/
│   ├── pages/               # Page Object Models
│   └── specs/               # Test spec files
│       ├── auth.spec.js     # logged-out project (login page & SSO redirect)
│       └── *.spec.js        # authenticated project (behind-login features)
├── auth.json                # Saved session (gitignored)
└── playwright.config.js
```

---

## Adding New Tests

- **Logged-out tests** (no session needed) → add to `auth.spec.js` or a new file matching `auth.spec.js`
- **Authenticated tests** (signed in as test account) → add to any spec file in `tests/specs/` other than `auth.spec.js`
