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
