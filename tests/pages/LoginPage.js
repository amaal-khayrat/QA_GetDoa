import { expect} from "@playwright/test";

export class Auth{
  constructor(page){

    this.page =page;

//Homepage locators

    this.logo = page.getByRole('img', { name: 'GetDoa Logo' }).first();
    this.SSOButton = page.getByRole('link', {name: 'Sign In with Google'});

//Modal Sizing
    this.ModalSize = page.locator('div.relative.w-full.max-w-md');
    this.ModalClose = page.getByRole('link', { name: 'Close' });

// login page locators
     this.LoginHeader = page.getByText('Welcome to GetDoa', { exact: true });
     this.LoginSubtext = page.getByText('Continue your prayer journey with Google');
     this.LoginButton = page.getByRole('button', { name: 'Continue with Google' });

// Register page locator
     this.RegisterSubtext = page.getByText('New to GetDoa');
     this.RegisterButton = page.getByRole('button', { name: 'Create a free account' });

//Constants
    this.baseURL = 'https://getdoa.com/';
    this.pageTitle = 'GetDoa - Your Personalized Prayer Journey'

  }

  async navigate(){
    await this.page.goto(this.baseURL)
  }

  // Verification methods
  async verifyPageTitle() {
    await expect(this.page).toHaveTitle(this.pageTitle);
  }

  async verifyLogo() {
    await expect(this.logo).toBeVisible();
    await expect(this.logo).toHaveAttribute('alt', 'GetDoa Logo');
    await expect(this.logo).toHaveAttribute('src', '/logo.svg');
    await expect(this.logo).toHaveClass(/rounded-lg/);
  }

  async verifySSOButton (){
    await expect(this.SSOButton).toBeVisible();
    await expect(this.SSOButton).toHaveText('Sign in with Google');
    await this.SSOButton.click();
    await expect(this.page).toHaveURL('https://getdoa.com/login');
  }

  async verifyLoginPage(){
    await expect(this.LoginHeader).toHaveText('Welcome to GetDoa');
    await expect(this.LoginSubtext).toHaveText('Continue your prayer journey with Google');
    await expect(this.LoginButton).toHaveText('Continue with Google');
  }

  async verifyGoogleRedirect() {
    await this.LoginButton.click();
    await expect(this.page).toHaveURL(/accounts\.google\.com/);
  }
}