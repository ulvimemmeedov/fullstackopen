Cypress.Commands.add('logout', () => cy.clearLocalStorage('auth'));

Cypress.Commands.add('login', ({ username, password }) => {
  cy.logout();
  cy.request({
    method: 'POST',
    url: 'http://localhost:3003/api/auth',
    body: { username, password },
  }).then((response) => {
    localStorage.setItem('auth', JSON.stringify(response.body));
  });
});

Cypress.Commands.add('requestWithAuth', (params) => {
  cy.request({
    ...params,
    headers: {
      Authorization: `Bearer ${JSON.parse(localStorage.getItem('auth')).token}`,
    },
  });
});
