import { test, expect } from '@playwright/test';

export async function Communityleaderboard (page){

    const elementToScrollTo = page.getByRole('heading', { name: 'Community Leaderboard' });
    await elementToScrollTo.scrollIntoViewIfNeeded();
    
    const trophyIcon = page.locator('svg.lucide-trophy');
    await expect(trophyIcon).toBeVisible();
    await expect(page.getByText('Community Leaderboard')).toBeVisible();
    await expect(page.getByText("See who's spreading the word about GetDoa. Join our referral program and climb the ranks!")).toBeVisible();
    
    const btnleaderboard = page.getByRole('link', { name: 'View Leaderboard' });
    await expect (btnleaderboard).toBeVisible();
    await btnleaderboard.click();
}

export async function referalleaderboard (page){
    const trophyIcon = page.locator('svg.lucide-trophy');

    await expect(page).toHaveURL('https://getdoa.com/leaderboard');

    await expect(trophyIcon).toBeVisible();
    await expect(page.getByText('Referral Leaderboard')).toBeVisible();
    await expect(page.getByText('Top community members who are spreading the word about GetDoa')).toBeVisible();
}

export async function LeaderboardTopUser (page){

    const crownIcon = page.locator('svg.lucide-crown');
    await expect(crownIcon).toBeVisible();
    

    const avatar = page.locator('[data-slot="avatar-fallback"]:has-text("H")');
    await expect(avatar).toBeVisible();
    

    await expect(page.getByText(/H\*\*\* A\*\*\*/)).toBeVisible();
    
    await expect(page.getByText('40')).toBeVisible();
    await expect(page.getByText('referrals')).toBeVisible();

    const leaderboardCard = page.locator('[data-slot="card"].border-yellow-300');
    await expect(leaderboardCard).toBeVisible();

    await expect(leaderboardCard).toHaveClass(/from-yellow-50/);

}
