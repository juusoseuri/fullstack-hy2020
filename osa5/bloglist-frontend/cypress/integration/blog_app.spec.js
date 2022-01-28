describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    const user = {
      name: 'testiukko',
      username: 'tukko',
      password: 'salainen'
    }
    cy.request('POST', 'http://localhost:3001/api/users', user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.contains('Log in to the application')
  })

  describe('Login', function() {
    it('succeeds with corrent credentials', function() {
      cy.get('#username').type('tukko')
      cy.get('#password').type('salainen')
      cy.get('#loginButton').click()

      cy.contains('testiukko logged in')
    })

    it('fails with wron credentials', function() {
      cy.get('#username').type('tukko')
      cy.get('#password').type('väärä')
      cy.get('#loginButton').click()

      cy.get('.error').should('contain', 'Wrong username or password')
    })
  })
})