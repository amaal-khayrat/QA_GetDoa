// scripts/build-auth.cjs
// Converts a Cookie-Editor JSON export (+ optional localStorage dump) into
// a Playwright storageState file (auth.json) at the project root.
//
// Run:  node scripts/build-auth.cjs
//
// Inputs  (place both in the scripts/ folder):
//   scripts/cookies.json       — required, exported from the Cookie-Editor extension
//   scripts/localStorage.json  — optional, paste output of the console snippet if the
//                                session lives in localStorage rather than cookies

const path = require('path');
const fs   = require('fs');

const COOKIES_FILE      = path.join(__dirname, 'cookies.json');
const LOCALSTORAGE_FILE = path.join(__dirname, 'localStorage.json');
const AUTH_FILE         = path.join(__dirname, '..', 'auth.json');
const ORIGIN            = 'https://getdoa.com';

// Cookie-Editor uses a wider set of sameSite labels than Playwright accepts.
const SAMESITE_MAP = {
  strict:         'Strict',
  lax:            'Lax',
  none:           'None',
  no_restriction: 'None',
  unspecified:    'Lax',
};

function normalizeSameSite(value) {
  if (!value) return 'Lax';
  return SAMESITE_MAP[value.toLowerCase()] ?? 'Lax';
}

if (!fs.existsSync(COOKIES_FILE)) {
  console.error(`\nMissing: ${COOKIES_FILE}`);
  console.error('Export cookies from Cookie-Editor on getdoa.com and save as scripts/cookies.json\n');
  process.exit(1);
}

// Cookie-Editor may use either "expires" or "expirationDate" for the timestamp.
const rawCookies = JSON.parse(fs.readFileSync(COOKIES_FILE, 'utf8'));
const cookies = rawCookies.map(c => ({
  name:     c.name,
  value:    c.value,
  domain:   c.domain,
  path:     c.path ?? '/',
  expires:  typeof c.expirationDate === 'number' ? Math.floor(c.expirationDate)
          : typeof c.expires        === 'number' ? Math.floor(c.expires)
          : -1,
  httpOnly: Boolean(c.httpOnly),
  secure:   Boolean(c.secure),
  sameSite: normalizeSameSite(c.sameSite),
}));

// localStorage is optional — only needed if the session token lives there.
const origins = [];
if (fs.existsSync(LOCALSTORAGE_FILE)) {
  const rawLS = JSON.parse(fs.readFileSync(LOCALSTORAGE_FILE, 'utf8'));
  const items = Object.entries(rawLS).map(([name, value]) => ({ name, value: String(value) }));
  if (items.length > 0) {
    origins.push({ origin: ORIGIN, localStorage: items });
  }
}

fs.writeFileSync(AUTH_FILE, JSON.stringify({ cookies, origins }, null, 2));

console.log(`\nauth.json written → ${AUTH_FILE}`);
console.log(`  ${cookies.length} cookie(s)`);
if (origins.length > 0) console.log(`  ${origins[0].localStorage.length} localStorage item(s)`);
console.log('\nYou can now delete scripts/cookies.json and scripts/localStorage.json.\n');
