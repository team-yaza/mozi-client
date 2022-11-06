/* eslint-disable cypress/no-unnecessary-waiting */
/// <reference types="cypress" />

import { ROUTES } from '@/shared/constants/routes';

describe('Inbox', () => {
  before(() => {
    cy.login();
    cy.visit(ROUTES.HOME);

    cy.intercept({ method: 'GET', url: '/api/v1/todos' }, { fixture: 'todos.json' }).as('getTodos');
    cy.wait(100);
  });

  it('inbox 페이지에서 서버로 부터 불러온 Todo를 볼 수 있다.', () => {
    cy.contains('소마 최종 발표 준비하기').should('be.visible');
    cy.contains('Cypress E2E 테스트 작성하기').should('be.visible');
  });
});
