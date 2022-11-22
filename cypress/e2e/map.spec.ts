/* eslint-disable cypress/no-unnecessary-waiting */
/// <reference types="cypress" />

import { ROUTES } from '@/shared/constants/routes';

describe('Map', () => {
  before(() => {
    cy.login();
    cy.visit(ROUTES.MAP);
    cy.clearLocalStorage();

    // cy.intercept({ method: 'GET', url: '/api/v1/todos' }, { fixture: 'todos.json' }).as('getTodos');
    cy.wait(100);
  });

  // it('map 페이지의 사이드바를 열고 닫을 수 있다.', () => {
  //   cy.wait(3000);
  //   cy.get('[data-testid="sidebarToggleButton"]').click();
  //   cy.get('[data-testid="searchSidebar"]').should('be.visible');

  //   cy.wait(1000);
  //   cy.get('[data-testid="recommendButton"]').should('be.visible');
  //   cy.get('[data-testid="sidebarToggleButton"]').click();
  //   cy.get('[data-testid="recommendButton"]').should('be.visible');
  // });

  it('사용자는 원하는 장소를 검색할 수 있다.', () => {
    cy.get('[data-testid="sidebarToggleButton"]').click();
    cy.get('[data-testid="searchInput"]').type('카페');
    cy.get('[data-testid="searchInput"]').should('have.value', '카페');

    // cy.get('[data-testid="searchButton"]').click();
    // cy.get('[data-testid="searchResult"]').should('be.visible');
  });
});
