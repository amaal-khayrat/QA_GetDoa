// Locators + actions for /list/:listId. No assertions.
class PublicListPage {
  constructor(page) {
    this.page = page;
  }

  // locators

  // actions
  async goto(listId) {
    await this.page.goto(`/list/${listId}`);
  }
}

module.exports = { PublicListPage };
