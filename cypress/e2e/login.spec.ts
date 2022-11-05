/// <reference types="cypress" />

export {};

describe('Login', () => {
  it('비로그인, root 접근 시 login으로 이동', () => {
    cy.visit('/');
    cy.url().should('include', '/');
  });

  // it('카카오 로그인 성공시 /inbox로 이동', () => {
  //   cy.get('[data-testid="kakaoLogin"]').should('be.visible');
  //   cy.login();
  //   cy.url().should('include', '/inbox');
  // });
});
