import { expect} from "@playwright/test";

export class Auth{
  constructor(page){

    this.page =page;

//Homepage locators

     this.logo = page.getByRole('img', { name: 'GetDoa Logo' }).first();
     this.SSOButton = page.getByRole('link', {name: 'Sign In with Google'});



// login page locator
     this.LoginHeader = page.locator('[data-slot="card-title"]');
     this.LoginSubtext = page.locator('[data-slot="card-description"]');
     this.LoginButton = page.getByRole('button', {name: 'Continue with Google'});

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
    await expect(this.SSOButton).toHaveText('Sign In with Google');
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