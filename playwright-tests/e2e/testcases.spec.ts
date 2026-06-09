import { test, expect } from "@playwright/test";
import { createTestUser } from "../fixtures/user.fixture.js";
import { SignupPage } from "../pages/signup.page.js";
import { LoginPage } from "../pages/login.page.js";
import { HomePage } from "../pages/home.page.js";
import { closeAdIfPresent } from "../utils/adHandler.js";

let user_email: string = "testuser_1779295006186@example.com";
let user_password: string = "Password123!";
test("Register User", async ({ page }) => {
  const user = createTestUser();
  const signupPage = new SignupPage(page);
  await signupPage.goto();
  await signupPage.startSignup(user.name, user.email);
  await signupPage.completeSignup(
    user.password,
    user.title,
    user.birth_date,
    user.birth_month,
    user.birth_year,
    user.first_name,
    user.last_name,
    user.company,
    user.address1,

    user.address2,
    user.country,
    user.state,
    user.city,
    user.zipcode,
    user.mobile_number,
  );
  expect(await page.locator("text=ACCOUNT CREATED!").isVisible());
  console.log(
    `User registered with email: ${user.email} and password: ${user.password}`,
  );
});

test("Login User with correct email and password", async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.startLogin(user_email, user_password);
  const homePage = new HomePage(page);
  expect(await homePage.isLoggedIn()).toBeTruthy();
});

test("Login User with incorrect email and password", async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.startLogin(user_email, "WrongPassword!");
  await expect(
    page.locator("text=Your email or password is incorrect!"),
  ).toBeVisible();
  await loginPage.startLogin("WrongEmail@example.com", user_password);
  await expect(
    page.locator("text=Your email or password is incorrect!"),
  ).toBeVisible();
  await loginPage.startLogin("WrongEmail@example.com", "WrongPassword!");
  await expect(
    page.locator("text=Your email or password is incorrect!"),
  ).toBeVisible();
});

test("Logout User", async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.startLogin(user_email, user_password);
  const homePage = new HomePage(page);
  await homePage.logout();
  expect(await homePage.isLoggedIn()).toBeFalsy();
});

test("Register User with existing email", async ({ page }) => {
  const signupPage = new SignupPage(page);
  await signupPage.goto();
  await signupPage.startSignup("New User", user_email);

  await expect(page.locator("text=Email Address already exist!")).toBeVisible();
});

test("Contact Us form submission", async ({ page }) => {
  const homePage = new HomePage(page);
  await homePage.goto();
  await page.getByRole("link", { name: "Contact us" }).click();
  await page.waitForTimeout(1000); // Wait for the contact form to load
  await page.getByRole("textbox", { name: "Name" }).fill("Test User");
  await page
    .getByRole("textbox", { name: "Email", exact: true })
    .fill("testuser@example.com");
  await page.getByRole("textbox", { name: "Subject" }).fill("Test Subject");
  await page
    .getByRole("textbox", { name: "Message" })
    .fill("This is a test message.");
  await page.locator('input[type="file"]').setInputFiles("testfile.txt");
  page.on("dialog", async (dialog) => {
    console.log("Popup message:", dialog.message());
    await dialog.accept(); // ok
  });
  await page.getByRole("button", { name: "Submit" }).click();

  await expect(
    page.locator("#contact-page").getByText("Success! Your details have"),
  ).toBeVisible();
});

test("Verify Test Cases Page", async ({ page }) => {
  const homePage = new HomePage(page);
  await homePage.goto();
  await page.getByRole("link", { name: " Test Cases" }).click();
  await expect(page.locator("b")).toContainText("Test Cases");
});

test("Verify All Products and product detail page", async ({ page }) => {
  const homePage = new HomePage(page);
  await homePage.goto();
  await page.getByRole("link", { name: "Products" }).click();
  await closeAdIfPresent(page);
  await expect(
    page.getByRole("heading", { name: "All Products" }),
  ).toBeVisible();

  await page.getByRole("link", { name: "View Product" }).first().click();
  await closeAdIfPresent(page);
  await expect(page.locator(".product-information h2")).toBeVisible(); // name
  await expect(page.getByText("Category: Women > Tops")).toBeVisible(); // category
  await expect(page.getByText("Rs.")).toBeVisible(); // price
  await expect(
    page.locator(
      "//p[b[text()='Availability:'] and contains(text(),'In Stock')]",
    ),
  ).toBeVisible(); // availability
  await expect(
    page.locator("//p[b[text()='Condition:'] and contains(text(),'New')]"),
  ).toBeVisible(); // condition
  await expect(
    page.locator("//p[b[text()='Brand:'] and contains(text(),'Polo')]"),
  ).toBeVisible(); // brand
});
