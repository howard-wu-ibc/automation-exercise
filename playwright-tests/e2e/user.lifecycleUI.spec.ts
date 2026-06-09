import { test, expect } from "@playwright/test";
import { createTestUser } from "../fixtures/user.fixture.js";
import { SignupPage } from "../pages/signup.page.js";
import { LoginPage } from "../pages/login.page.js";
import { HomePage } from "../pages/home.page.js";

test("User UI lifecycle: Register → Logout → Login → User Delete", async ({
  page,
}) => {
  const user = createTestUser();
  // 1. Register user via UI
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
  console.log(
    `User registered with email: ${user.email} and password: ${user.password}`,
  );
  // 2. Logout user via UI
  const homePage = new HomePage(page);
  await homePage.logout();
  console.log(`User logged out: ${user.email}`);

  // 3. Login user via UI
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.startLogin(user.email, user.password);
  console.log(`User logged in: ${user.email}`);

  // 4. Delete user via UI
  await homePage.deleteAccount();
  console.log(`User deleted: ${user.email}`);
});
