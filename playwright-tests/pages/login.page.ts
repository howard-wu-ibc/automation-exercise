import { Page, expect } from "@playwright/test";

export class LoginPage {
  constructor(private page: Page) {}

  async goto() {
    await this.page.goto("https://automationexercise.com/login");
  }

  async startLogin(email: string, password: string) {
    await this.page.fill('[data-qa="login-email"]', email);
    await this.page.fill('[data-qa="login-password"]', password);
    await this.page.click('[data-qa="login-button"]');
  }
}
