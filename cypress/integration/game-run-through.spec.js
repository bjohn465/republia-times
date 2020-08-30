describe('game run-through', function () {
  before(function () {
    cy.visit('/')
  })

  describe('initial screen', function () {
    it('displays the correct heading', function () {
      cy.findByRole('heading', { name: /The Republia Times/i }).should('exist')
      cy.findByRole('heading', { name: /Day 1/i }).should('exist')
    })

    it('has a button that starts the work day', function () {
      cy.findByText(/Start Work/i)
        .should('exist')
        .click()
    })
  })

  describe('work day 1', function () {
    it('displays the day number', function () {
      cy.findByRole('heading', { name: /Day 1/i }).should('exist')
    })

    it('displays a work day clock', function () {
      cy.findByRole('region', { name: /Work Day Clock/i })
        .should('exist')
        .within(() => {
          cy.findByText(/6:00 AM/i).should('exist')
          cy.findByRole('heading', { name: /Work Day Hours/i }).should('exist')
          cy.findByText(/6 AM - 6 PM/i).should('exist')
        })
    })
  })
})
