// in cypress/support/index.ts
// load type definitions that come with Cypress module
/// <reference types="cypress" />

export {};

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Cypress {
    interface Chainable {
      dataCy(value: string): Chainable<JQuery<HTMLElement>>;
      login(): () => void;
    }
  }
}

// cypress/support/index.ts
