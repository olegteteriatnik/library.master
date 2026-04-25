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

### File Reader Utility
- Command-line tool for reading and displaying content of any text-based file
- Interactive console prompt for entering file path

### Quality and Testing
- Modular architecture with unit-tested services
- Mocha, Chai, and Sinon for testing
- End-to-end tests implemented using Playwright

### Code Quality & Conventions

- **ESLint** with TypeScript, Cypress, and Chai integration for enforcing consistent code style and error detection.
- Custom rule sets for:
    - Server-side Node.js code
    - Frontend (client/public)
    - Unit tests and E2E tests (Playwright + Cypress)
- All modules (including tests and Cypress specs) are fully linted and pass static analysis.
- **Husky** is used for Git hooks automation.
- Git hooks configured:
    - `pre-commit`: runs lint and unit tests before each commit
    - `commit-msg`: validates commit messages using commitlint and enforces conventional commit format

---

## Design Patterns Used

Library Master applies several key software design patterns to ensure a clean, extensible, and maintainable architecture:

- **Singleton**  
  Ensures that shared services like the database connector is instantiated only once and reused across the application lifecycle.

- **Factory**  
  Abstracts the creation of different types of `Book` entities, allowing flexible instantiation logic depending on book category or context.

- **Observer**  
  Implements an event-driven approach where components (e.g., logging or audit subscribers) react to lifecycle events such as `bookCreated`, `bookUpdated`, or `bookDeleted` without tight coupling.

- **Prototype**
  Used primarily in tests to create book payloads by cloning pre-defined templates (BookPrototype), enabling consistent, timestamped data without redundant object construction logic.

- **Proxy**  
  Wraps the `EventManagerService` with a proxy that transparently intercepts method calls.  
  This allows additional behaviors (such as logging, event filtering, or future auditing) to be injected without modifying the original implementation.  
  The proxy is registered via dependency injection and replaces the direct usage of the event manager, making the substitution seamless.

- **Adapter**  
  Used to abstract differences between local and CI test execution environments.  
  The `ExecutionContext` interface defines a contract for accessing environment-specific configuration such as `headless` mode, reporters, and CI awareness.  
  Implementations like `CIExecutionContext` and `LocalExecutionContext` adapt environment variables to the Playwright configuration interface, improving modularity, testability, and readability.  
  This pattern ensures that `playwright.config.ts` remains clean and declarative, delegating conditional logic to the adapter layer.

- **Decorator**  
  The `LibraryServiceTimingDecorator` wraps the core `LibraryService` to transparently measure and log response times for all book-related operations (e.g. `add`, `getById`, `search`).  
  This behavior is injected dynamically using InversifyJS and does not modify the original service.  
  Logging behavior can be configured depending on environment.  
  This pattern supports separation of concerns, runtime behavior injection, and easy future extension (e.g., adding retry logic or metrics collection).

These patterns contribute to the project's scalability and separation of concerns, making the codebase easier to reason about and evolve.

---

## Requirements

- Node.js v20.x or higher
- TypeScript
- Docker
- PostgreSQL (or Dockerized PostgreSQL)

---

## End-to-End Tests

End-to-end (E2E) tests are located in the `tests/e2e/` directory and are designed to simulate real user interaction with the system.

Library Master supports **multiple E2E frameworks**, each placed in a dedicated subdirectory:

| Directory               | Framework             | Purpose                                                              |
|------------------------|-----------------------|----------------------------------------------------------------------|
| `playwright/`          | [Playwright](https://playwright.dev/) | **Main test suite**. Covers all key flows with full integration      |
| `cypress/`             | Cypress               | Contains a small selection of representative E2E tests implemented using Cypress                 |
| `wdioSelenoidMocha/`   | WebDriverIO + Selenoid| Contains a few demonstration tests with UI interaction and Selenoid-based VNC inspection       |
| `seleniumJest/`        | Selenium + Jest       | Contains basic examples using raw Selenium WebDriver with Jest for experimental coverage      |

### Structure

- All suites follow the **Page Object Model** (POM) for consistency and maintainability.
- **Playwright** is the **primary** and most complete suite — all scenarios are implemented there.
- The other frameworks serve as **reference implementations**, showcasing how core scenarios (like book creation or list validation) can be ported and executed in different environments.

### Running

Each suite has its own configuration and can be run independently.

See individual `README.md` files inside each subdirectory (e.g. `tests/e2e/playwright/README.md`) for installation and usage details.

### Highlights

- Page Object Model (POM) structure
- Headed mode for local runs

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
   
3. Start PostgreSQL in Docker:
    ```bash
    docker run --name library-postgres \
      -e POSTGRES_DB=library-db \
      -e POSTGRES_USER=postgres \
      -e POSTGRES_PASSWORD=postgres \
      -p 5432:5432 \
      -v library-postgres-data:/var/lib/postgresql/data \
      -d postgres:16
    ```
   
4. Create the `books` table:
   - Connect to the running PostgreSQL container:
    ```bash
    docker exec -it library-postgres psql -U postgres -d library-db
    ```
   - Then run:
    ```bash
    CREATE TABLE IF NOT EXISTS books (
      id SERIAL PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      author VARCHAR(255) NOT NULL,
      year INT NOT NULL,
      "isAvailable" BOOLEAN NOT NULL DEFAULT true,
      type VARCHAR(50) NOT NULL
   );
    ```
   
5. Set up the .env file:
   Create a .env file in the root directory (see .envExample) and add the required environment variables:
   - SECRET_KEY=secret-key
   - AUTH_USERNAME=username
   - AUTH_PASSWORD=password
   - DB_HOST=host
   - DB_PORT=port
   - DB_NAME=db-name
   - DB_USER=db-user
   - DB_PASSWORD=db-password

6. Compile the TypeScript code:
    ```bash
    npm run build
    ```
   
---

## Versioning & Releases

Library Master follows **Semantic Versioning (SemVer)** and uses [`semantic-release`](https://semantic-release.gitbook.io/) for fully automated release management.

### How It Works

- Commits follow the **Conventional Commits** format (e.g. `feat:`, `fix:`, `chore:`).
- The project includes semantic-release configuration for automated versioning.

### Commit Format

Release automation relies on [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/).  
Examples:

```
feat: add filtering by availability to book list
fix: resolve JWT validation bug in login route
chore: update ESLint and refactor config
```

Breaking changes should include !, for example:
```
feat!: drop support for Node.js v18
```

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
    npm run build
   ```

### Unable to Connect to Database
Ensure your environment variables for the database configuration are correctly set in the .env file.

---

## Branching Strategy

We follow a simplified GitHub Flow strategy, customized for this project:

### Branches

- `master` — main branch, always contains stable, deployable code.
- `feat/*` — feature branches for new functionality.
- `fix/*` — for bugfixes.
- `hotfix/*` — for urgent fixes to `master`.
- `test/*` — temporary branches used for QA, E2E scenarios, integration testing, test data validation, etc.

#### Examples:
- `feat/add-book-search`
- `fix/book-pagination`
- `hotfix/critical-payment-bug`
- `test/manual-flow-debug`

### Rules:

- All changes go through pull requests into `master`.
- All commits follow [Conventional Commit](https://www.conventionalcommits.org/) format.
- Unit tests and E2E tests should pass before merging any branch.
- Direct commits to `master` are forbidden — use PRs only.

---

## For more details, please contact the repository owner.