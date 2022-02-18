describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    const user = {
      name: 'testiukko',
      username: 'tukko',
      password: 'salainen',
    }
    cy.request('POST', 'http://localhost:3001/api/users', user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function () {
    cy.contains('Log in to the application')
  })

  describe('Login', function () {
    it('succeeds with corrent credentials', function () {
      cy.get('#username').type('tukko')
      cy.get('#password').type('salainen')
      cy.get('#loginButton').click()

      cy.contains('testiukko logged in')
    })

    it('fails with wrong credentials', function () {
      cy.get('#username').type('tukko')
      cy.get('#password').type('väärä')
      cy.get('#loginButton').click()

      cy.get('.error').should('contain', 'Wrong username or password')
    })
  })

  describe('When logged in', function () {
    beforeEach(function () {
      cy.login({ username: 'tukko', password: 'salainen' })
    })

    it('A blog can be created', function () {
      cy.contains('create new blog').click()
      cy.get('#title').type('Uusi blogi')
      cy.get('#author').type('Meikäpoika')
      cy.get('#url').type('www.juuso.fi')
      cy.contains('Save the blog').click()
      cy.contains('Uusi blogi by Meikäpoika')
    })

    describe('and a blog exists', function () {
      describe('and several notes exist', function () {
        beforeEach(function () {
          cy.createBlog({
            title: 'Eka Blogi',
            author: 'minä',
            url: 'www.juuso.fi',
          })
          cy.createBlog({
            title: 'Toka Blogi',
            author: 'minä',
            url: 'www.juuso.fi',
          })
          cy.createBlog({
            title: 'Kolmas Blogi',
            author: 'minä',
            url: 'www.juuso.fi',
          })
        })

        it('A blog can be liked', function () {
          cy.contains('Eka Blogi').click()
          cy.contains('Likes 0')
          cy.contains('like').click()
          cy.contains('Likes 1')
        })

        it('A blog can be deleted', function () {
          cy.contains('Toka Blogi').click()
          cy.contains('remove').click()
          cy.contains('Toka Blogi by minä').should('not.exist')
        })

        it('The blogs are in correct order', function () {
          cy.contains('Toka Blogi').click()
          cy.contains('like').click()
          cy.contains('Likes 1')
          cy.contains('like').click()
          cy.contains('Likes 2')

          cy.contains('Toka Blogi').click()
          cy.contains('Kolmas Blogi').click()
          cy.contains('like').click()
          cy.contains('Likes 1')
          cy.contains('Kolmas Blogi').click()

          cy.get('.blog').then((blogs) => {
            cy.get(blogs[0]).contains('Toka Blogi')
            cy.get(blogs[1]).contains('Kolmas Blogi')
            cy.get(blogs[2]).contains('Eka Blogi')
          })
        })
      })
    })
  })
})
