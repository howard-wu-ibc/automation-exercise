export interface TestUser {
  name: string;
  email: string;
  password: string;

  title: string;
  birth_date: string;
  birth_month: string;
  birth_year: string;

  first_name: string;
  last_name: string;
  company: string;

  address1: string;
  address2: string;
  country: string;
  state: string;
  city: string;
  zipcode: string;

  mobile_number: string;
}

/**
 * Generates a unique test user for UI + API tests
 */
export function createTestUser(): TestUser {
  const timestamp = Date.now();

  return {
    // Credentials
    name: "Test User",
    email: `testuser_${timestamp}@example.com`,
    password: "Password123!",

    // Personal info
    title: "Mr",
    birth_date: "1",
    birth_month: "1",
    birth_year: "1990",

    first_name: "Test",
    last_name: "User",
    company: "Automation Inc.",

    // Address
    address1: "123 Main St",
    address2: "Apt 4B",
    country: "United States",
    state: "California",
    city: "Los Angeles",
    zipcode: "90001",

    // Contact
    mobile_number: "1234567890",
  };
}
