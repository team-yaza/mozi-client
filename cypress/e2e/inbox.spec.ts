/* eslint-disable cypress/no-force */
/* eslint-disable cypress/no-unnecessary-waiting */
/// <reference types="cypress" />

import { ROUTES } from '@/shared/constants/routes';

describe('Inbox', () => {
  before(() => {
    cy.login();
    cy.visit(ROUTES.HOME);
    cy.clearLocalStorage();

    cy.intercept({ method: 'GET', url: '/api/v1/todos' }, { fixture: 'todos.json' }).as('getTodos');
    cy.wait(100);
  });

  it('사용자는 서버로 부터 불러온 Todo를 볼 수 있다.', () => {
    cy.contains('소마 최종 발표 준비하기').should('be.visible');
    cy.contains('Cypress E2E 테스트 작성하기').should('be.visible');
  });

  it('사용자는 Todo의 Title과 Description을 수정할 수 있다.', () => {
    cy.contains('소마 최종 발표 준비하기').click().clear().type('소마 최종 발표 준비하기 수정');
    cy.contains('소마 최종 발표 준비하기 수정').should('be.visible');

    cy.contains('소마 최종 발표 준비하기 수정').dblclick();
    cy.get('[data-testid="todoDescription"]').clear().type('11월 26일 최종 발표');
    cy.contains('소마 최종 발표 준비하기 수정').should('be.visible');
  });

  // it('사용자는 TodoListItem에 장소를 등록할 수 있다.', () => {
  //   cy.get('[data-testid="todoMap"]').click();
  //   cy.wait(3000);

  //   cy.get('[data-testid="mapCheckButton"]').invoke('show').click({ force: true });
  //   cy.get('[data-testid="locationNameInput"]').type('소프트웨어 마에스트로 아남타워');

  //   cy.get('[data-testid="confirmButton"]').eq(2).click({ force: true });
  // });

  it('사용자는 TodoListItem에 알림날짜를 등록할 수 있다.', () => {
    cy.get('[data-testid="todoAlarm"]').click();

    cy.get('[data-testid="confirmButton"]').eq(1).click({ force: true });
  });

  it('사용자는 TodoListItem에 마감일자를 등록할 수 있다.', () => {
    cy.get('[data-testid="todoDue"]').click();

    cy.get('[data-testid="confirmButton"]').eq(1).click({ force: true });
  });

  it('사용자는 Enter키를 눌러 TodoListItem 편집을 마무리할 수 있다.', () => {
    cy.get('a').eq(0).type('{enter}', { force: true });
    cy.get('[data-testid="todoDescription"]').should('not.exist');
  });
});
