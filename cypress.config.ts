/* eslint-disable @typescript-eslint/no-unused-vars */
import { defineConfig } from 'cypress';

export default defineConfig({
  projectId: 'q4deia',
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl: 'http://localhost:3000/',
    specPattern: 'cypress/e2e/**/*.{js,jsx,ts,tsx}',
  },
});
