import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import json from "@eslint/json";
import { defineConfig } from "eslint/config";
import pluginCypress from "eslint-plugin-cypress/flat";

export default defineConfig([
  { ignores: ["dist/**"] },
  pluginCypress.configs.recommended,
  {
    files: ["tests/e2e/cypress/**/*.cy.js"],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.mocha,
        cy: true,
        Cypress: true,
      },
    },
    rules: {
      "@typescript-eslint/no-unused-expressions": "off"
    }
  },
  {
    files: ["**/*.{js,mjs,cjs,ts}"],
    plugins: { js },
    extends: ["js/recommended", ...tseslint.configs.recommended],
    rules: {
      "@typescript-eslint/no-unused-vars": [
        "error",
        { argsIgnorePattern: "^_", caughtErrorsIgnorePattern: "^_" }
      ],
      "@typescript-eslint/no-unused-expressions": "off",
    },
    languageOptions: {
      globals: globals.node
    }
  },
  {
    files: ["**/*.json"],
    plugins: { json },
    language: "json/json",
    extends: ["json/recommended"]
  },
  {
    files: ["client/public/**/*.js"],
    languageOptions: {
      globals: { ...globals.browser }
    }
  }
]);
