describe('Login', () => {
  it('비로그인, root 접근 시 login으로 이동', () => {
    cy.visit('/');
    cy.url().should('include', '/login');
  });

  it('카카오 로그인 버튼을 클릭시 /kakao로 이동', () => {
    cy.get('[data-testid="kakaoLogin"]').should('be.visible');
  });
});
