// Locators + actions for /lists (community lists discovery). No assertions.
class PublicListsPage {
  constructor(page) {
    this.page = page;
  }

  // locators

  // actions
  async goto() {
    await this.page.goto('/lists');
  }
}

module.exports = { PublicListsPage };
