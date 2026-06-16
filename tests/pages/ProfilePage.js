// Locators + actions for /dashboard/profile. No assertions.
class ProfilePage {
  constructor(page) {
    this.page = page;
  }

  // locators

  // actions
  async goto() {
    await this.page.goto('/dashboard/profile');
  }
}

module.exports = { ProfilePage };
