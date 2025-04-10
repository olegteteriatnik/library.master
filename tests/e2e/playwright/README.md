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

```bash
cd tests/e2e/playwright
npm i

npm test
```

- Runs using `playwright.config.ts`
- Browsers launch in **headed** mode for visual feedback
- Tests live in `specs/`, configs in `configs/`

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
