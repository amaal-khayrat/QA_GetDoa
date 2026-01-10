import { expect } from '@playwright/test';

const PageTitle = "GetDoa - Your Personalized Prayer Journey";
const PageMetaTag ="Immerse yourself in a sanctuary of digital serenity. Access authentic Doa, curate your daily supplications, and connect with the divine through a beautifully crafted experience."

export async function VerifySEOElement(page) {
    await expect(page).toHaveTitle(PageTitle);
    
    await page.getAttribute('meta[name="description"]', 'content');
    expect (PageMetaTag).toEqual(PageMetaTag)
}