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

## Setup

```bash
git clone https://github.com/aerryasmani/QA_GetDoa.git
cd QA_GetDoa
npm install
npx playwright install
```

## Running Tests

```bash
# Run all tests
npx playwright test

# Run on a specific browser
npx playwright test --project=chromium
npx playwright test --project=firefox
npx playwright test --project=webkit

# Interactive UI mode
npx playwright test --ui

# View HTML report
npx playwright show-report
```
