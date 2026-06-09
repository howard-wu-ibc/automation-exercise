import { test, expect } from "@playwright/test";
import { createTestUser } from "../fixtures/user.fixture.js";
import {
  deleteUser,
  getUserByEmail,
  updateUser,
  createUser,
} from "../api/helpers/user.api.js";

test("User lifecycle: API create → API update → API delete", async ({
  page,
  request,
}) => {
  const user = createTestUser();

  // 1. Create user via API
  await createUser(request, user);

  // 2️. Validate user via API
  await getUserByEmail(request, user.email);

  // 3️. Update user via API
  await updateUser(request, user.email, user.password, {
    city: "New York",
  });

  // 4️. Delete user via API
  await deleteUser(request, user.email, user.password);
});
