# Library Master — E2E Tests (Selenium + Jest)

This directory contains end-to-end tests for the **Library Master** project, implemented using [Selenium WebDriver](https://www.selenium.dev/documentation/webdriver/) and executed using the [Jest](https://jestjs.io/) test runner.

These tests validate real user interaction via browser automation, simulating real usage of the web UI and backend integration.

---

## Features

- Pure Selenium WebDriver API
- Test runner: Jest (with async/await)
- Page Object Pattern (modular structure)
- `.env`-based credentials
- API layer using Axios
- Fully typed (TypeScript)
- Configurable browser options

---

## How to Run Tests Locally

Install dependencies:

```bash
cd tests/e2e/seleniumJest
npm install
```

### Run all tests

```bash
npm test
```

This will run all `.spec.ts` files under `specs/**`.

---

### Run a specific test file

You can run a specific test file, e.g. `addNewBook.spec.ts`:

```bash
npm test -- tests/e2e/seleniumJest/specs/scenarios/addNewBook.spec.ts
```

This runs only the selected file using Jest CLI.

---

## Environment Variables

To run tests locally, create a `.env` file in `tests/e2e/seleniumJest/` by copying the example:

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

These credentials are used to fetch access tokens and authorize API requests within your tests.

---

## Cross-Browser Testing

By default, all tests run in **Google Chrome**.  
To run tests in different browsers (e.g. **Firefox**), use the `BROWSER` environment variable.

### Run in Chrome (default):

```bash
npm run test:chrome
```

### Run in Firefox:

```bash
npm run test:firefox
```

These commands will launch the browser accordingly using the Selenium WebDriver.

Supported browsers (locally):
- Chrome
- Firefox

Browser settings are defined in [`helpers/webDriverHelper.ts`](./helpers/webDriverHelper.ts).

---

## Notes

- Tests run in real browsers (Chrome by default, Firefox supported)
- All tests use **real browser** (non-headless by default)
- Browser is maximized to `1920x1080` via ChromeOptions
- You can customize the WebDriver config in `helpers/webDriverHelper.ts`
