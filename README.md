# Library Master

A Node.js project for managing a library system, allowing interaction with books and users via a RESTful API.
Also, it includes basic Node.js project that reads data from a file and displays it in the console.

## Features

- Add books.
- Secure authentication using JWT.
- Interactive Swagger documentation for API endpoints.
- Reads any text-based file and displays its content in the console.
- Interactive console input for specifying file paths.

---

## Requirements

- Node.js v20.x or higher
- TypeScript

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

## Production Setup

### Swagger Documentation
To explore and test the production API endpoints, access the Swagger documentation at:
   ```
    https://library-master.onrender.com/library-master-api/
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

### Add a Book
- URL: /books/addBook
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

### Remove a Book
- URL: /books/remove
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