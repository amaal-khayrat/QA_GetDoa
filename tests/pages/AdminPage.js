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

    //Homepage Dashboard navigator
    this.sidebar = page.locator('[data-slot="sidebar-menu"]');

    this.navDashboard      = this.sidebar.getByRole('button', { name: 'Dashboard' });
    this.navCreateDoaList  = this.sidebar.getByRole('button', { name: 'Create Doa List' });
    this.navCreateDoaImage = this.sidebar.getByRole('button', { name: 'Create Doa Image' });
    this.navBrowseDuas     = this.sidebar.getByRole('button', { name: 'Browse Duas' });
    this.navDiscoverLists  = this.sidebar.getByRole('button', { name: 'Discover Lists' });
    this.navFavorites      = this.sidebar.getByRole('button', { name: 'Favorites' });
    this.navProfile        = this.sidebar.getByRole('button', { name: 'Profile Settings' });
    this.navInviteFriends  = this.sidebar.getByRole('button', { name: 'Invite Friends' });

    // Navigable links (aria-current / data-status live on the <a>)
    this.dashboardLink     = this.sidebar.locator('a[href="/dashboard"]');
    this.createDoaListLink = this.sidebar.locator('a[href="/dashboard/create-doa-list"]');
    this.createDoaImgLink  = this.sidebar.locator('a[href="/dashboard/doa-image"]');
    this.browseDuasLink    = this.sidebar.locator('a[href="/doa"]');
    this.discoverListsLink = this.sidebar.locator('a[href="/lists"]');
    this.profileLink       = this.sidebar.locator('a[href="/dashboard/profile"]');
    this.invriteFriendsLink = this.sidebar.locator('a[href="/dashboard/referrals"]');
    this.userAccount = page.getByRole('button', { name: 'Test Jun testjun1306@gmail.com' })
    
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

  async verifyDashboardNavi(){
    await expect(this.navDashboard).toBeVisible();
    await expect(this.navCreateDoaList).toBeVisible();
    await expect(this.navCreateDoaImage).toBeVisible();
    await expect(this.navBrowseDuas).toBeVisible();
    await expect(this.navDiscoverLists).toBeVisible();
    await expect(this.navFavorites).toBeVisible();
    await expect(this.navInviteFriends).toBeVisible();
    await expect(this.navProfile).toBeVisible();
  }

  async verifyAllIconsPresent() {
    await expect(this.navDashboard.locator('svg').first()).toBeVisible();
    await expect(this.navCreateDoaList.locator('svg').first()).toBeVisible();
    await expect(this.navCreateDoaImage.locator('svg').first()).toBeVisible();
    await expect(this.navBrowseDuas.locator('svg').first()).toBeVisible();
    await expect(this.navDiscoverLists.locator('svg').first()).toBeVisible();
    await expect(this.navFavorites.locator('svg').first()).toBeVisible();
    await expect(this.navProfile.locator('svg').first()).toBeVisible();
    await expect(this.navInviteFriends.locator('svg').first()).toBeVisible();
  }

  async VerifyUserAccount(){
    await expect(this.userAccount).toBeVisible();
    await this.userAccount.click();
    await expect(this.page.getByText('Log out')).toBeVisible();
    await this.page.getByText('Log out').click();
  }

}


