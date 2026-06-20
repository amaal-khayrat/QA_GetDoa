import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    baseURL: 'https://getdoa.com',
    channel: 'chrome',
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'logged-out',
      testMatch: /auth\.spec\.js/,
      use: { storageState: { cookies: [], origins: [] } },
    },
    {
      name: 'authenticated',
      testMatch: '**/specs/*.spec.js',
      testIgnore: '**/auth.spec.js',
      use: { storageState: 'auth.json' },
    },
    /*{
  name: 'auth-check',
  testMatch: /auth\.spec\.js/,
  use: { storageState: 'auth.json' },
   },*/

  ],
});