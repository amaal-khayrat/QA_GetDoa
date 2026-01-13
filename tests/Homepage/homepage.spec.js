import { test, expect } from '@playwright/test'; 
import {
    GeneralHomepage,
    VerifySEOElement,
    VerifyLogoVisibility,
    HeroSectionText,
    Button_primeCTA,
    ClickPrimeCTA,
    Button_SecondaryCTA,
    ClickSecondaryCTA
} from '../../helpers/homepage';

import {
    VerifySSOButton,
    RedirectLogin
} from '../../helpers/Login';

const BaseUrl = 'https://getdoa.com';


//Browser Setup
test.beforeEach(async ({ page }) => {
  
    page.on('console', msg => {
        if (msg.type() === 'error' && msg.text().includes('CORS')) {
            return; 
        }
        console.log(msg.text());
    });

    await page.goto(BaseUrl);
});

//Test Cases
test.describe('Homepage Tests', () => {

    test.describe('Main Navigation', () =>{

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

    test.describe('Hero Section', () =>{

        test('CF-004 | Homepage | VerifyHero Section is present', async ({ page }) => {
            await HeroSectionText(page);
            await Button_primeCTA(page);
            await Button_SecondaryCTA(page);
            
        });

        test('CF-005 | Homepage | Prime CTA is present and navigates correctly', async ({ page }) => {
            await ClickPrimeCTA(page);
            await VerifyLogoVisibility (page);
            await VerifySSOButton (page);
        });

        test('CF-006 | Homepage | Secondary CTA buttons navigates correctly', async ({ page }) => {
            await ClickSecondaryCTA(page);
        });
        
    });
    
});