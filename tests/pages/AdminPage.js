import { expect} from "@playwright/test";

export class AdminPage {
  constructor(page) {
    this.page = page;

  // locators
    this.sidebarLogo     = page.getByRole('link', { name: 'GetDoa Logo GetDoa' }).getByRole('img');
    this.sidebarTitle    = page.getByRole('link', { name: 'GetDoa Logo GetDoa' }).locator('span.font-serif');
    this.sidebarSubtitle = page.getByText('Prayer Companion');
    this.sidebarDashboardLink = page.locator('a').filter({ hasText: /^Dashboard$/ });

    //Homepage Locator Dashboard
    this.logo = page.getByRole('img', { name: 'GetDoa Logo' }).first();
    this.DashboardLabel = page.getByRole('link', { name: 'Go to Dashboard' });

    //Constants
    this.baseURL = 'https://getdoa.com/';
    this.pageTitle = 'GetDoa - Your Personalized Prayer Journey'
    
  }

  // actions
  async goto() {
    await this.page.goto(`${this.baseURL}dashboard`);
  }

  async verifyDashboardPresent(){
    await expect(this.logo).toBeVisible();
    await expect(this.DashboardLabel).toBeVisible();
    await this.DashboardLabel.click();
  }

  async verifyLoginState(){
    await expect(this.logo).toBeVisible();
    await expect(this.DashboardLabel).toBeVisible();
    await Promise.all([
      this.page.waitForURL(/\/dashboard/),
      this.DashboardLabel.click(),
    ]);
    await expect(this.page).toHaveURL(/\/dashboard/);
  }

  async verifyDashboardPage(){
    await expect(this.sidebarLogo ).toBeVisible();
    await expect(this.sidebarTitle  ).toBeVisible();
    await expect(this.sidebarSubtitle).toBeVisible();
    await expect(this.sidebarDashboardLink).toBeVisible();
  }
}


