# Library Master — E2E Tests (Playwright)

This directory contains end-to-end tests for the **Library Master** project, implemented using [Playwright](https://playwright.dev/).

These tests validate real user interaction with the application.

---

## Features

- Based on Page Object Model (POM)
- Uses centralized configuration and helpers
- Uses Playwright Test Runner
- Supports local run (headed)
- CI-ready — runs in headless mode automatically

---

## How to Run Locally

Make sure you’re in the `tests/e2e/playwright/` directory and have installed dependencies:

```bash
cd tests/e2e/playwright
npm i
```

### Run all tests

```bash
npm test
```

This runs all specs in `specs/` using `configs/playwright.config.ts`.  
Browsers launch in **headed** mode by default (unless `CI=true` is set).

### Run a specific test spec

```bash
npm run test:spec -- specs/loginToLibraryMaster.spec.ts
```

Useful for debugging or focused test development.

---

## Environment Variables (.env)

To run tests locally, create a `.env` file in `tests/e2e/playwright/` by copying the provided example:

```bash
cp .envExample .env
```

Then fill in the required values:

```env
HCP_CLIENT_ID=your-client-id
HCP_CLIENT_SECRET=your-client-secret
HCP_AUTH_URL=https://your-auth-url
HCP_API_BASE_URL=https://your-api-url
HCP_AUDIENCE=your-audience
```

These environment variables are required to fetch secrets from Vault and generate user tokens for authorization.

> ✅ These are **not needed in CI**, as Jenkins injects them via credentials.

---

## Headless Mode for CI

No extra setup needed — when `CI=true` is set in the environment, Playwright automatically switches to headless mode.

---

## Integration with Testomatio

Project is integrated with [Testomatio](https://testomat.io/) — a test management system for tracking automated test cases.

### How it works

- Each test must include a `@Txxxxxxx` ID from Testomatio in its name.
- Example:
  ```ts
  test('@T8c30733f Login page is displayed.', async () => {
    // test steps
  });
  ```

- During CI execution, test results are automatically reported to Testomatio using the `TESTOMATIO` API key.

### Jenkins integration

- Tests are run via Docker and results are pushed to Testomatio.
- You can optionally pass a spec file path:
  ```bash
  SPEC_PATH=specs/login.spec.ts
  ```
- If no parameters are passed, all tests are run and reported.

### Important

- The Testomatio ID **must appear at the beginning of the test title**, without brackets:
    - ✅ `test('@T12345 Description', () => {})`
    - ❌ `test('[@T12345] Description', () => {})` (won’t be recognized)

### Artifacts & Screenshots

- If a test **fails on CI**, Playwright captures a screenshot (and optional trace).
- These artifacts are **automatically uploaded to an S3 bucket**.
- Testomatio fetches them and attaches to the corresponding test in the report.

> ✅ Screenshots are only uploaded when `CI=true` — local runs don’t publish anything.
