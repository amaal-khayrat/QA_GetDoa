// Locators + actions for the login page. No assertions.
class LoginPage {
  constructor(page) {
    this.page = page;
  }

  // locators

  // actions
  async goto() {
    await this.page.goto('/login');
  }
}

module.exports = { LoginPage };
