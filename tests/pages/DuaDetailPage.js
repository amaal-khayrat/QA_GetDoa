// Locators + actions for /doa/:slug. No assertions.
class DuaDetailPage {
  constructor(page) {
    this.page = page;
  }

  // locators

  // actions
  async goto(slug) {
    await this.page.goto(`/doa/${slug}`);
  }
}

module.exports = { DuaDetailPage };
