import { defineConfig } from 'cypress';
import dotenv from 'dotenv';
import staticParams from './params/constants/index';

dotenv.config();

export default defineConfig({
  e2e: {
    setupNodeEvents(_on, _config) {},
    specPattern: 'specs/**/*.cy.{js,ts}',
    supportFile: 'support/e2e.js',
    baseUrl: staticParams.baseUrl,
  },
  env: {
    AUTH_USERNAME: process.env.AUTH_USERNAME,
    AUTH_PASSWORD: process.env.AUTH_PASSWORD,
  },
});
