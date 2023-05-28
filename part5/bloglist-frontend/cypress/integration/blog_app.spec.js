const apiBaseUrl = 'http://localhost:3003/api',
  baseUrl = 'http://localhost:3000';

const user = {
  name: 'Tester',
  username: 'tester',
  password: 'hunter2',
};

const blog = {
  author: 'Example author',
  title: 'Example title',
  url: 'https://example.com/blog',
};

const attemptLogin = ({ username, password }) => {
  cy.get('input[name="username"]').type(username);
  cy.get('input[name="password"]').type(password);
  cy.get('button[type="submit"]').click();
};

describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', `${apiBaseUrl}/testing/reset`);
    cy.request('POST', `${apiBaseUrl}/users`, user);
    cy.visit(baseUrl);
  });

  it('shows the login form', function () {
    cy.contains(/log in/i);
    cy.get('form');
  });

  describe('Login', function () {
    it('succeeds with valid credentials', function () {
      attemptLogin(user);
      cy.contains(/log out/i);
    });

    it('fails with invalid credentials', function () {
      attemptLogin({ username: 'invalid', password: 'invalid' });
      cy.get('.notification.error').contains(/invalid/i);
    });
  });

  context('when logged in', function () {
    beforeEach(function () {
      cy.login(user);
      cy.visit(baseUrl);
    });

    it('can create a new blog', function () {
      cy.contains('button', /new blog/i).click();

      cy.contains('label', /title/i).children('input').type(blog.title);
      cy.contains('label', /author/i)
        .children('input')
        .type(blog.author);
      cy.contains('label', /url/i).children('input').type(blog.url);
      cy.contains('button[type="submit"]', /create/i).click();

      cy.contains(':not(.notification)', blog.title);
    });

    it('orders blogs by likes', function () {
      const blogs = [22, 13, 15, 25, 62].map((likes) => ({ ...blog, likes }));

      blogs.forEach((blog) =>
        cy.requestWithAuth({
          method: 'POST',
          url: `${apiBaseUrl}/blogs`,
          body: blog,
        })
      );

      cy.visit(baseUrl);

      cy.contains(/browse/i)
        .nextUntil()
        .children()
        .find('button', /expand/i)
        .each(($btn) => $btn.click());

      blogs
        .sort((a, b) => b.likes - a.likes)
        .forEach((blog, index, blogs) => {
          if (index === blogs.length - 1) return;
          const nextLikes = blogs[index + 1].likes;

          cy.contains(new RegExp(`likes ${blog.likes}`, 'i'))
            .parent()
            .nextUntil('div', nextLikes)
            .next()
            .contains(new RegExp(`likes ${nextLikes}`, 'i'));
        });
    });

    context('and a blog exists', function () {
      beforeEach(function () {
        cy.requestWithAuth({
          method: 'POST',
          url: `${apiBaseUrl}/blogs`,
          body: blog,
        }).then(() => cy.visit(baseUrl));
      });

      it('can like a blog', function () {
        cy.contains('button', /expand/i).click();
        cy.contains(/likes 0/i);

        cy.contains('button', /like/i).click();
        cy.get('.notification').contains(/like/i);
        cy.contains(/likes 1/i);
      });

      it('can delete a blog they created', function () {
        cy.contains('button', /expand/i).click();
        cy.contains('button', /delete/i).click();
        cy.get('.notification').contains(/deleted/i);
      });

      it('cannot delete a blog someone else created', function () {
        const anotherUser = { ...user, username: 'tester2' };
        cy.request('POST', `${apiBaseUrl}/users`, anotherUser);
        cy.login(anotherUser);
        cy.visit(baseUrl);

        cy.contains('button', /expand/i).click();
        cy.contains('button', /delete/i).should('not.exist');

        cy.requestWithAuth({
          method: 'POST',
          url: `${apiBaseUrl}/blogs`,
          body: blog,
        }).then((response) => {
          cy.login(user);
          cy.requestWithAuth({
            method: 'DELETE',
            url: `${apiBaseUrl}/blogs/${response.body.id}`,
            failOnStatusCode: false,
          })
            .its('status')
            .should('equal', 403);
        });
      });
    });
  });
});
