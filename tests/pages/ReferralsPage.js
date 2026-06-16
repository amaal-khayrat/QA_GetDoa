// Locators + actions for /dashboard/referrals. No assertions.
class ReferralsPage {
  constructor(page) {
    this.page = page;
  }

  // locators

  // actions
  async goto() {
    await this.page.goto('/dashboard/referrals');
  }
}

module.exports = { ReferralsPage };
