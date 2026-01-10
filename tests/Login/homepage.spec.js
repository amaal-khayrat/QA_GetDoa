import { test, expect } from '@playwright/test'; 
import {
    VerifySEOElement,
    VerifyLogoVisibility
} from '../../helpers/homepage';

import {
    VerifySSOButton,
    RedirectLogin
} from '../../helpers/Login';

const BaseUrl = 'https://getdoa.com';


//Browser Setup
test.beforeEach(async ({ page }) => {
  await page.goto(BaseUrl);
});

//Test Cases
test.describe('Homepage Tests', () => {
    
    test('CF-001 | Homepage | Verify SEO Present', async ({ page }) => {
        await VerifySEOElement(page);
    });

    test('CF-002 | Homepage | Top Navigatio is present and visible', async ({ page }) => {
        await VerifySEOElement(page);
        await VerifyLogoVisibility (page);
        await VerifySSOButton (page);
    });

    test('CF-003 | Homepage | Login Redirection', async ({ page }) => {
        await VerifySSOButton (page);
        await RedirectLogin (page);
    });

});