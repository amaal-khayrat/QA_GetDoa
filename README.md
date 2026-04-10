# QA_GetDoa - Automated Testing

## About the Project

This repository contains end-to-end (E2E) automated tests for [GetDoa.com](https://getdoa.com) using Playwright. The test suite covers critical user flows, navigation, and UI components to ensure they function correctly across the application.

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
npx playwright test "tests/1 - Homepage/homepage.spec.js"
npx playwright test "tests/3 - Community/community.spec.js"
npx playwright test "tests/5 - Login/login.spec.js"
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

## Test Case Record

### Homepage Tests (`tests/1 - Homepage/homepage.spec.js`)

#### Main Navigation

| Test ID | Test Name | Description | Test Type | Automation Status |
| ------- | --------- | ----------- | --------- | ----------------- |
| CF-001 | Verify SEO Present | Validates page title and meta description content | Positive | Automated |
| CF-002 | Top Navigation is present and visible | Checks SEO elements, logo visibility, and SSO button presence | Positive | Automated |


#### Hero Section

| Test ID | Test Name | Description | Test Type | Automation Status |
| ------- | --------- | ----------- | --------- | ----------------- |
| CF-004 | Verify Hero Section is present | Validates hero heading, supporting paragraph, and both CTA button links | Positive | Automated |
| CF-005 | Prime CTA is present and navigates correctly | Clicks "Create Your Doa List", verifies redirect to onboarding/login, returns to homepage | Positive | Automated |
| CF-006 | Secondary CTA navigates correctly | Clicks "See Doa Library" and verifies navigation to `/doa` page | Positive | Automated |
| CF-007 | Secondary CTA navigates correctly *(duplicate)* | Same implementation as CF-006 | Positive | Automated ⚠️ duplicate |
| CF-008 | Doa Card Carousel | Intended to test carousel; currently runs `ClickSecondaryCTA` | Positive | Automated ⚠️ misleading name |

#### Features Section

| Test ID | Test Name | Description | Test Type | Automation Status |
| ------- | --------- | ----------- | --------- | ----------------- |
| CF-009 | Verify Feature Section is present | Validates feature section heading, image, and all three feature cards | Positive | Automated |
| CF-010 | "Explore Lists" link on Discover Shared Doa card | Clicks "Explore Lists", verifies navigation to prayer list page with EN/MY toggle | Positive | Automated |
| CF-011 | Community Leaderboard is present | Scrolls to leaderboard section, verifies trophy icon, copy, and "View Leaderboard" button | Positive | Automated |

#### Enhanced Features Section

| Test ID | Test Name | Description | Test Type | Automation Status |
| ------- | --------- | ----------- | --------- | ----------------- |
| CF-012 | Verify Enhanced Feature Section is present | Validate the enhanced features section is visible | Positive | Placeholder |
| CF-013 | Verify "Compose Your Prayers" Card | Check card heading, description, and image | Positive | Placeholder |
| CF-014 | Verify "AI Doa Assistant" Card | Check card heading, description, and image | Positive | Placeholder |
| CF-015 | Verify "Download & Offline" Card | Check card heading, description, and image | Positive | Placeholder |
| CF-016 | Verify "Write in Your Language" Card | Check card heading, description, and image | Positive | Placeholder |
| CF-017 | Verify "Share Instantly via QR" Card | Check card heading, description, and image | Positive | Placeholder |
| CF-018 | Verify "Bookmark Favorites" Card | Check card heading, description, and image | Positive | Placeholder |
| CF-019 | Verify "Sign Up for Free" Button | Check button visibility, label, and href | Positive | Placeholder |
| CF-020 | Verify "Create Doa Image" Button | Check button visibility, label, and href | Positive | Placeholder |

#### Call-To-Action Section

| Test ID | Test Name | Description | Test Type | Automation Status |
| ------- | --------- | ----------- | --------- | ----------------- |
| CF-021 | Verify CTA Section is present and visible | Validate full CTA section renders | Positive | Placeholder |
| CF-022 | Verify "Create Your Doa List" Button | Check button visibility, label, and navigation | Positive | Placeholder |
| CF-023 | Verify "Browse Lists" Button | Check button visibility, label, and navigation | Positive | Placeholder |
| CF-024 | Verify "Create Doa Image" Button | Check button visibility, label, and navigation | Positive | Placeholder |
| CF-025 | Verify Button Order | Assert correct visual order of CTA buttons | Positive | Placeholder |
| CF-026 | Verify Multiple Button Clicks | Click each CTA button sequentially and confirm no errors | Edge | Placeholder |

#### Footer Section

| Test ID | Test Name | Description | Test Type | Automation Status |
| ------- | --------- | ----------- | --------- | ----------------- |
| CF-027 | Verify Footer Section is present and visible | Validate footer renders and is in viewport on scroll | Positive | Placeholder |
| CF-028 | Verify GetDoa Logo Display | Check footer logo is visible with correct `src` and `alt` | Positive | Placeholder |
| CF-029 | Verify Tagline Display | Check footer tagline text content | Positive | Placeholder |
| CF-030 | Verify Footer Navigation Groups | Validate Product, Company, and Legal navigation group headings | Positive | Placeholder |
| CF-031 | Test "Pricing" Link | Verify href and navigation for Pricing footer link | Positive | Placeholder |
| CF-032 | Test "About" Link | Verify href and navigation for About footer link | Positive | Placeholder |
| CF-033 | Test "Contact" Link | Verify href and navigation for Contact footer link | Positive | Placeholder |
| CF-034 | Test "Privacy Policy" Link | Verify href and navigation for Privacy Policy footer link | Positive | Placeholder |
| CF-035 | Test "Terms of Service" Link | Verify href and navigation for Terms of Service footer link | Positive | Placeholder |
| CF-036 | Test "Refund Policy" Link | Verify href and navigation for Refund Policy footer link | Positive | Placeholder |
| CF-037 | Verify Copyright Text | Assert copyright year and brand name in footer | Positive | Placeholder |
| CF-038 | Test GitHub Social Link | Verify GitHub icon link opens in new tab with correct URL | Positive | Placeholder |
| CF-039 | Verify External Link Behavior | Assert all external footer links open in a new tab (`target="_blank"`) | Edge | Placeholder |
| CF-040 | Test Footer Logo Click | Click footer logo and verify navigation back to homepage | Positive | Placeholder |

---

### Community / Leaderboard Tests (`tests/3 - Community/community.spec.js`)

| Test ID | Test Name | Description | Test Type | Automation Status |
| ------- | --------- | ----------- | --------- | ----------------- |
| CF-041 | Page loads and displays main elements | Navigates to leaderboard, verifies section heading, trophy icon, referral leaderboard header, and top-ranked user card | Positive | Automated |
| CF-042 | Leaderboard table displays user rankings | Verifies crown icon, masked username, referral count ("40 referrals"), and gold card styling on top entry | Positive | Automated |
| CF-043 | "How to Join" instructions are visible | Verify the 3-step join instructions section is present and readable | Positive | Placeholder |
| CF-044 | Navigation and footer elements are present | Verify top nav, language toggle, and footer links render on leaderboard page | Positive | Placeholder |
| CF-045 | Language toggle switches between EN and MY | Click EN/MY toggle and verify UI language changes accordingly | Edge | Placeholder |
| CF-046 | Footer links navigate correctly | Test Product, Company, and Legal section links from the leaderboard page footer | Positive | Placeholder |

---

### Login Tests (`tests/5 - Login/login.spec.js`)

| Test ID | Test Name | Description | Test Type | Automation Status |
| ------- | --------- | ----------- | --------- | ----------------- |
| — | *(no test cases defined)* | File contains imports only — no `test()` blocks | — | WIP |

---

## Coverage Summary

### Automation Status

| Status | Count | Notes |
| ----------- | ----- | ----- |
| Automated | 13 | CF-001 to CF-011, CF-041, CF-042 — all with real assertions |
| Placeholder | 32 | CF-012 to CF-040, CF-043 to CF-046 — registered but empty |
| WIP | 1 | Login spec file (no test blocks) |
| **Total** | **46** | |

**Overall automation coverage: 13 / 46 cases (28%)**

### Test Type Coverage

| Type | Count | Cases |
| -------- | ----- | ----- |
| Positive | 44 | All automated + most placeholders |
| Edge | 3 | CF-026, CF-039, CF-045 (all placeholders) |
| Boundary | 0 | Not yet defined |
| Negative | 0 | Not yet defined |

> All 13 currently automated tests are **positive (happy-path) only**. No negative, edge, or boundary cases have been implemented. Suggested future additions:
> - **Negative:** invalid/expired referral codes, direct navigation to `/leaderboard` without referral context, SSO failure state
> - **Edge:** empty leaderboard (zero referrals), very long usernames, rapid language switching
> - **Boundary:** max allowed characters in prayer list name/description, pagination limits on leaderboard

---

## Known Issues

| Issue | Detail |
| ----- | ------ |
| CF-007 is a duplicate | Identical implementation to CF-006 (`ClickSecondaryCTA`) |
| CF-008 has misleading name | Named "Doa Card Carousel" but runs `ClickSecondaryCTA`, not carousel logic |
| `login.spec.js` has no tests | The file only imports helpers; no `test()` blocks exist |

---

## Project Structure

```
QA_GetDoa/
├── helpers/
│   ├── homepage.js       # Homepage page-object helpers
│   ├── Login.js          # Login / SSO helpers
│   └── community.js      # Leaderboard section helpers
├── tests/
│   ├── 1 - Homepage/
│   │   └── homepage.spec.js
│   ├── 3 - Community/
│   │   └── community.spec.js
│   └── 5 - Login/
│       └── login.spec.js
├── playwright-report/    # Generated HTML reports
├── test-results/         # Test artifacts (traces, screenshots)
├── playwright.config.js  # Playwright configuration
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
