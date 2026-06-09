import { test, expect, request } from "@playwright/test";

test("API 11: POST To Create/Register User Account", async ({ request }) => {
  const email = `validuser101@example.com`;
  const response = await request.post(
    "https://automationexercise.com/api/createAccount",
    {
      headers: {
        Accept: "application/json",
      },

      form: {
        name: "Valid User",
        email: email,
        password: "password123",
        title: "Mr",
        birth_date: "1",
        birth_month: "1",
        birth_year: "1990",
        firstname: "John",
        lastname: "Doe",
        company: "Example Inc.",
        address1: "123 Main St",
        address2: "Apt 4B",
        country: "United States",
        state: "California",
        city: "Los Angeles",
        zipcode: "90001",
        mobile_number: "1234567890",
      },
    },
  );
  const responseBody = await response.json();
  console.log("Response Body:", responseBody);
  expect(responseBody.responseCode).toBe(201);
  expect(responseBody.message).toEqual("User created!");
});
test("API 1: Get All Product List", async ({ request }) => {
  const response = await request.get(
    "https://automationexercise.com/api/productsList",
  );

  expect(response.status()).toBe(200);
  const responseBody = await response.json();
  expect(responseBody).toHaveProperty("products");
  expect(responseBody.products.length).toBeGreaterThan(0);
  expect(responseBody.products[0]).toHaveProperty("id");
  expect(responseBody.products[0]).toHaveProperty("name");
  expect(responseBody.products[0]).toHaveProperty("price");
  // console.log("Response Body:", responseBody);
});

test("API 2: POST To all Product List", async ({ request }) => {
  const response = await request.post(
    "https://automationexercise.com/api/productsList",
  );
  const responseBody = await response.json();
  expect(responseBody.responseCode).toBe(405);
  expect(responseBody.message).toEqual("This request method is not supported.");
  // console.log("Response Body:", responseBody);
});

test("API 3: Get All Brand List", async ({ request }) => {
  const response = await request.get(
    "https://automationexercise.com/api/brandsList",
  );
  const responseBody = await response.json();
  expect(responseBody.responseCode).toBe(200);
  expect(responseBody).toHaveProperty("brands");
  expect(responseBody.brands.length).toBeGreaterThan(0);
  expect(responseBody.brands[0]).toHaveProperty("id");
  expect(responseBody.brands[0]).toHaveProperty("brand");
  // console.log("Response Body:", responseBody);
});

test("API 4 PUT To All Brands List", async ({ request }) => {
  const response = await request.put(
    "https://automationexercise.com/api/brandsList",
  );
  const responseBody = await response.json();
  expect(responseBody.responseCode).toBe(405);
  expect(responseBody.message).toEqual("This request method is not supported.");
  // console.log("Response Body:", responseBody);
});

test("API 5: POST To Search Product", async ({ request }) => {
  const response = await request.post(
    "https://automationexercise.com/api/searchProduct",
    {
      form: {
        search_product: "top",
      },
    },
  );
  const responseBody = await response.json();
  expect(responseBody.responseCode).toBe(200);
  expect(responseBody).toHaveProperty("products");
  // Validate each product in the response contains the search term "top"
  responseBody.products.forEach((product: any) => {
    // console.log(JSON.stringify(product.category, null, 2));

    // keyword can be either in name or category
    const nameContainskeyword = product.name.toLowerCase().includes("top");
    const categoryContainskeyword = product.category.category
      .toLowerCase()
      .includes("top");
    expect(nameContainskeyword || categoryContainskeyword).toBeTruthy();
  });
  // console.log("Response Body:", responseBody);
});

test("API 6: POST To Search Product without search_product parameter", async ({
  request,
}) => {
  const response = await request.post(
    "https://automationexercise.com/api/searchProduct",
    {
      form: {
        // search_product parameter is intentionally left out to test the API's response
      },
    },
  );
  const responseBody = await response.json();
  expect(responseBody.responseCode).toBe(400);
  expect(responseBody.message).toEqual(
    "Bad request, search_product parameter is missing in POST request.",
  );
  // console.log("Response Body:", responseBody);
});

test("API 7: POST To Verify Login with Valid Details ", async ({ request }) => {
  const response = await request.post(
    "https://automationexercise.com/api/verifyLogin",
    {
      form: {
        email: "validuser101@example.com",
        password: "password123",
      },
    },
  );
  const responseBody = await response.json();
  expect(responseBody.responseCode).toBe(200);
  expect(responseBody.message).toEqual("User exists!");
  // console.log("Response Body:", responseBody);
});

test("API 8: POST To Verify Login without email ", async ({ request }) => {
  const response = await request.post(
    "https://automationexercise.com/api/verifyLogin",
    {
      form: {
        password: "xbuWGY@XWcH4YMx",
      },
    },
  );
  const responseBody = await response.json();
  expect(responseBody.responseCode).toBe(400);
  expect(responseBody.message).toEqual(
    "Bad request, email or password parameter is missing in POST request.",
  );
  // console.log("Response Body:", responseBody);
});

test("API 9: DELETE To Verify Login ", async ({ request }) => {
  const response = await request.delete(
    "https://automationexercise.com/api/verifyLogin",
  );
  const responseBody = await response.json();
  expect(responseBody.responseCode).toBe(405);
  expect(responseBody.message).toEqual("This request method is not supported.");
  // console.log("Response Body:", responseBody);
});

test("API 10: POST To Verify Login with invalid details", async ({
  request,
}) => {
  const response = await request.post(
    "https://automationexercise.com/api/verifyLogin",
    {
      form: {
        email: "howard@gmail.com",
        password: "xbuWGY@XWcHs4YMx",
      },
    },
  );
  const responseBody = await response.json();
  expect(responseBody.responseCode).toBe(404);
  expect(responseBody.message).toEqual("User not found!");
  // console.log("Response Body:", responseBody);
});

test("API 13: PUT METHOD To Update User Account ", async ({ request }) => {
  const response = await request.put(
    "https://automationexercise.com/api/updateAccount",
    {
      form: {
        name: "John Doess",
        email: "validuser101@example.com",
        password: "password123",
        title: "Mr",
        birth_date: "1",
        birth_month: "1",
        birth_year: "1990",
        first_name: "John",
        last_name: "Doe",
        company: "Example Inc.",
        address1: "123 Main St",
        address2: "Apt 4B",
        country: "United States",
        state: "California",
        city: "Los Angeles",
        zipcode: "90001",
        mobile_number: "1234567890",
      },
    },
  );
  const responseBody = await response.json();
  expect(responseBody.responseCode).toBe(200);
  expect(responseBody.message).toEqual("User updated!");
  // console.log("Response Body:", responseBody);
});

test("API 14: GET user account detail by email ", async ({ request }) => {
  const response = await request.get(
    "https://automationexercise.com/api/getUserDetailByEmail?email=validuser101@example.com",
  );
  const responseBody = await response.json();
  console.log("Response Body:", responseBody);
  expect(responseBody.responseCode).toBe(200);
});

test("API 12: DELETE METHOD To Delete User Account ", async ({ request }) => {
  const response = await request.delete(
    "https://automationexercise.com/api/deleteAccount",
    {
      form: {
        email: "validuser101@example.com",
        password: "password123",
      },
    },
  );
  const responseBody = await response.json();
  expect(responseBody.responseCode).toBe(200);
  expect(responseBody.message).toEqual("Account deleted!");
  // console.log("Response Body:", responseBody);
});
