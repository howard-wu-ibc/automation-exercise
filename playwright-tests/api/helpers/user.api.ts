import { APIRequestContext, expect } from "@playwright/test";
import { TestUser } from "../../fixtures/user.fixture.js";

const baseUrl = "https://automationexercise.com/api";

export async function deleteUser(
  request: APIRequestContext,
  email: string,
  password: string,
) {
  const response = await request.delete(`${baseUrl}/deleteAccount`, {
    form: {
      email,
      password,
    },
  });

  const body = await response.json();
  expect(body.responseCode).toBe(200);
  expect(body.message).toContain("Account deleted");
  // DEMO DISPLAY DELETION INFO IN CONSOLE
  console.log(`User deleted successfully via API: ${email}`, body.message);
}

export async function getUserByEmail(
  request: APIRequestContext,
  email: string,
) {
  const response = await request.get(
    `${baseUrl}/getUserDetailByEmail?${email}`,
    {
      params: {
        email,
      },
    },
  );
  const body = await response.json();
  expect(body.responseCode).toBe(200);
  return body;
}

export async function updateUser(
  request: APIRequestContext,
  email: string,
  password: string,
  updates: Record<string, string>,
) {
  const response = await request.put(`${baseUrl}/updateAccount`, {
    form: {
      email,
      password,
      ...updates,
    },
  });

  const body = await response.json();
  expect(body.responseCode).toBe(200);
  // DEMO DISPLAY UPDATED USER INFO IN CONSOLE
  console.log("User updated successfully via API:", email);
  console.log("Updated info:", updates);
  return body;
}

export async function createUser(
  request: APIRequestContext,
  userData: TestUser,
) {
  const response = await request.post(`${baseUrl}/createAccount`, {
    headers: {
      Accept: "application/json",
    },
    form: {
      name: userData.name,
      email: userData.email,
      password: userData.password,
      title: userData.title,
      birth_date: userData.birth_date,
      birth_month: userData.birth_month,
      birth_year: userData.birth_year,
      firstname: userData.first_name,
      lastname: userData.last_name,
      company: userData.company,
      address1: userData.address1,
      address2: userData.address2,
      country: userData.country,
      state: userData.state,
      city: userData.city,
      zipcode: userData.zipcode,
      mobile_number: userData.mobile_number,
    },
  });

  const body = await response.json();
  expect(body.responseCode).toBe(201);
  expect(body.message).toEqual("User created!");
  // DEMO DISPLAY CREATED USER INFO IN CONSOLE
  console.log("User created successfully via API:", userData);
  return body;
}
