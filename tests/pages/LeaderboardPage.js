// Locators + actions for /leaderboard. No assertions.
class LeaderboardPage {
  constructor(page) {
    this.page = page;
  }

  // locators

  // actions
  async goto() {
    await this.page.goto('/leaderboard');
  }
}

module.exports = { LeaderboardPage };
