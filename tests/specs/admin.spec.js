import { test, expect } from '@playwright/test';
import { Auth } from '../pages/LoginPage.js';
import { AdminPage } from '../pages/AdminPage.js';

test.describe('GetDoa | AdminPage | Dashboard', () => {

  test.beforeEach(async ({ page }) => {
    const auth = new Auth(page);
    await auth.navigate();
  });

test('Auth - 002 | Dashboard redirection is present', async ({ page }) => {
    const auth = new Auth(page);
    const adminPage = new AdminPage(page);
    await auth.verifyLogo();
    await auth.verifyPageTitle();
    await adminPage.verifyDashboardPresent();
  });

test('Auth - 003 | Dashboard page is present', async ({ page }) => {
    const auth = new Auth(page);
    const adminPage = new AdminPage(page);
    await auth.verifyLogo();
    await auth.verifyPageTitle();
    await adminPage.verifyLoginState();
    await adminPage.verifyDashboardPage();

  });

});
