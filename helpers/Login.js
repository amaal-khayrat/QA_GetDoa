import { expect } from '@playwright/test';

export async function VerifySSOButton(page) {

    const SSOButton = page.getByRole('link', { name: 'Sign In with Google' });    
    
    await expect(SSOButton).toBeVisible();
    await expect(SSOButton).toHaveAttribute('href', '/login');
    await expect(SSOButton).toContainText('Sign In with Google');
    await SSOButton.click();
}

export async function RedirectLogin(page) {

    await expect(page.getByText('Welcome to GetDoa')).toBeVisible();
    await expect(page.getByText('Continue your prayer journey with Google')).toBeVisible();
    
    const ButtonFunction = page.getByRole('button', { name: 'Continue with Google' })
    await expect(ButtonFunction).toBeVisible();

}

