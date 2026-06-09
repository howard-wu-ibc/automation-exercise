import { Page, expect } from "@playwright/test";

export class SignupPage {
  constructor(private page: Page) {}

  async goto() {
    await this.page.goto("https://automationexercise.com/signup", {
      waitUntil: "domcontentloaded",
    });
  }

  async startSignup(name: string, email: string) {
    await this.page.fill('[data-qa="signup-name"]', name);
    await this.page.fill('[data-qa="signup-email"]', email);
    await this.page.click('[data-qa="signup-button"]');
  }

  async completeSignup(
    password: string,
    title: string,
    birth_date: string,
    birth_month: string,
    birth_year: string,
    first_name: string,
    last_name: string,
    company: string,
    address1: string,
    address2: string,
    country: string,
    state: string,
    city: string,
    zipcode: string,
    mobile_number: string,
  ) {
    await this.page.locator(`input[name="title"][value="${title}"]`).check();
    await this.page.fill("#password", password);
    await this.page.locator("#days").selectOption(birth_date);
    await this.page.locator("#months").selectOption(birth_month);
    await this.page.locator("#years").selectOption(birth_year);
    await this.page.getByRole("textbox", { name: "First name *" }).click();
    await this.page
      .getByRole("textbox", { name: "First name *" })
      .fill(first_name);
    await this.page.getByRole("textbox", { name: "Last name *" }).click();
    await this.page
      .getByRole("textbox", { name: "Last name *" })
      .fill(last_name);
    await this.page
      .getByRole("textbox", { name: "Company", exact: true })
      .click();
    await this.page
      .getByRole("textbox", { name: "Company", exact: true })
      .fill(company);

    await this.page
      .getByRole("textbox", { name: "Address * (Street address, P." })
      .click();
    await this.page
      .getByRole("textbox", { name: "Address * (Street address, P." })
      .fill(address1);
    await this.page.getByRole("textbox", { name: "Address 2" }).click();
    await this.page.getByRole("textbox", { name: "Address 2" }).fill(address2);
    await this.page.getByLabel("Country *").selectOption("United States");
    await this.page.getByRole("textbox", { name: "State *" }).click();
    await this.page.getByRole("textbox", { name: "State *" }).fill(state);
    await this.page.getByRole("textbox", { name: "City * Zipcode *" }).click();
    await this.page
      .getByRole("textbox", { name: "City * Zipcode *" })
      .fill(city);
    await this.page.locator("#zipcode").click();
    await this.page.locator("#zipcode").fill(zipcode);
    await this.page.getByRole("textbox", { name: "Mobile Number *" }).click();
    await this.page
      .getByRole("textbox", { name: "Mobile Number *" })
      .fill(mobile_number);

    await this.page.click('[data-qa="create-account"]');

    await expect(
      this.page.locator('h2[data-qa="account-created"]'),
    ).toContainText("Account Created!");

    await this.page.click('[data-qa="continue-button"]');
  }
}
