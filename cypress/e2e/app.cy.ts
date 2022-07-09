/// <reference types="cypress" />

describe('Navigation', () => {
  it('홈 페이지 렌더링', () => {
    cy.visit('http://localhost:3000/');
    cy.url().should('include', '/');
  });
});
