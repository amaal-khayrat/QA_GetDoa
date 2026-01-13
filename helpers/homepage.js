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