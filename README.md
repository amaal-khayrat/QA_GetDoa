# QA_GetDoa - Automated Testing

> **Work In Progress**
>
> The test suite is currently being rewritten. The GetDoa platform has undergone significant changes, and all existing test cases and helpers have been reset. New tests will be added progressively as the platform stabilises.

---

## About the Project

This repository contains end-to-end (E2E) automated tests for [GetDoa.com](https://getdoa.com) using Playwright.

---

## Prerequisites

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

### Run Tests for a Specific Browser

```bash
npx playwright test --project=chromium
npx playwright test --project=firefox
npx playwright test --project=webkit
```

### Interactive Mode

```bash
npx playwright test --ui
```

### View Test Report

```bash
npx playwright show-report
```

---

## Project Structure

```
QA_GetDoa/
├── helpers/
│   ├── homepage.js
│   ├── Login.js
│   ├── community.js
│   └── doalist.js
├── tests/
│   ├── 1 - Homepage/
│   │   └── homepage.spec.js
│   ├── 2 - Doalist/
│   │   └── doalist.spec.js
│   ├── 3 - Community/
│   │   └── community.spec.js
│   └── 5 - Login/
├── playwright.config.js
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
