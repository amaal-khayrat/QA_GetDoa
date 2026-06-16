// Locators + actions for /doa. No assertions.
class DuaBrowsePage {
  constructor(page) {
    this.page = page;
  }

  // locators

  // actions
  async goto() {
    await this.page.goto('/doa');
  }
}

module.exports = { DuaBrowsePage };
