import { test, expect } from '@playwright/test'; 
import {
    VerifySEOElement,
} from '../../helpers/homepage';


// Setup
test.beforeEach(async ({ page }) => {
  await page.goto("/");
});


test.describe('Homepage Tests', () => {
    
  test('CF-001 | Homepage | Verify SEO Present', async ({ page }) => {
    await VerifySEOElement(page);

  });

});