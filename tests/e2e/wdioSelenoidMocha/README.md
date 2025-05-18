# Library Master — E2E Tests (WebDriverIO + Selenoid)

This directory contains end-to-end tests for the **Library Master** project, implemented using [WebDriverIO](https://webdriver.io/) and run in real browsers via [Selenoid](https://aerokube.com/selenoid/).

These tests validate real user interaction with the backend APIs and the UI.

---

## Features

- WebDriverIO with Mocha
- Real Chrome browser via Selenoid in Docker
- `.env`-based secret management
- API test layer using Axios and `expect-webdriverio`
- Headless test execution in isolated environments

---

## How to Run Tests Locally

Install dependencies:

```bash
cd tests/e2e/wdioSelenoidMocha
npm install
```

### Run all tests

```bash
npm test
```

This runs all `.test.ts` files in `specs/{api,ui,scenarios}/` using `wdio.conf.ts`.

---

### Run a specific test file

You can run a single test file (e.g., `addNewBook.test.ts`) with:

```bash
npm run test:spec ./specs/scenarios/addNewBook.test.ts
```

This uses the --spec flag of WebDriverIO to target a specific file.

---

## Start Local Selenoid (with UI)

Selenoid allows launching real browsers in containers and viewing test execution in real-time via a web interface.

### Prerequisites

- Docker
- Node.js + npm
- Project cloned and dependencies installed

### Start Selenoid + UI

```bash
./scripts/start-selenoid.sh
```

What this does:

1. Generates `browsers.json` with the configured Chrome version (default `118.0`)
2. Starts the Selenoid container
3. Starts the Selenoid UI container
4. Binds ports `4444` (Selenoid) and `8080` (Selenoid UI)

#### Optional: Use custom Chrome version

```bash
CHROME_VERSION=119.0 ./scripts/start-selenoid.sh
```

---

## View Live Test Execution (VNC)

Once Selenoid and UI are running, open:

```
http://localhost:8080
```

This web UI will display:

- Active test sessions
- Logs per session
- VNC live view of the browser during test execution

---

## Stop and Remove Selenoid Containers

When finished, stop and clean up:

```bash
docker stop selenoid selenoid-ui && docker rm selenoid selenoid-ui
```

---

## Environment Variables

To run tests locally, create a `.env` file in `tests/e2e/wdioSelenoidMocha/` by copying the provided example:

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
