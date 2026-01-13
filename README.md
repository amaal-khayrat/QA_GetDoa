# QA_GetDoa - Automated Testing

## About the Project

This repository contains end-to-end (E2E) automated tests for [GetDoa.com](https://getdoa.com) using Playwright. The test suite covers critical user flows, navigation, and UI components function correctly across the application.

---

## Prerequisites

Before running the tests, ensure you have the following installed:

- **Node.js** (v18 or higher recommended)
- **npm** (comes with Node.js)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/aerryasmani/QA_GetDoa.git
   cd QA_GetDoa
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Install Playwright browsers:
   ```bash
   npx playwright install
   ```

---

## How to Run the Tests

### Run All Tests (Headless Mode)

```bash
npx playwright test
```

This runs all tests across **Chromium**, **Firefox**, and **WebKit** browsers in parallel.

### Run Tests for a Specific Browser

```bash
npx playwright test --project=chromium
npx playwright test --project=firefox
npx playwright test --project=webkit
```

### Run a Specific Test File

```bash
npx playwright test tests/Homepage/homepage.spec.js
npx playwright test tests/Login/login.spec.js
```

---

## How to Run Using `--ui` (Interactive Mode)

Playwright provides an interactive UI mode for debugging and running tests visually:

```bash
npx playwright test --ui
```

This opens Playwright's **Test Runner UI** where you can:

- See all test files and test cases
- Run individual tests or test suites
- Watch tests execute in real-time
- View traces, screenshots, and logs
- Debug failed tests step-by-step

---

## View Test Report

After running tests, view the HTML report:

```bash
npx playwright show-report
```

The report is generated in the `playwright-report/` folder.

---

## What Currently Happens

The test suite validates the **GetDoa** website (`https://getdoa.com`) with the following test cases:

### Homepage Tests

| Test ID | Test Name                                    | Description                                                                      |
| ------- | -------------------------------------------- | -------------------------------------------------------------------------------- |
| CF-001  | Verify SEO Present                           | Validates page title and meta description                                        |
| CF-002  | Top Navigation is present and visible        | Checks SEO elements, logo visibility, and SSO button                             |
| CF-003  | Login Redirection                            | Verifies SSO button and redirects to login page                                  |
| CF-004  | Verify Hero Section is present               | Validates hero heading, description text, and CTA buttons                        |
| CF-005  | Prime CTA is present and navigates correctly | Clicks "Create Your Doa List" button and verifies navigation to onboarding/login |
| CF-006  | Secondary CTA buttons navigates correctly    | Clicks "See Doa Library" button and verifies navigation to `/doa` page           |

### Login Tests

- WIP

---

## Project Structure

```
QA_GetDoa/
├── helpers/
│   ├── homepage.js      # Homepage helper functions
│   └── Login.js         # Login helper functions
├── tests/
│   ├── Homepage/
│   │   └── homepage.spec.js
│   └── Login/
│       └── login.spec.js
├── playwright-report/   # Generated HTML reports
├── test-results/        # Test artifacts (traces, screenshots)
├── playwright.config.js # Playwright configuration
└── package.json
```

---

## Configuration

Tests are configured in `playwright.config.js`:

- **Base URL**: `https://getdoa.com`
- **Browsers**: Chromium, Firefox, WebKit
- **Reporter**: HTML
- **Trace**: Captured on first retry
- **Retries**: 2 retries on CI, 0 locally
