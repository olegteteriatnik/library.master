# Library Master

A basic Node.js project that reads data from a file and displays it in the console.

## Features

- Reads any text-based file and displays its content in the console.
- Interactive console input for specifying file paths.

---

## Requirements

- Node.js v14.x or higher
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
    npx tsc
    ```

---

## Run

To start the application and read a file:

1. Run the application:
    ```bash
    node dist/index.js
    ```

2. Enter the path to the file when prompted in the console:
    ```
    Enter file path: ./data/sample.txt
    ```

---

## Troubleshooting

### Missing dist/index.js
If you see an error like: Cannot find module 'dist/index.js'

Make sure you compiled the code.
