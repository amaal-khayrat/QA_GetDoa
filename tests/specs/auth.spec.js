import { test, expect } from '@playwright/test';
import { Auth } from '../pages/LoginPage.js';

const baseURL = 'https://getdoa.com/';

test.describe('GetDoa | Auth | Login', () => {

  test.beforeEach(async ({ page }) => {
    const auth = new Auth(page);
    await auth.navigate();
  });

  test('Auth - 001 | Login button is present and visible', async ({ page }) => {
    const auth = new Auth(page);
    await auth.navigate();
    await auth.verifyLogo();
    await auth.verifyPageTitle();
    await auth.verifySSOButton();
    await auth.verifyLoginPage();
    await auth.verifyGoogleRedirect();
  });

});
