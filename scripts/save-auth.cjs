// scripts/save-auth.cjs
// One-time setup: log into Google BY HAND once, then save the session to auth.json.
// Run with:  node scripts/save-auth.cjs
// Re-run whenever the saved session expires.

const path = require('path');
const fs = require('fs');
const { execSync } = require('child_process');
const { chromium } = require('@playwright/test');

// auth.json is written to the PROJECT ROOT (one level up from /scripts).
const AUTH_FILE = path.join(__dirname, '..', 'auth.json');
const LOGIN_URL = 'https://getdoa.com/login';

const CHROME_USER_DATA  = 'C:\\Users\\USER\\AppData\\Local\\Google\\Chrome\\User Data';
const PLAYWRIGHT_PROFILE = path.join(CHROME_USER_DATA, 'Profile 3');
const TEMP_USER_DATA    = 'C:\\Users\\USER\\AppData\\Local\\Temp\\PW_Chrome';
const DEFAULT_JUNCTION  = path.join(TEMP_USER_DATA, 'Default');

// Fresh isolated user data dir each run
if (fs.existsSync(TEMP_USER_DATA)) {
  fs.rmSync(TEMP_USER_DATA, { recursive: true, force: true });
}
fs.mkdirSync(TEMP_USER_DATA, { recursive: true });

// Copy Local State — contains the AES key Chrome uses to decrypt cookies
fs.copyFileSync(
  path.join(CHROME_USER_DATA, 'Local State'),
  path.join(TEMP_USER_DATA, 'Local State')
);

// Junction points Default -> PlaywrightProfile (no file copy needed)
execSync(`cmd /c mklink /J "${DEFAULT_JUNCTION}" "${PLAYWRIGHT_PROFILE}"`);

(async () => {
  const context = await chromium.launchPersistentContext(TEMP_USER_DATA, {
    headless: false,
    channel: 'chrome',
  });

  const page = await context.newPage();

  await page.goto(LOGIN_URL);

  console.log('\n========================================================');
  console.log('  Log in with Google BY HAND in the browser window.');
  console.log('  When GetDoa shows you are signed in, click "Resume"');
  console.log('  in the Playwright Inspector to save the session.');
  console.log('========================================================\n');

  // Pauses execution and opens the Inspector. Resume after logging in.
  await page.pause();

  await context.storageState({ path: AUTH_FILE });
  console.log(`\nSession saved to: ${AUTH_FILE}\n`);

  await context.close();
})();