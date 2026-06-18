import { expect} from "@playwright/test";

export class Auth{
  constructor(page){

    this.page =page;

    //Authenticaton locators

     this.logo = page.getByRole('img', { name: 'GetDoa Logo' }).first();
     this.SSOButton = page.getByRole('link', {name: 'Sign In with Google'});

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
  }

}