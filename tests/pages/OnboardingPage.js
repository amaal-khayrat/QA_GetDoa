// Locators + actions for /onboarding. No assertions.
class OnboardingPage {
  constructor(page) {
    this.page = page;
  }

  // locators

  // actions
  async goto() {
    await this.page.goto('/onboarding');
  }
}

module.exports = { OnboardingPage };
