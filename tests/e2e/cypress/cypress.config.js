import { defineConfig } from 'cypress';
import { getSecret } from './tasks/getSecret';
import staticParams from './params/constants/index';

export default defineConfig({
  e2e: {
    setupNodeEvents(on, _config) {
      on('task', { getSecret });
    },
    specPattern: 'specs/**/*.cy.{js,ts}',
    supportFile: 'support/e2e.js',
    baseUrl: staticParams.baseUrl,
  },
});
