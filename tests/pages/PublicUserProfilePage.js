// Locators + actions for /user/:userId. No assertions.
class PublicUserProfilePage {
  constructor(page) {
    this.page = page;
  }

  // locators

  // actions
  async goto(userId) {
    await this.page.goto(`/user/${userId}`);
  }
}

module.exports = { PublicUserProfilePage };
