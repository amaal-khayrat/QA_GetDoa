import { expect } from '@playwright/test';

const PageTitle = "GetDoa - Your Personalized Prayer Journey";
const PageMetaTag ="Immerse yourself in a sanctuary of digital serenity. Access authentic Doa, curate your daily supplications, and connect with the divine through a beautifully crafted experience."


export async function GeneralHomepage (Page){
    const LogoLocator = page.getByRole('img', { name: 'GetDoa Logo' }).first();
    await expect(LogoLocator).toBeVisible();

    await LogoLocator.click();
}

export async function VerifySEOElement(page) {
    await expect(page).toHaveTitle(PageTitle);

    const metaDescription = await page.getAttribute('meta[name="description"]', 'content');
    expect (metaDescription).toBe(PageMetaTag);
}

export async function VerifyLogoVisibility (page) {
    const LogoLocator = page.getByRole('img', { name: 'GetDoa Logo' }).first();
    await expect(LogoLocator).toBeVisible();

    await expect(LogoLocator).toHaveAttribute('alt', 'GetDoa Logo');
    await expect(LogoLocator).toHaveAttribute('src', '/logo.svg');
}

export async function HeroSectionText (page) {
    const HeroHeadingText = page.getByRole('heading', { name: 'Create Your Personalized Prayer'})

    await expect(HeroHeadingText).toBeVisible();
    await expect(page.getByText('Immerse yourself in a sanctuary of digital serenity. Access authentic Doa and curate your daily supplications.')).toBeVisible(); 
}

export async function Button_primeCTA (page) {
    const PrimeHeroBtn= page.getByRole('link', { name: 'Create Your Doa List' }).first();

    await expect(PrimeHeroBtn).toBeVisible(); 
    await expect(PrimeHeroBtn).toHaveAttribute('href', '/onboarding');
}

export async function ClickPrimeCTA (page) {
    const primeHeroBtn= page.getByRole('link', { name: 'Create Your Doa List' }).first();

    await expect(primeHeroBtn).toBeVisible();
    
    await Promise.all([
        page.waitForURL('**/onboarding**', { timeout: 10000 }),
        primeHeroBtn.click()
    ]);

    await expect(page).toHaveURL('https://getdoa.com/login?ref=%2Fonboarding');
    await page.goBack();

    await expect(page).toHaveURL('https://getdoa.com');
}

export async function Button_SecondaryCTA(page) {
    const SecondaryHeroBtn= page.getByRole('link', { name: 'See Doa Library' })

    await expect(SecondaryHeroBtn).toBeVisible(); 
    await expect(SecondaryHeroBtn).toHaveAttribute('href', '/doa');
}

export async function ClickSecondaryCTA(page) {
    const SecondaryHeroBtn = page.getByRole('link', { name: 'See Doa Library' })

    await expect(SecondaryHeroBtn).toBeVisible(); 
    
    await Promise.all([
        page.waitForURL('https://getdoa.com/doa', { timeout: 300000 }), // 60 seconds
        SecondaryHeroBtn.click(),
    ]);
    await page.waitForLoadState('domcontentloaded')
    await expect(page.getByText('Blessing in Wealth and Offspring Doa')).toBeVisible(); 
    await expect(page).toHaveURL('https://getdoa.com/doa');
}

export async function GeneralFeatureSection(page) {  
    const elementToScrollTo = page.getByRole('heading', { name: 'Public Features' });

    await elementToScrollTo.scrollIntoViewIfNeeded();

    const FeatureHeader = page.getByRole('heading', { name: 'Public Features' });
    await expect(FeatureHeader).toBeVisible();
    await expect(page.getByText('Essential tools accessible to everyone, designed to begin your spiritual journey with ease.')).toBeVisible(); 

    const SectionImg = page.getByRole('img', { name: 'People praying together' });
    await expect(SectionImg).toBeVisible();  // Added 'expect'
    await expect(SectionImg).toHaveAttribute('src', '/people_berdoa.svg');
}

export async function FeatureSection_Card1(page){
    const Card1 = page.getByRole('link', { name: 'Discover Shared Doa Explore a' })

    await expect (Card1).toBeVisible();
    await expect(page.getByText('Discover Shared Doa')).toBeVisible();
    await expect(page.getByText('Explore a diverse collection of prayers shared by the community for inspiration.')).toBeVisible();
}

export async function FeatureSection_Card2(page){
    const Card2 =   await page.getByText('Trusted ReferencesAccess');

    await expect (Card2).toBeVisible();
    await expect(page.getByText('Access prayers backed by authentic references for peace of mind.')).toBeVisible();  
}

export async function FeatureSection_Card3(page){
    const Card3 = await page.getByText('Guided TutorialsSeamlessly');

    await expect (Card3).toBeVisible();
    await expect(page.getByText('Seamlessly learn to navigate and utilize the app with helpful guidance.')).toBeVisible();
}

export async function Card1_Functionality(page){
    const exploreButton = page.getByRole('link', { name: 'Explore Lists' });
    await expect(exploreButton).toBeVisible();
    await exploreButton.click(page);

}

export async function GeneralPrayerlist(page){

    //Doa listed URL
    await expect(page).toHaveURL('https://getdoa.com/lists?page=1&sort=newest&q=');

    //Navi Logo
    const LogoLocator = page.getByRole('img', { name: 'GetDoa Logo' }).first();
    await expect(LogoLocator).toBeVisible();

    // Languange Toogle
    const languageToggle = page.getByRole('radiogroup', { name: 'Language selection' });
    await expect(languageToggle).toBeVisible();
    
    const enButton = page.getByRole('radio', { name: 'EN' });
    await expect(enButton).toBeVisible();
    await expect(enButton).toHaveAttribute('aria-checked', 'true');
    
    const myButton = page.getByRole('radio', { name: 'MY' });
    await expect(myButton).toBeVisible();
    await expect(myButton).toHaveAttribute('aria-checked', 'false');

}

export async function discoverPrayerList(page){
    await expect(page.getByText('Discover Prayer Lists')).toBeVisible();
    await expect(page.getByText('Browse curated doa collections from our community')).toBeVisible();

    const Searchbar = page.getByRole('searchbox', { name: 'Search prayer lists' });
    await expect(Searchbar).toBeVisible();
    await expect(Searchbar).toHaveAttribute('placeholder', 'Search lists by name or description...');
}

export async function Communityleaderboard(page){
        

    const elementToScrollTo = page.getByRole('heading', { name: 'Community Leaderboard' });
    await elementToScrollTo.scrollIntoViewIfNeeded();
    
    const trophyIcon = page.locator('svg.lucide-trophy');
    await expect(trophyIcon).toBeVisible();
    await expect(page.getByText('Community Leaderboard')).toBeVisible();
    await expect(page.getByText("See who's spreading the word about GetDoa. Join our referral program and climb the ranks!")).toBeVisible();
    
    const btnleaderboard = page.getByRole('link', { name: 'View Leaderboard' });
    await expect (btnleaderboard).toBeVisible();
    await expect(btnleaderboard).toHaveAttribute('href', '/leaderboard');
}