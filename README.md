# API Testing - Automation Exercise

This project contains Playwright tests for the Automation Exercise API.

## Bulk User Creation and Deletion

To create and delete multiple users using a CSV file:

1. Prepare a CSV file named `users.csv` in the root directory with the following columns:
   - name,email,password,title,birth_date,birth_month,birth_year,first_name,last_name,company,address1,address2,country,state,city,zipcode,mobile_number

2. Run the bulk test:
   ```bash
   npm test -- tests/e2e/bulk.user.lifecycle.spec.ts
   ```

The test will:

- Read user data from `users.csv`
- Generate unique email addresses for each user
- Create all users via the API
- Delete all users via the API

## Single User Test

To run the single user lifecycle test:

```bash
npm test -- tests/e2e/user.lifecycleAPI.spec.ts
```

## Dependencies

- @playwright/test
- papaparse (for CSV parsing)
- typescript
