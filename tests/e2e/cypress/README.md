# Library Master — E2E Tests (Cypress)

This directory contains end-to-end tests for the **Library Master** project, implemented using [Cypress](https://www.cypress.io/).

These tests validate real user interaction with the application via the UI and REST API integration.

---

## Features

- Based on Page Object Model (POM)
- Centralized helpers, custom Cypress commands, and API layers
- Local run support with Cypress UI (`cypress open`)
- Covers both UI flows and API verification
- Book creation/cleanup handled automatically in tests

---

## How to Run Locally

Make sure you’re in the `tests/e2e/cypress/` directory and install dependencies:

```bash
cd tests/e2e/cypress
npm install
```

### Launch Cypress test runner (GUI)

```bash
npm run test:open
```

Use this to select and run tests interactively with full browser visibility.

### Run all tests headlessly

```bash
npm run test:run
```

This will execute all specs via the Cypress CLI in headless mode (Electron by default).

---

## Environment Variables (.env)

To run tests locally, create a `.env` file in `tests/e2e/cypress/` by copying the provided example:

```bash
cp .envExample .env
```

Then fill in the required fields:

```env
BASE_URL=http://localhost:3000
AUTH_USERNAME=username
AUTH_PASSWORD=password
```

These variables are used for local authentication and API/UI test execution.

---

## Design Philosophy

- **Custom Commands**: We use `Cypress.Commands.add(...)` to encapsulate side-effects like login, book creation, and polling.
- **Helper Methods**: Provide high-level abstraction for setting up or cleaning up state.
- **Page Object Model**: Every screen or modal has its own file with `.get...()` and `.assert...()` methods for clean test writing.
- **Separation of Concerns**: Test specs remain readable; implementation details live in helpers, commands, or data files.
