import { test, expect } from "@playwright/test";
import { readFileSync } from "fs";
import Papa from "papaparse";
import { deleteUser, createUser } from "../api/helpers/user.api.js";
import { TestUser } from "../fixtures/user.fixture.js";

test.describe("Bulk User Lifecycle: API create → API delete", () => {
  let users: TestUser[] = [];

  test.beforeAll(() => {
    // Read and parse CSV file
    const csvData = readFileSync("users.csv", "utf8");
    const parsed = Papa.parse(csvData, {
      header: true,
      skipEmptyLines: true,
    });

    const timestamp = Date.now();
    users = parsed.data.map((row: any, index: number) => ({
      name: row.name,
      email: `${row.email.split('@')[0]}_${timestamp}_${index}@example.com`,
      password: row.password,
      title: row.title,
      birth_date: row.birth_date,
      birth_month: row.birth_month,
      birth_year: row.birth_year,
      first_name: row.first_name,
      last_name: row.last_name,
      company: row.company,
      address1: row.address1,
      address2: row.address2,
      country: row.country,
      state: row.state,
      city: row.city,
      zipcode: row.zipcode,
      mobile_number: row.mobile_number,
    }));
  });

  test("Bulk create and delete users", async ({ request }) => {
    // Create all users
    for (const user of users) {
      console.log(`Creating user: ${user.email}`);
      await createUser(request, user);
    }

    // Delete all users
    for (const user of users) {
      console.log(`Deleting user: ${user.email}`);
      await deleteUser(request, user.email, user.password);
    }
  });
});
