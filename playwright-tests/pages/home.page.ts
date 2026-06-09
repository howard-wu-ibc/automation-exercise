import { Page, expect } from "@playwright/test";

export class HomePage {
  constructor(private page: Page) {}

  async goto() {
    await this.page.goto("https://automationexercise.com");
  }

  async logout() {
    await this.page.getByRole("link", { name: "Logout" }).click();
  }

  async deleteAccount() {
    await this.page.getByRole("link", { name: "Delete Account" }).click();
    await expect(
      this.page.locator('h2[data-qa="account-deleted"]'),
    ).toContainText("Account Deleted!");
  }

  async isLoggedIn(): Promise<boolean> {
    return await this.page.getByRole("link", { name: "Logout" }).isVisible();
  }
}
