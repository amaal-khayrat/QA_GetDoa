import { test, expect } from '@playwright/test'; 
import {
    GeneralHomepage,
    VerifySEOElement,
    VerifyLogoVisibility,
    HeroSectionText,
    Button_primeCTA,
    ClickPrimeCTA,
    Button_SecondaryCTA,
    ClickSecondaryCTA,
    GeneralFeatureSection,
    FeatureSection_Card1,
    Card1_Functionality,
    FeatureSection_Card2,
    FeatureSection_Card3,
    GeneralPrayerlist,
    discoverPrayerList,

} from '../../helpers/homepage';

import {
    VerifySSOButton,
    RedirectLogin
} from '../../helpers/Login';

import {  
    Communityleaderboard,
    referalleaderboard,
    LeaderboardTopUser
} from '../../helpers/community';


const BaseUrl = 'https://getdoa.com';

test.beforeEach(async ({ page }) => {
  
    page.on('console', msg => {
        if (msg.type() === 'error' && msg.text().includes('CORS')) {
            return; 
        }
        console.log(msg.text());
    });

    await page.goto(BaseUrl);
});

test('CF-041 | Leaderboard | Page loads and displays main elements', async ({ page }) => {
    await Communityleaderboard(page);
    await referalleaderboard(page);
    await LeaderboardTopUser(page);
});

test('CF-042 | Leaderboard | Leaderboard table displays user rankings', async ({ page }) => {
    await LeaderboardTopUser(page);
});

test('CF-043 | Leaderboard | "How to Join" instructions are visible', async ({ page }) => {
    // Verify 3-step instructions section
});

test('CF-044 | Leaderboard | Navigation and footer elements are present', async ({ page }) => {
    // Verify top nav, language toggle, footer links
});

test('CF-045 | Leaderboard | Language toggle switches between EN and MY', async ({ page }) => {
    // Test language switching functionality
});

test('CF-046 | Leaderboard | Footer links navigate correctly', async ({ page }) => {
    // Test Product, Company, Legal section links
});