// Locators + actions for /admin. No assertions.
class AdminPage {
  constructor(page) {
    this.page = page;
  }

  // locators

  // actions
  async goto() {
    await this.page.goto('/admin');
  }
}

module.exports = { AdminPage };
