// Locators + actions for /dashboard. No assertions.
class DashboardPage {
  constructor(page) {
    this.page = page;
  }

  // locators

  // actions
  async goto() {
    await this.page.goto('/dashboard');
  }
}

module.exports = { DashboardPage };
