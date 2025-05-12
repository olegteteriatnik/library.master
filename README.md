# Library Master

A Node.js project for managing a library system, allowing interaction with books and users via a RESTful API.
Also, it includes basic Node.js project that reads data from a file and displays it in the console.

## Features

### Library Management API
- Full CRUD operations for books: Create, Read, Update, Delete
- Pagination, sorting, and searching books by title, author, year, and availability
- Check availability of a specific book
- Secure JWT-based authentication for protected endpoints
- Interactive Swagger UI for exploring and testing API endpoints

### Client-Side Interface (Public Frontend)

- Simple frontend built using vanilla HTML, CSS, and JavaScript (no framework)
- Allows users to:
    - Log in and manage books through a clean UI
    - View paginated list of books
    - Search books by title
    - View details of a book
    - Edit or delete a book
    - Add a new book via modal form
- Real-time validation and error handling with confirmation dialogs and toasts
- Responsive layout with consistent design system
- Protected routes — token must be present in `localStorage` to access

> Note: Client-side UI is available locally at `http://localhost:3000/`

> 🔗 **Live version** of the client is available at:  
> [http://203.161.47.9:3100/](http://203.161.47.9:3100/)

### File Reader Utility
- Command-line tool for reading and displaying content of any text-based file
- Interactive console prompt for entering file path

### Quality and CI/CD
- Modular architecture with unit-tested services
- Mocha, Chai, and Sinon for testing
- End-to-end tests implemented using Playwright
- Integrated with Jenkins for build, E2E testing, and deployment
- CI pipeline blocks deployment on failed tests

---

## Design Patterns Used

Library Master applies several key software design patterns to ensure a clean, extensible, and maintainable architecture:

- **Singleton**  
  Ensures that shared services like the database connector is instantiated only once and reused across the application lifecycle.

- **Factory**  
  Abstracts the creation of different types of `Book` entities, allowing flexible instantiation logic depending on book category or context.

- **Observer**  
  Implements an event-driven approach where components (e.g., logging or audit subscribers) react to lifecycle events such as `bookCreated`, `bookUpdated`, or `bookDeleted` without tight coupling.

These patterns contribute to the project's scalability and separation of concerns, making the codebase easier to reason about and evolve.

---

## Requirements

- Node.js v20.x or higher
- TypeScript
- Playwright CLI (for running E2E tests locally)

---

## End-to-End Tests

E2E tests are located in `tests/e2e/playwright/` and are written using [Playwright](https://playwright.dev/).  
They simulate real user interaction in the browser and validate the logic and behavior.

### Test Management Integration

E2E tests are integrated with [Testomatio](https://testomat.io/) for tracking and reporting.

- Test cases are linked using IDs (e.g. `@T1234567`) placed at the **start of test names**
- Results are automatically pushed to Testomatio when tests run in CI
- To run a specific test spec via Jenkins:
  ```bash
  SPEC_PATH=specs/login.spec.ts
  ```

### Highlights

- Page Object Model (POM) structure
- Headed mode for local runs
- Headless mode for CI (automatically applied if `CI=true`)
- Fully integrated into Jenkins pipelines

➡️ See [tests/e2e/playwright/README.md](./tests/e2e/playwright/README.md) for setup, structure, and examples.

---

## Setup

1. Clone the repository:
    ```bash
    git clone https://github.com/olegteteriatnik/library.master.git
    cd library.master
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Compile the TypeScript code:
    ```bash
    npm run build
    ```
   
4. Set up the .env file:
   Create a .env file in the root directory (see .envExample) and add the required environment variables:
   - HCP_CLIENT_ID=client-id
   - HCP_CLIENT_SECRET=client-secret
   - HCP_AUTH_URL=auth-url
   - HCP_API_BASE_URL=base-url
   - HCP_AUDIENCE=audience

---

## Run

To start the Library Master and use endpoints:

1. Run the Library Master:
    ```bash
    npm start
    ```

2. Access the Swagger documentation >> Open your browser and navigate to:
    ```
    http://localhost:3000/library-master-api/
    ```
   
3. Interact with the API endpoints via Swagger.

To start the File Reader and read a file:

1. Run the application:
    ```bash
    npm run start:fileReader
    ```

2. Enter the path to the file when prompted in the console:
    ```
    Enter file path: ./data/sample.txt
    ```

---

## Unit Testing

Library Master includes unit tests for core services, written using [Mocha](https://mochajs.org/), [Chai](https://www.chaijs.com/), and [Sinon](https://sinonjs.org/).

### Run Unit Tests

- To run all unit tests:
    ```bash
    npm run test:unit
    ```
- This will execute all test files matching the pattern: tests/unit/specs/**/*.unit.test.ts
- Tests are written using ES modules (import/export) and executed using ts-node with ESM support.
- Unit tests run automatically during deployment. If any test fails, the deployment is aborted.

### Structure

- Unit tests are located under tests/unit/specs/
- Each service has its own dedicated unit test file to ensure focused and isolated testing.

### Add Your Own Tests

To create a new unit test:
1. Create a new .unit.test.ts file inside tests/unit/specs/
2. Use describe and it blocks from Mocha
3. Use chai.expect for assertions
4. Use sinon for mocking and stubbing external dependencies

---

## Infrastructure

Library Master is deployed in a cloud environment using AWS and CI/CD tooling:

- **Amazon RDS (PostgreSQL)**  
  The backend uses a managed PostgreSQL instance for storing books and user data. Database connectivity is securely configured via environment variables and Jenkins credentials.

- **AWS-Based Logging**  
  Application events, including book lifecycle operations and system-level events, are pushed to centralized AWS logging (e.g., CloudWatch) for observability and debugging in production.

- **CI/CD Integration**  
  Jenkins pipelines handle the build and deployment processes, automatically running unit and E2E tests before shipping. Secrets and configuration values are injected through secure Jenkins Credentials.

---

## Jenkins CI/CD Integration

Library Master uses Jenkins for building, testing, and deploying the application.

### Jenkins Pipelines

There are **two separate pipelines**:

1. **Builds** (`Multibranch Pipeline`):
    - Builds application in any branch.
    - Tags Docker image using format: `library.master-app:<branch>_<buildNumber>`
    - Runs unit tests.

2. **Deploys** (`Regular Pipeline`):
    - Deploys specific build (any branch).
    - Requires parameters:
        - `BRANCH_NAME`: the name of the branch to deploy
        - `BUILD_ID`: the Jenkins build number (used as the image tag)

### Credentials

All secrets and environment variables (like `BASE_API_URL`, `HCP_CLIENT_ID`, etc.) are stored securely in Jenkins Credentials.

### Access Jenkins

- Jenkins URL: `http://203.161.47.9:8080/`
- Jenkins user credentials are the same as credentials for endpoints

### Build Workflow

1. Push your changes to any branch.
2. Jenkins automatically runs the **Builds** pipeline for that branch.
3. Once build succeeds, a Docker image is created with a tag matching the branch and build number.

### Deploy Workflow

1. Go to the **Deploys** job in Jenkins.
2. Click **Build with Parameters**.
3. Enter:
    - `BRANCH_NAME`: name of the branch to deploy (e.g., `feat/86956zhpp-set_up_jenkins`)
    - `BUILD_ID`: build number from the **Builds** job (e.g., `9`)
4. The app will be deployed on `http://203.161.47.9:3100/library-master-api/`

---

## Production Setup

### Swagger Documentation
To explore and test the production API endpoints, access the Swagger documentation at:
   ```
    http://203.161.47.9:3100/library-master-api/
   ```

### Authentication
1. Obtain a JWT by sending a POST request to the /login endpoint with valid credentials:
   ```
    {
    "username": "your-username",
    "password": "your-password"
    }
   ```
   
2. Use the received JWT as a Bearer token in the Authorization header for all subsequent requests.


---

## Example Endpoints

### Create a Book
- URL: /books/create
- Method: POST
- Payload:
   ```
    {
    "title": "War and Peace",
    "author": "Leo Tolstoy",
    "year": 1869,
    "isAvailable": true
    }
   ```

### Delete a Book
- URL: /books/delete
- Method: DELETE
- Payload:
   ```
    {
    "id": 10
    }
  ```
  
### Get books list
- URL: /books/list
- Method: GET
- Params:
  - `page` (optional): The page number, default is 1.
  - `pageSize` (optional): The page size, default is 10.
  - `sortBy` (optional): Field sort by, can be `title`, `author` or `year`.

### Search books
- URL: /books/search
- Method: GET
- Params:
  - `title` (optional): Filter by book title (case-insensitive, partial match).
  - `author` (optional): Filter by author name (case-insensitive, partial match).
  - `year` (optional): Filter by publication year.
  - `isAvailable` (optional): Filter by availability (`true` or `false`).
  - `page` (optional): The page number, default is 1.
  - `pageSize` (optional): Number of books per page, default is 10.

### Check book availability
- URL: /books/checkAvailability
- Method: GET
- Params:
  - `id` (required): ID of the book to check availability.

---

## Troubleshooting

### Missing dist/index.js
If you see an error like:
   ```
    Cannot find module 'dist/index.js'
   ```

Make sure you compiled the code using:
   ```bash
    npx run build
   ```

### Unable to Connect to Database
Ensure your environment variables for the database configuration are correctly set in the .env file.

---

## For more details, please contact the repository owner.