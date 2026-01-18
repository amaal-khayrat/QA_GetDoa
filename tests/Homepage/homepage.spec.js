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
    Communityleaderboard
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

        test('CF-007 | Homepage | Secondary CTA buttons navigates correctly', async ({ page }) => {
            await ClickSecondaryCTA(page);
        });

        test('CF-008 | Homepage | Doa Card Carousel', async ({ page }) => {
            await ClickSecondaryCTA(page);
        });
        
    });

    test.describe('Features Section', () =>{

        test('CF-009 | Homepage | Verify Feature Section is present', async ({ page }) => {
            await GeneralFeatureSection(page);
            await FeatureSection_Card1(page);
            await FeatureSection_Card2(page);
            await FeatureSection_Card3(page);
        });

        test('CF-010 | Homepage | Verify the "Explore Lists" Link" on the Discover Shared Doa Card', async ({ page }) => {
            await GeneralFeatureSection(page);
            await FeatureSection_Card1(page);
            await Card1_Functionality(page);
            await GeneralPrayerlist(page);
        });

        test('CF-011 | Homepage | Verify "Community Leaderboard" is present', async ({ page }) => {
            await Communityleaderboard(page);
        });
        
    });

    test.describe('Enhanced Features Section', () =>{

        test('CF-012 | Homepage | Verify Enhanced Feature Section is present', async ({ page }) => {

        });

        test('CF-013 | Homepage | Verify "Compose Your Prayers" Card', async ({ page }) => {

        });

        test('CF-014 | Homepage |  Verify "AI Doa Assistant" Card', async ({ page }) => {

        });

        test('CF-015 | Homepage | Verify "Download & Offline" Card', async ({ page }) => {

        });

        test('CF-016 | Homepage | Verify "Write in Your Language" Card', async ({ page }) => {

        });

        test('CF-017 | Homepage | Verify "Share Instantly via QR" Card', async ({ page }) => {

        });

        test('CF-018 | Homepage | Verify "Bookmark Favorites" Card', async ({ page }) => {

        });

        test('CF-019 | Homepage | Verify "Sign Up for Free" Button', async ({ page }) => {

        });

        test('CF-020 | Homepage |  Verify "Create Doa Image" Button', async ({ page }) => {

        });

    });

    test.describe('Call-To-Action Section',() =>{
                
        test('CF-021 | Homepage | Verify CTA Section is present and visible', async ({ page }) => {

        });

        test('CF-022 | Homepage | Verify "Create Your Doa List" Button', async ({ page }) => {

        });

        test('CF-023 | Homepage | Verify "Browse Lists" Button', async ({ page }) => {

        });

        test('CF-024 | Homepage | Verify "Create Doa Image" Button', async ({ page }) => {

        });

        test('CF-025 | Homepage | Verify Button Order', async ({ page }) => {

        });
        test('CF-026 | Homepage | Verify Multiple Button Clicks', async ({ page }) => {

        });
    });

    test.describe('Footer Section',() =>{
                
        test('CF-027 | Homepage | Verify Footer Section is present and visible', async ({ page }) => {

        });

        test('CF-028 | Homepage | Verify GetDoa Logo Display', async ({ page }) => {

        });

        test('CF-029 | Homepage | Verify Tagline Display', async ({ page }) => {

        });

        test('CF-030 | Homepage | Verify Footer Navigation Groups', async ({ page }) => {

        });

        test('CF-031 | Homepage | Test "Pricing" Link', async ({ page }) => {

        });
        test('CF-032 | Homepage | Test "About" Link', async ({ page }) => {

        });

        test('CF-033 | Homepage | Test "Contact" Link', async ({ page }) => {

        });

        test('CF-034 | Homepage | Test "Privacy Policy" Link', async ({ page }) => {

        });
        test('CF-035| Homepage | Test "Terms of Service" Link', async ({ page }) => {

        });

        test('CF-36 | Homepage | Test "Refund Policy" Link', async ({ page }) => {

        });

        test('CF-037 | Homepage | Verify Copyright Text', async ({ page }) => {

        });
        test('CF-038 | Homepage | Test GitHub Social Link', async ({ page }) => {

        });

        test('CF-039 | Homepage | Verify External Link Behavior', async ({ page }) => {

        });

        test('CF-040 | Homepage | Test Footer Logo Click', async ({ page }) => {

        });
    });
    
});